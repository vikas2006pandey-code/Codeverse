'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Shield, Crown, Lock, ChevronLeft, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const levelsData = [
  {
    id: 'thor-low',
    name: 'Spark of Thunder',
    difficulty: 'Low',
    description: 'A simple logic task to prove basic worthiness.',
    icon: <Zap className="w-12 h-12 text-yellow-400" />,
    href: '/games/thor/low',
  },
  {
    id: 'thor-medium',
    name: 'Storm Caller',
    difficulty: 'Medium',
    description: 'Understand conditional logic to control the storms.',
    icon: <Shield className="w-12 h-12 text-blue-400" />,
    href: '/games/thor/medium',
  },
  {
    id: 'thor-high',
    name: 'God of Thunder',
    difficulty: 'High',
    description: 'Master functions and loops to unleash full power.',
    icon: <Crown className="w-12 h-12 text-purple-400" />,
    href: '/games/thor/high',
  },
];

const ThorHeaderAnimation = () => (
    <div className="relative h-24 w-full max-w-md mx-auto mb-4 flex items-center justify-center text-yellow-400">
        <Zap className="h-20 w-20 animate-lightning-pulse" />
    </div>
);

export default function PowerOfThorHub() {
  const [unlockedLevels, setUnlockedLevels] = useState(['thor-low']);
  const isGameCompleted = unlockedLevels.includes('thor-complete');

  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem('thor-progress');
      if (storedProgress) {
        setUnlockedLevels(JSON.parse(storedProgress));
      }
    } catch(e) {
      console.error("Could not parse thor progress", e);
      // If parsing fails, reset progress to avoid a broken state
      localStorage.removeItem('thor-progress');
      setUnlockedLevels(['thor-low']);
    }
  }, []);

  const resetProgress = () => {
    localStorage.removeItem('thor-progress');
    setUnlockedLevels(['thor-low']);
  };

  if (isGameCompleted) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <Card className="max-w-2xl text-center animate-in fade-in zoom-in-95">
          <CardHeader>
            <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
            <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
              You ARE Worthy!
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              You have mastered all of Odin's trials and reclaimed the full power of Thor. Mjolnir is yours to command!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Button onClick={resetProgress} size="lg">Play Again</Button>
            <Button asChild variant="outline">
              <Link href="/games">Back to Game Zone</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/games">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Game Zone
        </Link>
      </Button>
      <div className="text-center mb-12">
        <ThorHeaderAnimation />
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline text-glow-yellow">
          The Power of Thor
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Thor has lost control over his lightning. To regain the power of Mjolnir, you must prove worthy by solving Odin’s coding trials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {levelsData.map((level) => {
          const isUnlocked = unlockedLevels.includes(level.id);
          return (
            <div key={level.name} className="group block">
              <Card className={cn(
                  "h-full flex flex-col justify-between text-center p-6 transition-all duration-300 ease-in-out bg-card/50",
                  !isUnlocked && "opacity-50 cursor-not-allowed",
                  isUnlocked && "hover:border-primary hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                )}>
                <CardHeader className="items-center">
                  {level.icon}
                  <CardTitle className="mt-4 text-2xl font-bold font-headline">{level.name}</CardTitle>
                  <CardDescription>{level.difficulty} Difficulty</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{level.description}</p>
                </CardContent>
                <CardContent>
                  {isUnlocked ? (
                      <Button asChild className="w-full">
                          <Link href={level.href}>Begin Trial</Link>
                      </Button>
                  ) : (
                      <Button className="w-full" disabled>
                          <Lock className="mr-2 h-4 w-4" />
                          Locked
                      </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  );
}
