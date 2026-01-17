'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Dashboard from '@/components/dashboard';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const Welcome = () => (
  <div className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-20 bg-background" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)_/_0.2),rgba(255,255,255,0))]" />
      
      {/* Floating Character Images */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={PlaceHolderImages.find(p => p.id === 'spider-man')?.imageUrl || ''}
          alt="Spider-Man"
          width={400}
          height={400}
          className="absolute -left-24 top-1/4 opacity-10 animate-float-down"
          data-ai-hint="spider suit"
        />
        <Image
          src={PlaceHolderImages.find(p => p.id === 'iron-man')?.imageUrl || ''}
          alt="Iron Man"
          width={400}
          height={400}
          className="absolute -right-24 bottom-1/4 opacity-10 animate-float-up"
          data-ai-hint="iron suit"
        />
      </div>

      <div className="container flex flex-col items-center justify-center text-center min-h-[calc(100vh-3.5rem)] animate-in fade-in-up">
        <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl font-headline neon-glow-primary">
          Welcome to MarvelMind
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Battle brilliant AI opponents inspired by Marvel characters and master any subject through exciting, adaptive quizzes. Your epic learning adventure begins now.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/login">Get Started</Link>
        </Button>
      </div>
    </div>
);

const LoadingScreen = () => (
    <div className="container py-12">
        <div className="space-y-4 max-w-4xl mx-auto text-center">
            <Skeleton className="h-10 w-1/3 mx-auto" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
    </div>
);


export default function HomePage() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Dashboard />;
  }

  return <Welcome />;
}
