'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { ThorChallenge } from '@/components/games/thor-challenge';
import { useRouter } from 'next/navigation';

export default function SparkOfThunderPage() {
    const router = useRouter();

    const handleSuccess = () => {
        try {
            const storedProgress = localStorage.getItem('thor-progress');
            let progress = storedProgress ? JSON.parse(storedProgress) : ['thor-low'];
            if (!progress.includes('thor-medium')) {
                progress.push('thor-medium');
            }
            localStorage.setItem('thor-progress', JSON.stringify(progress));
        } catch(e) {
            console.error("Failed to save progress", e);
        }
    };

    const levelDetails = {
        level: 'Low' as const,
        title: 'Trial 1: Spark of Thunder',
        story: "Thor can only create a small spark. Odin has given him a simple logic task to prove his worthiness and begin his journey.",
        clue: 'The lightning spark activates only if the function returns 10.',
        initialCode: `function sparkPower() {
  // Fix the logic to return 10
  return 5 * 1;
}`,
        validate: (code: string): boolean => {
            try {
                // Create a function from the user's code string and execute it.
                // This is a safe way to run user-provided code in the browser on the client-side.
                const userFunction = new Function(`${code}; return sparkPower();`);
                const result = userFunction();
                return result === 10;
            } catch (e) {
                console.error(e);
                return false;
            }
        },
        successTitle: '⚡ Spark Unlocked!',
        successMessage: 'A faint spark crackles at Thor\'s fingertips. You have passed the first trial.',
        onSuccess: handleSuccess,
        nextLevelUrl: '/games/thor', // Go back to hub to see unlocked level
    };

    return (
        <div className="container py-12 min-h-[calc(100vh-3.5rem)] flex flex-col">
            <div className="mb-8">
                <Button asChild variant="ghost">
                    <Link href="/games/thor">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Trials
                    </Link>
                </Button>
            </div>
            <div className="flex-grow flex items-center justify-center">
                <ThorChallenge {...levelDetails} />
            </div>
        </div>
    );
}
