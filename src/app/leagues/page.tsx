'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronLeft, Trophy, Shield, ArrowUp, ArrowDown, Minus, CheckSquare, Swords } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';

// Mock Data based on the user's prompt
const leagues = {
  'spider-verse': { name: 'Spider-Verse League', icon: <Shield className="w-8 h-8 text-blue-400" />, rank: 'Beginner' },
  'avengers': { name: 'Avengers League', icon: <Shield className="w-8 h-8 text-red-500" />, rank: 'Intermediate' },
  'wakanda': { name: 'Wakanda League', icon: <Shield className="w-8 h-8 text-purple-500" />, rank: 'Advanced' },
  'infinity': { name: 'Infinity League', icon: <Shield className="w-8 h-8 text-yellow-400" />, rank: 'Elite' },
};

const mockLeaderboard = [
  { rank: 1, name: 'QuantumCoder', score: 12500, accuracy: 98, trend: 'up', status: 'promotion' },
  { rank: 2, name: 'SyntaxSorcerer', score: 12200, accuracy: 95, trend: 'up', status: 'promotion' },
  { rank: 3, name: 'BinaryBard', score: 11800, accuracy: 96, trend: 'down', status: 'promotion' },
  { rank: 4, name: 'CodeCrusader', score: 10500, accuracy: 92, trend: 'up', status: 'stay' },
  { rank: 5, name: 'You', score: 9800, accuracy: 89, trend: 'up', status: 'stay' },
  { rank: 6, name: 'LogicLancer', score: 9500, accuracy: 88, trend: 'down', status: 'stay' },
  { rank: 7, name: 'DevDude', score: 8800, accuracy: 90, trend: 'stay', status: 'stay' },
  { rank: 8, name: 'BugHunterX', score: 8100, accuracy: 85, trend: 'up', status: 'stay' },
  { rank: 9, name: 'ScriptSavvy', score: 7200, accuracy: 80, trend: 'down', status: 'demotion' },
  { rank: 10, name: 'AlgoRookie', score: 6500, accuracy: 78, trend: 'down', status: 'demotion' },
];

const mockMissions = [
    { title: 'Defeat Iron Man without hints', completed: true },
    { title: 'Win 3 battles using Binary Search logic', completed: false },
    { title: 'Achieve 95% accuracy in a quiz', completed: true },
    { title: 'Complete a "Hard" difficulty game', completed: false },
];

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const endOfWeek = new Date(now);
            endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
            endOfWeek.setHours(23, 59, 59, 999);

            const difference = endOfWeek.getTime() - now.getTime();
            
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-center gap-2 font-mono">
            <span>{String(timeLeft.days).padStart(2, '0')}d</span>:
            <span>{String(timeLeft.hours).padStart(2, '0')}h</span>:
            <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>:
            <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
        </div>
    );
};

const PromotionZoneIndicator = ({ status }: { status: 'promotion' | 'stay' | 'demotion' }) => {
    if (status === 'promotion') return <ArrowUp className="w-5 h-5 text-green-500" />;
    if (status === 'demotion') return <ArrowDown className="w-5 h-5 text-red-500" />;
    return <Minus className="w-5 h-5 text-muted-foreground" />;
};


export default function LeaguesPage() {
    const { user } = useUser();
    const currentLeague = leagues['avengers']; // Mock current league

    return (
        <div className="container py-12">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/compete">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Compete
                </Link>
            </Button>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
                    Weekly Leagues
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Climb the ranks and prove your mastery. A new league begins every week.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column: Your Status & Missions */}
                <div className="lg:col-span-1 space-y-8 sticky top-20">
                    <Card>
                        <CardHeader className="text-center">
                           <div className="mx-auto w-fit mb-2">{currentLeague.icon}</div>
                            <CardTitle className="font-headline">{currentLeague.name}</CardTitle>
                            <CardDescription>Your current standing</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center space-y-4">
                            <div className="text-4xl font-bold">Rank #5</div>
                            <Progress value={60} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Demotion Zone</span>
                                <span>Promotion Zone</span>
                            </div>
                        </CardContent>
                         <CardFooter className="flex-col gap-2">
                            <p className="text-sm font-medium">Time Left in Season:</p>
                            <CountdownTimer />
                        </CardFooter>
                    </Card>

                    <Card>
                         <CardHeader>
                             <CardTitle className="font-headline">Weekly Missions</CardTitle>
                             <CardDescription>Complete for bonus points</CardDescription>
                         </CardHeader>
                         <CardContent className="space-y-3">
                             {mockMissions.map((mission, i) => (
                                 <div key={i} className="flex items-center gap-3">
                                     <CheckSquare className={cn("w-5 h-5", mission.completed ? 'text-primary' : 'text-muted-foreground/50')} />
                                     <span className={cn(mission.completed ? 'text-foreground' : 'text-muted-foreground')}>{mission.title}</span>
                                 </div>
                             ))}
                         </CardContent>
                    </Card>
                </div>
                
                {/* Right Column: Leaderboard */}
                <div className="lg:col-span-2">
                    <Card>
                         <CardHeader>
                            <CardTitle className="font-headline">{currentLeague.name} Leaderboard</CardTitle>
                             <CardDescription>Top 1-3 will be promoted. Bottom 1-2 will be demoted.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-16 text-center">Rank</TableHead>
                                        <TableHead>Agent</TableHead>
                                        <TableHead className="text-right">Score</TableHead>
                                        <TableHead className="text-right w-24">Accuracy</TableHead>
                                        <TableHead className="text-center w-20">Zone</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockLeaderboard.map(player => (
                                        <TableRow key={player.rank} className={player.name === 'You' ? 'bg-primary/10' : ''}>
                                            <TableCell className="font-bold text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    {player.rank === 1 && <Trophy className="w-4 h-4 text-yellow-400" />}
                                                    {player.rank}
                                                </div>
                                            </TableCell>
                                            <TableCell>{player.name}</TableCell>
                                            <TableCell className="text-right font-mono">{(player.score || 0).toLocaleString()}</TableCell>
                                            <TableCell className="text-right font-mono">{player.accuracy}%</TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex justify-center">
                                                     <PromotionZoneIndicator status={player.status as any} />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
