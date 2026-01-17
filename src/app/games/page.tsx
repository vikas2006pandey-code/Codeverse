'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Puzzle, ShieldQuestion, Zap, BarChartBig, BrainCircuit, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const newGames = [
  {
    name: 'Onboarding Puzzle',
    description: 'A beginner mission to introduce the platform flow and basic coding logic. Guide Spider-Man through a training simulation.',
    icon: <Puzzle className="w-12 h-12 text-primary" />,
    href: '/games/onboarding-puzzle',
    disabled: false,
  },
  {
    name: 'Shadows of the Knight',
    description: 'Use binary search logic to locate a villain in a grid, like Daredevil using his radar sense.',
    icon: <ShieldQuestion className="w-12 h-12 text-chart-5" />,
    href: '#',
    disabled: true,
  },
  {
    name: 'Power of Thor',
    description: 'Use loops and directional logic to guide Thor to his enemies in a battle zone.',
    icon: <Zap className="w-12 h-12 text-yellow-400" />,
    href: '#',
    disabled: true,
  },
  {
    name: 'The Descent',
    description: 'Help Iron Man defend against missiles by finding the highest threat in an array of mountains.',
    icon: <BarChartBig className="w-12 h-12 text-destructive" />,
    href: '#',
    disabled: true,
  },
  {
    name: 'Death First Search',
    description: 'Defend the S.H.I.E.L.D. network from Hydra by cutting links in a graph, using BFS-like logic.',
    icon: <BrainCircuit className="w-12 h-12 text-chart-2" />,
    href: '#',
    disabled: true,
  },
];

export default function GamesPage() {
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
          Game Zone
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
        Five new coding missions to test your logic and problem-solving skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newGames.map((game) => (
          game.disabled ? (
             <Card key={game.name} className="h-full flex flex-col justify-between text-center p-6 bg-card/50 opacity-50 cursor-not-allowed">
              <CardHeader className="items-center">
                  {game.icon}
                  <CardTitle className="mt-4 text-2xl font-bold font-headline">{game.name}</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground">{game.description}</p>
                   <p className="text-sm font-semibold text-yellow-400 mt-4">(Coming Soon)</p>
              </CardContent>
            </Card>
          ) : (
          <Link key={game.name} href={game.href} className="group block">
            <Card className="h-full flex flex-col justify-between text-center p-6 transition-all duration-300 ease-in-out group-hover:border-primary group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20 bg-card/50">
              <CardHeader className="items-center">
                  {game.icon}
                  <CardTitle className="mt-4 text-2xl font-bold font-headline">{game.name}</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground">{game.description}</p>
              </CardContent>
            </Card>
          </Link>
          )
        ))}
      </div>
    </div>
  );
}
