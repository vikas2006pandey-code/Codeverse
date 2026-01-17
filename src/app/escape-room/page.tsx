'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, ChevronLeft, Paintbrush, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const escapeRoomGames = [
  {
    name: 'HTML Escape Room',
    description: 'Solve HTML puzzles to build a webpage and find your way out.',
    icon: <Code className="w-12 h-12 text-primary" />,
    href: '/learning/html/escape-room',
  },
  {
    name: 'CSS Escape Room',
    description: 'Solve CSS puzzles to style a component and escape.',
    icon: <Paintbrush className="w-12 h-12 text-accent" />,
    href: '/learning/css/escape-room',
  },
];

export default function EscapeRoomHubPage() {
  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/challenges">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Challenges
        </Link>
      </Button>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          Escape Room
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose a language to begin your escape.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {escapeRoomGames.map((game) => (
          <Link key={game.name} href={game.href} className="group block">
            <Card className="h-full flex flex-col justify-center items-center text-center p-6 transition-all duration-300 ease-in-out group-hover:border-primary group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20 bg-card/50">
              <CardHeader>
                {game.icon}
                <CardTitle className="mt-4 text-2xl font-bold font-headline">{game.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{game.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
        {/* Placeholder for other languages */}
        <Card className="h-full flex flex-col justify-center items-center text-center p-6 bg-card/50 opacity-50 cursor-not-allowed">
            <CardHeader>
                <Cpu className="w-12 h-12 text-muted-foreground" />
                <CardTitle className="mt-4 text-2xl font-bold font-headline">JS (Coming Soon)</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">A JavaScript version of the escape room is being built.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
