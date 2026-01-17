'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import type { FirebaseError } from 'firebase/app';
import { doc, serverTimestamp } from 'firebase/firestore';

type AuthFormMode = 'login' | 'register';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function AuthForm({ mode }: { mode: AuthFormMode }) {
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'user@example.com',
      password: 'password123',
    },
  });

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleAuthError = (error: FirebaseError) => {
    let description = "An unexpected error occurred. Please try again.";
    if (error.code) {
        switch (error.code) {
            case 'auth/invalid-credential':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                description = "Invalid credentials. Please check your email and password and try again.";
                break;
            case 'auth/email-already-in-use':
                description = 'This email is already registered. Please login or use a different email.';
                break;
            default:
                description = error.message;
        }
    }
    toast({
      variant: 'destructive',
      title: 'Authentication Error',
      description,
    });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (mode === 'login') {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .catch(handleAuthError);
    } else {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userDocRef = doc(firestore, 'users', user.uid);
            const username = values.email.split('@')[0];
            
            // Create user profile in Firestore
            setDocumentNonBlocking(userDocRef, {
                id: user.uid,
                email: user.email,
                username: username,
                registrationDate: serverTimestamp(),
                lastLogin: serverTimestamp(),
                xp: 0,
                badges: 0,
            }, { merge: true });
        })
        .catch(handleAuthError);
    }
  }

  const title = mode === 'login' ? 'Welcome Back' : 'Create an Account';
  const description =
    mode === 'login'
      ? 'Enter your credentials to access your account.'
      : 'Fill in the details to create a new account.';
  const buttonText = mode === 'login' ? 'Login' : 'Register';
  const alternativeText =
    mode === 'login'
      ? "Don't have an account?"
      : 'Already have an account?';
  const alternativeLink = mode === 'login' ? '/register' : '/login';
  const alternativeLinkText = mode === 'login' ? 'Register' : 'Login';

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="user@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {buttonText}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {alternativeText}{' '}
          <Link href={alternativeLink} className="underline">
            {alternativeLinkText}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
