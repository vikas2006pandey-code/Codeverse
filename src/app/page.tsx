'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Dashboard from '@/components/dashboard';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { BrainCircuit, Gamepad2, BookOpen, Swords, Trophy, BarChart, Award, TrendingUp, MousePointer, Puzzle, Sparkles, Target, ShieldCheck, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { characters } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';


const Welcome = () => (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)_/_0.2),rgba(255,255,255,0))]"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] blur-sm">
                <Image 
                    src={PlaceHolderImages.find(p => p.id === 'captain-america')?.imageUrl || ''}
                    alt="background hero"
                    width={800}
                    height={800}
                    className="absolute left-0 top-1/4 object-contain"
                    data-ai-hint="captain america shield"
                />
                <Image 
                    src={PlaceHolderImages.find(p => p.id === 'iron-man')?.imageUrl || ''}
                    alt="background hero"
                    width={800}
                    height={800}
                    className="absolute right-0 bottom-1/4 object-contain"
                    data-ai-hint="iron suit"
                />
            </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:items-center lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
              Learn by Battling AI Marvel Heroes
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Defeat AI opponents. Master algorithms. Become an Avenger.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/challenges">Start Battle</Link>
              </Button>
              <Button asChild variant="link" size="lg">
                  <Link href="/learning">Choose Mission <span aria-hidden="true">→</span></Link>
              </Button>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-xl bg-card/10 p-2 ring-1 ring-inset ring-card/20 lg:-m-4 lg:rounded-2xl lg:p-4">
                <Image
                  data-ai-hint="app screenshot"
                  src="https://picsum.photos/seed/codeverse-welcome/1200/800"
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

       {/* How it works */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              Your Path to Becoming a Hero
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Just three simple steps to start your adventure in the Codeverse.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-center sm:grid-cols-3">
            <div className="flex flex-col items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary border-2 border-primary/20">
                    <MousePointer className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold font-headline">1. Choose Your Opponent</h3>
                <p className="mt-2 text-muted-foreground">Select a Marvel AI to challenge your skills.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary border-2 border-primary/20">
                    <Puzzle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold font-headline">2. Solve Challenges</h3>
                <p className="mt-2 text-muted-foreground">Answer questions and complete missions to win.</p>
            </div>
             <div className="flex flex-col items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary border-2 border-primary/20">
                    <Trophy className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold font-headline">3. Win and Unlock</h3>
                <p className="mt-2 text-muted-foreground">Earn XP, badges, and unlock stronger characters.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Opponent Preview */}
       <div className="py-24 sm:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Choose Your Opponent
                </h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Face off against iconic characters, each with a unique difficulty and AI behavior.
                </p>
            </div>
            <div className="mx-auto mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {characters.filter(c => ['spider-man', 'captain-america', 'thanos'].includes(c.id)).map((character) => {
                    const placeholder = PlaceHolderImages.find(p => p.id === character.image);
                    const isLocked = character.id === 'thanos';
                    return (
                        <Card key={character.id} className="relative flex flex-col transition-all duration-300 ease-in-out hover:scale-105 bg-card/50 group">
                            {isLocked && (
                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-md z-10">
                                    <Lock className="w-16 h-16 text-primary" />
                                    <p className="mt-4 font-bold text-xl font-headline">LOCKED</p>
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold font-headline">{character.name}</CardTitle>
                                <CardDescription>{character.personality}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col justify-center items-center">
                                {placeholder && (
                                    <div className="relative w-full h-80 mb-4 overflow-hidden rounded-md">
                                        <Image src={placeholder.imageUrl} alt={character.name} fill className="object-cover rounded-md" data-ai-hint={placeholder.imageHint} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    </div>
                                )}
                                <div className="space-y-1 text-sm text-muted-foreground text-center">
                                    <p>Intelligence: <span className="font-bold">{character.difficulty}</span></p>
                                    <p>Hints: <span className="font-bold">{character.id === 'spider-man' ? 'Available' : 'None'}</span></p>
                                    <p>Time Pressure: <span className="font-bold">{character.id === 'doctor-strange' ? 'High' : 'Low'}</span></p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Badge className={cn(`w-full justify-center py-2 text-sm font-semibold`, 
                                character.difficulty === 'Beginner' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                                character.difficulty === 'Advanced' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                                'bg-red-500/20 text-red-300 border-red-500/30')} variant="outline">
                                {character.difficulty} AI
                                </Badge>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
      </div>

      {/* Game Modes */}
       <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="text-base font-semibold leading-7 text-primary">Game On</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              A Universe of Challenges
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Learn by doing with a variety of mini-games designed to teach core concepts in a fun, interactive way.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
            {[
              { name: 'Shadows of the Knight', description: 'Use binary search logic with Daredevil.', icon: Gamepad2, href: '/games/shadows-of-the-knight' },
              { name: 'Death-First Search', description: 'Defend S.H.I.E.L.D. using graph logic.', icon: BrainCircuit, href: '/games/death-first-search' },
              { name: '1v1 Quiz Battles', description: 'Go head-to-head against Marvel AI.', icon: Swords, href: '/opponents' },
            ].map((feature) => (
              <Card key={feature.name} className="flex flex-col p-6 transition-all duration-300 ease-in-out hover:border-primary hover:scale-105 hover:shadow-lg hover:shadow-primary/20 bg-card/50">
                <CardHeader className="p-0">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <feature.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <CardTitle className="font-headline text-xl">{feature.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-4 flex-grow">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
                <CardFooter className="p-0 pt-4">
                  <Button asChild variant="link" className="p-0">
                    <Link href={feature.href}>Play Now <span aria-hidden="true">→</span></Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* AI Intelligence & Gamification */}
       <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                    Our AI Adapts to YOU
                </h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                    Codeverse's AI doesn't just ask questions. It learns your weaknesses, provides personalized hints, and adjusts the difficulty to keep you challenged but not overwhelmed.
                </p>
                <dl className="mt-10 grid grid-cols-1 gap-8 text-base leading-7 text-gray-600 sm:grid-cols-2">
                    <div className="flex gap-x-4">
                        <dt className="flex-none"><BrainCircuit className="h-7 w-6 flex-none text-primary" aria-hidden="true" /></dt>
                        <dd className="text-muted-foreground">Adaptive difficulty matches your skill level.</dd>
                    </div>
                    <div className="flex gap-x-4">
                        <dt className="flex-none"><Target className="h-7 w-6 flex-none text-primary" aria-hidden="true" /></dt>
                        <dd className="text-muted-foreground">Weakness detection for targeted practice.</dd>
                    </div>
                     <div className="flex gap-x-4">
                        <dt className="flex-none"><Sparkles className="h-7 w-6 flex-none text-primary" aria-hidden="true" /></dt>
                        <dd className="text-muted-foreground">Smart recommendations for what to learn next.</dd>
                    </div>
                </dl>
            </div>
             <div className="relative">
                <Card className="p-6 bg-card/80">
                    <CardTitle className="font-headline mb-4">Stay Engaged & Motivated</CardTitle>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-1 text-sm font-medium text-muted-foreground">
                                <span>Leaderboard Rank</span>
                                <span>#1,234</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5">
                                <div className="bg-primary h-2.5 rounded-full" style={{width: '45%'}}></div>
                            </div>
                        </div>
                         <div>
                            <div className="flex justify-between mb-1 text-sm font-medium text-muted-foreground">
                                <span>XP Progress</span>
                                <span>450 / 1000 XP</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5">
                                <div className="bg-accent h-2.5 rounded-full" style={{width: '45%'}}></div>
                            </div>
                        </div>
                        <div>
                             <p className="text-sm font-medium text-muted-foreground mb-2">Badges</p>
                             <div className="flex flex-wrap gap-2">
                                <Badge><Award className="mr-1" /> Perfect Score</Badge>
                                <Badge variant="secondary"><Swords className="mr-1" /> AI Defeated</Badge>
                                <Badge variant="outline">10-Day Streak</Badge>
                             </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
      </div>

      {/* Teacher/Admin Preview */}
      <div className="py-24 sm:py-32 bg-background/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl lg:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                    For Educators: S.H.I.E.L.D. Mission Control
                </h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                    Monitor your classroom's progress with a dedicated dashboard. Identify learning gaps and support students who need it most.
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                    <div className="flex flex-col items-center text-center p-6 border border-border/20 rounded-lg bg-card/30">
                        <dt className="text-base font-semibold leading-7 text-foreground">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <BarChart className="h-6 w-6" />
                            </div>
                            Class Performance
                        </dt>
                        <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                            <p className="flex-auto">View overall progress and success rates across all missions.</p>
                        </dd>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 border border-border/20 rounded-lg bg-card/30">
                        <dt className="text-base font-semibold leading-7 text-foreground">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            Weak Topic Heatmap
                        </dt>
                        <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                            <p className="flex-auto">Instantly identify topics where your students are struggling the most.</p>
                        </dd>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 border border-border/20 rounded-lg bg-card/30">
                        <dt className="text-base font-semibold leading-7 text-foreground">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Award className="h-6 w-6" />
                            </div>
                            Student Risk Indicators
                        </dt>
                        <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                            <p className="flex-auto">Get alerts for students who are falling behind or inactive.</p>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
      </div>
      
       {/* Security */}
      <div className="py-16 text-center">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <ShieldCheck className="h-5 w-5"/>
            <p>Built for education. Privacy-aware. Secure by design.</p>
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
