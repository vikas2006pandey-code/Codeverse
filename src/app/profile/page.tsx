'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Medal, Zap, ChevronLeft, Github, Linkedin, Instagram, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

// Define the UserProfile type based on Firestore data structure
type UserProfile = {
  username: string;
  email: string;
  xp: number;
  badges: number;
  photoURL?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
};

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

const LoadingProfile = () => (
  <div className="grid gap-8 max-w-4xl mx-auto">
    <Card>
      <CardHeader className="flex-row items-center gap-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="space-y-2 flex-grow">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-64" />
        </div>
      </CardHeader>
    </Card>
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  </div>
);


export default function ProfilePage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => (user ? doc(firestore, 'users', user.uid) : null), [user, firestore]);
  const { data: userProfile, isLoading } = useDoc<UserProfile>(userDocRef);

  // Mock data for features not yet in Firestore
  const mockProgress = {
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
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-72 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto mt-4" />
        </div>
        <LoadingProfile />
      </div>
    )
  }

  if (!userProfile) {
    return (
        <div className="container py-12 text-center">
            <p>Could not load user profile.</p>
        </div>
    );
  }

  const currentLevel = Math.floor(userProfile.xp / 1000);
  const xpForCurrentLevel = currentLevel * 1000;
  const xpForNextLevel = (currentLevel + 1) * 1000;
  const levelProgress = ((userProfile.xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;

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

        {/* Profile Header */}
        <Card>
            <CardHeader className="flex-col md:flex-row items-center gap-6">
                <Avatar className="h-28 w-28 border-4 border-primary">
                    <AvatarImage src={userProfile.photoURL} alt={userProfile.username} />
                    <AvatarFallback className="text-4xl">{userProfile.username?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-grow text-center md:text-left">
                    <CardTitle className="text-3xl font-headline">{userProfile.username}</CardTitle>
                    <CardDescription className="text-base">{userProfile.email}</CardDescription>
                    <div className="flex gap-4 mt-4 justify-center md:justify-start">
                        {userProfile.github && <a href={userProfile.github} target="_blank" rel="noopener noreferrer"><Github className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors"/></a>}
                        {userProfile.linkedin && <a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors"/></a>}
                        {userProfile.instagram && <a href={userProfile.instagram} target="_blank" rel="noopener noreferrer"><Instagram className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors"/></a>}
                    </div>
                </div>
                <Button asChild variant="outline">
                    <Link href="/profile/manage">
                        <Settings className="mr-2 h-4 w-4" />
                        Manage Profile
                    </Link>
                </Button>
            </CardHeader>
        </Card>

        {/* XP and Level */}
        <Card>
          <CardHeader>
            <CardTitle>Level {currentLevel}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">XP: {userProfile.xp.toLocaleString()} / {xpForNextLevel.toLocaleString()}</p>
            <Progress value={levelProgress} className="h-4" />
            <div className="mt-4 flex items-center justify-around text-center pt-4 border-t">
              <div>
                <Medal className="mx-auto h-8 w-8 text-yellow-400 mb-1" />
                <p className="font-bold text-xl">{userProfile.badges}</p>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
              </div>
              <div>
                <Zap className="mx-auto h-8 w-8 text-primary mb-1" />
                <p className="font-bold text-xl">{userProfile.xp.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total XP</p>
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
              {mockProgress.allCharacters.map(char => (
                <Badge
                  key={char}
                  variant={mockProgress.unlockedCharacters.includes(char) ? 'default' : 'secondary'}
                  className={!mockProgress.unlockedCharacters.includes(char) ? 'opacity-50' : ''}
                >
                  {char}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Infinity Stones */}
        <Card>
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle>Infinity Stones Collected</CardTitle>
             <Button asChild variant="ghost" size="sm">
                <Link href="/badges">View Gauntlet</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap">
              {mockProgress.infinityStones.map(stone => (
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
