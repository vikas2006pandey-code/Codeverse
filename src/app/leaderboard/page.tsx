'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, ChevronLeft } from "lucide-react"
import { useCollection, useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type UserProfile = {
  id: string;
  username: string;
  xp: number;
  badges: number;
}

const LoadingLeaderboard = () => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px] text-center">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">XP</TableHead>
                <TableHead className="text-right">Badges</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-10 mx-auto" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-5 w-12 ml-auto" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-5 w-8 ml-auto" /></TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default function LeaderboardPage() {
  const { user: currentUser } = useUser();
  const firestore = useFirestore();

  const usersQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'users'), orderBy('xp', 'desc')) : null),
    [firestore]
  );
  
  const { data: users, isLoading } = useCollection<UserProfile>(usersQuery);

  const leaderboard = users
    ? users.map((user, index) => ({
        ...user,
        rank: index + 1,
      }))
    : [];

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
          Leaderboard
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          See who is at the top of the Codeverse universe.
        </p>
      </div>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Top Learners</CardTitle>
          <CardDescription>Current rankings based on XP and achievements.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? <LoadingLeaderboard /> : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-center">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">XP</TableHead>
                  <TableHead className="text-right">Badges</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((user) => (
                  <TableRow key={user.id} className={user.id === currentUser?.uid ? "bg-primary/10" : ""}>
                    <TableCell className="font-bold text-center flex items-center justify-center gap-2">
                      {user.rank === 1 && <Trophy className="w-5 h-5 text-yellow-400" />}
                      {user.rank === 2 && <Trophy className="w-5 h-5 text-gray-400" />}
                      {user.rank === 3 && <Trophy className="w-5 h-5 text-yellow-600" />}
                      {user.rank}
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell className="text-right">{(user.xp || 0).toLocaleString()}</TableCell>
                    <TableCell className="text-right flex items-center justify-end gap-2">
                      {user.badges || 0} <Medal className="w-4 h-4 text-yellow-500" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
