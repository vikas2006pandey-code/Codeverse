import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
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

export default function BadgesPage() {
  const userProgress = {
    infinityStones: [
      { name: 'Space Stone', color: '#7DF9FF', collected: true },
      { name: 'Mind Stone', color: '#FFD700', collected: true },
      { name: 'Reality Stone', color: '#FF4136', collected: false },
      { name: 'Power Stone', color: '#FF00FF', collected: true },
      { name: 'Time Stone', color: '#2ECC40', collected: false },
      { name: 'Soul Stone', color: '#FF851B', collected: false },
    ],
  };

  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/profile">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Link>
      </Button>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          Your Infinity Stones
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Collect all six Infinity Stones by mastering subjects and defeating opponents.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
            <CardTitle className="text-center">Your Gauntlet</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap p-4">
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
  );
}
