'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Medal, Zap, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

// Marvel-themed icon for Infinity Stones
const InfinityStone = ({ color, collected }: { color: string; collected: boolean }) => (
  <div className={`relative transition-all duration-500 ${collected ? 'opacity-100' : 'opacity-20'}`}>
    <svg viewBox="0 0 60 80" className="w-9 h-12">
      <path
        d="M30 5 C 30 5 0 25 0 40 C 0 55 30 75 30 75 C 30 75 60 55 60 40 C 60 25 30 5 30 5 Z"
        fill={color}
        className={collected ? `drop-shadow-[0_0_10px_${color}]` : ''}
      />
    </svg>
  </div>
);

export default function ProfilePage() {
  const userProgress = {
    xp: 2450,
    unlockedCharacters: ['Spider-Man', 'Iron Man'],
    allCharacters: ['Spider-Man', 'Iron Man', 'Thanos', 'Captain America', 'Thor', 'Hulk'],
    infinityStones: [
      { name: 'Space Stone', color: '#7DF9FF', collected: true },
      { name: 'Mind Stone', color: '#FFD700', collected: true },
      { name: 'Reality Stone', color: '#FF4136', collected: false },
      { name: 'Power Stone', color: '#FF00FF', collected: true },
      { name: 'Time Stone', color: '#2ECC40', collected: false },
      { name: 'Soul Stone', color: '#FF851B', collected: false },
    ],
    streak: 15,
    badges: ['Perfect Score', 'Beginner AI Defeated', '10-Day Streak'],
  };

  const currentLevel = Math.floor(userProgress.xp / 1000);
  const xpForCurrentLevel = currentLevel * 1000;
  const xpForNextLevel = (currentLevel + 1) * 1000;
  const levelProgress = ((userProgress.xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;

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
          Your Profile
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Track your journey to becoming a master learner.
        </p>
      </div>

      <div className="grid gap-8 max-w-4xl mx-auto">
        {/* XP and Level */}
        <Card>
          <CardHeader>
            <CardTitle>Level {currentLevel}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">XP: {userProgress.xp} / {xpForNextLevel}</p>
            <Progress value={levelProgress} className="h-4" />
            <div className="mt-4 flex items-center justify-around text-center pt-4">
              <div>
                <Zap className="mx-auto h-8 w-8 text-primary mb-1" />
                <p className="font-bold text-xl">{userProgress.streak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
              <div>
                <Medal className="mx-auto h-8 w-8 text-yellow-400 mb-1" />
                <p className="font-bold text-xl">{userProgress.badges.length}</p>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unlocked Characters */}
        <Card>
          <CardHeader>
            <CardTitle>Unlocked Characters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userProgress.allCharacters.map(char => (
                <Badge
                  key={char}
                  variant={userProgress.unlockedCharacters.includes(char) ? 'default' : 'secondary'}
                  className={!userProgress.unlockedCharacters.includes(char) ? 'opacity-50' : ''}
                >
                  {char}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Infinity Stones */}
        <Card>
          <CardHeader>
            <CardTitle>Infinity Stones Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap">
              {userProgress.infinityStones.map(stone => (
                <div key={stone.name} className="flex flex-col items-center gap-2">
                  <InfinityStone color={stone.color} collected={stone.collected} />
                  <p className="text-sm font-medium text-muted-foreground">{stone.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
