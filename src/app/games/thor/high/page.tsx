'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { ThorChallenge } from '@/components/games/thor-challenge';
import { useRouter } from 'next/navigation';

export default function GodOfThunderPage() {
    const router = useRouter();

    const handleSuccess = () => {
        try {
            const storedProgress = localStorage.getItem('thor-progress');
            let progress = storedProgress ? JSON.parse(storedProgress) : ['thor-low', 'thor-medium'];
            if (!progress.includes('thor-high')) {
                progress.push('thor-high');
            }
             if (!progress.includes('thor-complete')) {
                progress.push('thor-complete');
            }
            localStorage.setItem('thor-progress', JSON.stringify(progress));
        } catch(e) {
            console.error("Failed to save progress", e);
        }
    };

    const levelDetails = {
        level: 'High' as const,
        title: 'Final Trial: God of Thunder',
        story: "Thor faces Odin’s final test. Only true logic mastery can unleash full lightning power and prove him worthy.",
        clue: "Thor’s hammer charges lightning by summing all even numbers up to a given number N.",
        initialCode: `function lightningCharge(n) {
  // Write your function here
  
}`,
        validate: (code: string): boolean => {
            try {
                const userFunction = new Function(`return (function() { ${code}; return lightningCharge; })()`)();
                // Test cases
                const test1 = userFunction(6) === 12; // 2 + 4 + 6
                const test2 = userFunction(10) === 30; // 2 + 4 + 6 + 8 + 10
                const test3 = userFunction(1) === 0;
                return test1 && test2 && test3;
            } catch (e) {
                console.error(e);
                return false;
            }
        },
        successTitle: '🔨 YOU ARE WORTHY!',
        successMessage: 'Mjolnir returns to your hand, crackling with the full power of the cosmos! You are the God of Thunder!',
        onSuccess: handleSuccess,
        nextLevelUrl: '/games/thor', // Go back to hub to see completion screen
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
