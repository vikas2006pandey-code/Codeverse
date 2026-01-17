'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, DollarSign, ArrowRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function PaymentPage() {
    return (
        <div className="container py-12 flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline flex items-center gap-2">
                        <CreditCard />
                        Confirm Your Enrollment
                    </CardTitle>
                    <CardDescription>
                        A one-time fee is required to take the certification exam.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-6 bg-muted/50 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                        <p className="text-4xl font-bold font-mono">$10.00</p>
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                        This is a simulated payment gateway for demonstration purposes. No real transaction will occur.
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <Button asChild className="w-full" size="lg">
                        <Link href="/examination/start">
                            <DollarSign className="mr-2" /> Pay and Start Exam
                        </Link>
                    </Button>
                    <Button asChild variant="ghost">
                        <Link href="/examination">
                            <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
