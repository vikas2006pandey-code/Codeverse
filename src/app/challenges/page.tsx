'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Swords, Bug, Keyboard, Code, BookOpen, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const allGames = [
  {
    name: '1v1 Quiz Battle',
    description: 'Go head-to-head with a Marvel AI. Choose your topic and test your knowledge.',
    icon: <Swords className="w-12 h-12 text-primary" />,
    href: '/opponents',
  },
  {
    name: 'Escape Room',
    description: 'Solve puzzles to build a webpage and find your way out. Select your language.',
    icon: <Code className="w-12 h-12 text-chart-1" />,
    href: '/escape-room',
  },
   {
    name: 'Storytelling',
    description: 'Team up with a Marvel hero to learn through an interactive story.',
    icon: <BookOpen className="w-12 h-12 text-chart-2" />,
    href: '/storytelling',
  },
  {
    name: 'Typing Challenge',
    description: 'Test your coding speed and accuracy by typing out code snippets against the clock.',
    icon: <Keyboard className="w-12 h-12 text-accent" />,
    href: '/typing-challenge',
  },
  {
    name: 'Bug Hunt',
    description: 'Find and fix errors in broken code. Choose from HTML, CSS, or JS.',
    icon: <Bug className="w-12 h-12 text-chart-5" />,
    href: '/bug-hunts',
  },
];


export default function ChallengesPage() {
  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          Challenge Arena
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose your game mode and prove your skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allGames.sort((a,b) => a.name.localeCompare(b.name)).map((mode) => (
          <Link key={mode.name} href={mode.href} className="group block">
            <Card className="h-full flex flex-col justify-between text-center p-6 transition-all duration-300 ease-in-out group-hover:border-primary group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20 bg-card/50">
              <CardHeader className="items-center">
                  {mode.icon}
                  <CardTitle className="mt-4 text-2xl font-bold font-headline">{mode.name}</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground">{mode.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
