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
import { useAuth, useFirestore } from '@/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import type { FirebaseError } from 'firebase/app';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

type AuthFormMode = 'login' | 'register';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid Hero ID.' }),
  password: z.string().min(1, { message: 'Security Code cannot be empty.' }),
});

const registerSchema = z.object({
  username: z.string().min(3, { message: 'Call Sign must be at least 3 characters.' }).max(20, { message: 'Call Sign must be at most 20 characters.'}),
  email: z.string().email({ message: 'Invalid StarkNet ID.' }),
  password: z.string().min(6, { message: 'Access Code must be at least 6 characters.' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Access Codes don't match",
  path: ["confirmPassword"],
});


export default function AuthForm({ mode }: { mode: AuthFormMode }) {
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  const formSchema = mode === 'login' ? loginSchema : registerSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      ...(mode === 'register' ? { username: '', confirmPassword: '' } : {}),
    },
  });

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleAuthError = (error: FirebaseError) => {
    let title = 'Authentication Error';
    let description = "An unexpected error occurred. Please try again.";

    if (error.code) {
        switch (error.code) {
            case 'auth/invalid-credential':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                title = "❌ Access Denied";
                description = "Identity verification failed. Please recheck your credentials.";
                break;
            case 'auth/email-already-in-use':
                title = "ID Already Registered";
                description = 'This StarkNet ID is already in the SHIELD system. Please log in or use a different ID.';
                break;
            default:
                description = error.message;
        }
    }
    toast({
      variant: 'destructive',
      title: title,
      description,
    });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (mode === 'login') {
      const { email, password } = values as z.infer<typeof loginSchema>;
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            toast({
                title: "✅ Login Successful!",
                description: "Welcome back, Hero. JARVIS is online and ready to assist.",
            });
            // The useEffect will handle the redirect to '/'
        })
        .catch(handleAuthError);
    } else {
        const { username, email, password } = values as z.infer<typeof registerSchema>;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // Update Firebase Auth profile displayName
                return updateProfile(user, { displayName: username }).then(() => {
                    const userDocRef = doc(firestore, 'users', user.uid);
                    
                    // Create user profile in Firestore
                    return setDoc(userDocRef, {
                        id: user.uid,
                        email: user.email,
                        username: username,
                        registrationDate: serverTimestamp(),
                        lastLogin: serverTimestamp(),
                        xp: 0,
                        badges: 0,
                    });
                });
            })
            .then(() => {
                // Sign the user out
                return signOut(auth);
            })
            .then(() => {
                // After sign out is successful
                toast({
                    title: '✅ Registration Successful!',
                    description: "Welcome, Hero. Your identity has been registered in the SHIELD system. Please log in to begin your mission.",
                    duration: 5000,
                });
                router.push('/login');
            })
            .catch(handleAuthError);
    }
  }

  const title = mode === 'login' ? 'Enter the Arena' : 'Become a Hero';
  const description =
    mode === 'login'
      ? 'Authenticate to continue your mission.'
      : 'Your journey into the Marvel Learning Universe begins here.';
  const buttonText = mode === 'login' ? 'Activate Suit' : 'Join the Avengers';
  const alternativeText =
    mode === 'login'
      ? "Don't have an ID?"
      : 'Already an Avenger?';
  const alternativeLink = mode === 'login' ? '/register' : '/login';
  const alternativeLinkText = mode === 'login' ? 'Register Now' : 'Enter the Arena';

  return (
    <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/10">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold font-headline text-primary">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {mode === 'register' && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Call Sign</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Maverick" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{mode === 'login' ? 'Hero ID' : 'StarkNet ID'}</FormLabel>
                  <FormControl>
                    <Input placeholder="hero@shield.gov" {...field} />
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
                  <FormLabel>{mode === 'login' ? 'Security Code' : 'Access Code'}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {mode === 'register' && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Access Code</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit" className="w-full hover:shadow-lg hover:shadow-primary/50 transition-shadow">
              {buttonText}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {alternativeText}{' '}
          <Link href={alternativeLink} className="underline text-primary">
            {alternativeLinkText}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
