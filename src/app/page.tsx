'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Dashboard from '@/components/dashboard';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

const Welcome = () => (
    <div className="relative isolate overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:items-center lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
            Battle Marvel AI. Master Your Subjects.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Engage in epic quiz battles against iconic Marvel characters powered by AI. Each victory unlocks new challenges and brings you closer to mastering your chosen subjects.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/register">Get started</Link>
            </Button>
            <Button asChild variant="link" size="lg">
                <Link href="/learning">Learn more <span aria-hidden="true">→</span></Link>
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-card/10 p-2 ring-1 ring-inset ring-card/20 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                data-ai-hint="app screenshot"
                src="https://picsum.photos/seed/marvelmind-welcome/1200/800"
                alt="App screenshot"
                width={1200}
                height={800}
                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-foreground/10"
              />
            </div>
          </div>
        </div>
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
