'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { ThorChallenge } from '@/components/games/thor-challenge';
import { useRouter } from 'next/navigation';

export default function StormCallerPage() {
    const router = useRouter();

    const handleSuccess = () => {
        try {
            const storedProgress = localStorage.getItem('thor-progress');
            let progress = storedProgress ? JSON.parse(storedProgress) : ['thor-low', 'thor-medium'];
            if (!progress.includes('thor-high')) {
                progress.push('thor-high');
            }
            localStorage.setItem('thor-progress', JSON.stringify(progress));
        } catch(e) {
            console.error("Failed to save progress", e);
        }
    };

    const levelDetails = {
        level: 'Medium' as const,
        title: 'Trial 2: Storm Caller',
        story: "Thor begins summoning storms. He must understand how lightning behaves under different conditions.",
        clue: "If thunder level is above 50, return 'Storm'. Else return 'Calm'.",
        initialCode: `function stormMode(power) {
  // Complete the function
  
}`,
        validate: (code: string): boolean => {
            try {
                // We create a function that returns the user's function, then execute it with test cases.
                const userFunction = new Function(`return (function() { ${code}; return stormMode; })()`)();
                const test1 = userFunction(60) === 'Storm';
                const test2 = userFunction(20) === 'Calm';
                return test1 && test2;
            } catch (e) {
                console.error(e);
                return false;
            }
        },
        successTitle: '⚡⚡ Storms Obey!',
        successMessage: 'The skies darken and thunder rolls at your command. You have passed the second trial.',
        onSuccess: handleSuccess,
        nextLevelUrl: '/games/thor',
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
