'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Lock, ArrowRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// This is a mock. In a real app, this would come from user data.
const useMissionStatus = () => {
    const [completed, setCompleted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching mission status
        const htmlProgress = localStorage.getItem('marvelmind-html-progress');
        const cssProgress = localStorage.getItem('marvelmind-css-progress');
        const jsProgress = localStorage.getItem('marvelmind-js-progress');

        // This is a simplified check. A real app would have a more robust way to check completion.
        const allCompleted = htmlProgress === '9' && cssProgress === '6' && jsProgress === '6';
        setCompleted(allCompleted);
        setLoading(false);
    }, []);
    
    return { missionsCompleted: completed, isLoading: loading };
}

export default function ExaminationPage() {
    const { missionsCompleted, isLoading } = useMissionStatus();

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
                    Certification Exam
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Prove your mastery and earn your official Codeverse Certificate.
                </p>
            </div>

            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Eligibility Status</CardTitle>
                    <CardDescription>You must complete all learning missions before attempting the exam.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isLoading ? (
                        <p>Checking your mission logs...</p>
                    ) : missionsCompleted ? (
                        <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/50 rounded-md">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                            <div>
                                <h3 className="font-semibold">Congratulations, Agent!</h3>
                                <p className="text-sm text-muted-foreground">You have completed all required missions and are eligible to take the certification exam.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 p-4 bg-destructive/10 border border-destructive/50 rounded-md">
                            <Lock className="w-8 h-8 text-destructive" />
                            <div>
                                <h3 className="font-semibold">Missions Incomplete</h3>
                                <p className="text-sm text-muted-foreground">You must complete all HTML, CSS, and JavaScript learning paths to unlock the exam.</p>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    {missionsCompleted ? (
                        <Button asChild className="w-full" size="lg">
                            <Link href="/examination/payment">
                                Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    ) : (
                        <Button asChild className="w-full" size="lg" variant="outline">
                            <Link href="/learning">
                                Back to Missions
                            </Link>
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
