'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useUser, useFirestore, useDoc, useMemoFirebase, updateDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github, Instagram, Linkedin, ChevronLeft } from 'lucide-react';
import Link from 'next/link';


const profileFormSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters.' }).max(20, { message: 'Username can be at most 20 characters.' }),
  photoURL: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  instagram: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  linkedin: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  github: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type UserProfile = {
  username: string;
  email: string;
  photoURL?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
}

const ProfileForm = () => {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const userDocRef = useMemoFirebase(() => (user ? doc(firestore, 'users', user.uid) : null), [user, firestore]);
  const { data: userProfile, isLoading } = useDoc<UserProfile>(userDocRef);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
      photoURL: '',
      instagram: '',
      linkedin: '',
      github: '',
    },
  });
  
  const { isSubmitting, isDirty, isSubmitSuccessful } = form.formState;

  useEffect(() => {
    if (userProfile) {
      form.reset({ 
        username: userProfile.username || '',
        photoURL: userProfile.photoURL || '',
        instagram: userProfile.instagram || '',
        linkedin: userProfile.linkedin || '',
        github: userProfile.github || '',
      });
    }
  }, [userProfile, form]);
  
  useEffect(() => {
    if (isSubmitSuccessful) {
        form.reset(form.getValues(), { keepDirty: false });
    }
  }, [isSubmitSuccessful, form]);


  const onSubmit = (values: ProfileFormValues) => {
    if (!userDocRef) return;
    
    updateDocumentNonBlocking(userDocRef, values);
    
    toast({
      title: 'Success!',
      description: 'Your profile has been submitted for an update.',
    });
  };

  if (isLoading) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Manage Profile</CardTitle>
                <CardDescription>Update your public profile and social links.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="space-y-4">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Separator />
                <div className="space-y-4">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-24 w-full" />
                </div>
            </CardContent>
            <CardFooter>
                 <Skeleton className="h-10 w-28" />
            </CardFooter>
        </Card>
    )
  }

  if (!userProfile) {
    return null; // Or a message saying profile not found
  }
  
  const currentPhotoURL = form.watch('photoURL');

  return (
    <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
                <CardTitle>Manage Profile</CardTitle>
                <CardDescription>Update your public profile and social links.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={currentPhotoURL} alt={userProfile.username} />
                        <AvatarFallback>{userProfile.username?.[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-2 flex-grow">
                        <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Your username" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                         <div className="space-y-2">
                            <Label>Email</Label>
                            <Input value={userProfile.email} disabled />
                        </div>
                    </div>
                </div>

                 <FormField
                  control={form.control}
                  name="photoURL"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Picture URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://your-image-url.com/photo.jpg" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter a URL to an image to set as your profile picture.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Separator />

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Social Links</h3>
                     <FormField
                        control={form.control}
                        name="github"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="flex items-center gap-2">
                                <Github className="h-4 w-4" /> GitHub
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="https://github.com/username" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                     <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="flex items-center gap-2">
                                <Linkedin className="h-4 w-4" /> LinkedIn
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="https://linkedin.com/in/username" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="instagram"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="flex items-center gap-2">
                                <Instagram className="h-4 w-4" /> Instagram
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="https://instagram.com/username" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
            <CardFooter>
                 <Button type="submit" disabled={isSubmitting || !isDirty}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
            </CardFooter>
          </form>
        </Form>
    </Card>
  );
};

export default function ManageAccountPage() {
    return (
        <div className="container py-12">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/profile">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Profile
                </Link>
            </Button>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
                Manage Your Account
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                Update your profile, preferences, and security settings.
                </p>
            </div>
            <div className="max-w-2xl mx-auto space-y-8">
                <ProfileForm />
            </div>
        </div>
    );
}
