'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, ShieldAlert, FileText, Download, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/firebase';

export default function CertificatePage() {
    const searchParams = useSearchParams();
    const { user } = useUser();
    const score = Number(searchParams.get('score') || '0');
    const hasPassed = score >= 70;
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="container py-12 flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
            {hasPassed ? (
                <Card className="w-full max-w-3xl text-center">
                    <CardHeader>
                        <Award className="mx-auto h-16 w-16 text-yellow-400" />
                        <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
                            Congratulations!
                        </CardTitle>
                        <CardDescription className="text-lg text-muted-foreground">
                            You have successfully passed the Codeverse Certification Exam.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="py-8">
                        <div className="border-4 border-primary p-8 rounded-lg bg-background/50 relative">
                             <div className="absolute top-4 right-4 text-primary">
                                <FileText className="h-10 w-10" />
                             </div>
                            <h2 className="text-3xl font-headline text-primary">Certificate of Achievement</h2>
                            <p className="mt-4 text-muted-foreground">This certifies that</p>
                            <p className="text-2xl font-bold my-2">{user?.displayName || user?.email || 'Valued Agent'}</p>
                            <p className="text-muted-foreground">has successfully completed the</p>
                            <p className="text-xl font-semibold">Codeverse Full-Stack Mission</p>
                            <p className="mt-4 text-sm text-muted-foreground">on {today} with a score of <span className="font-bold">{score.toFixed(0)}%</span>.</p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col sm:flex-row justify-center gap-4">
                        <Button onClick={() => window.print()}><Download className="mr-2" /> Download Certificate</Button>
                        <Button variant="outline"><Share2 className="mr-2" /> Share Result</Button>
                    </CardFooter>
                </Card>
            ) : (
                 <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <ShieldAlert className="mx-auto h-16 w-16 text-destructive" />
                        <CardTitle className="text-4xl font-bold font-headline mt-4">Mission Update</CardTitle>
                        <CardDescription className="text-lg">
                            Unfortunately, you did not pass the exam this time. A score of 70% is required.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl">Your Score: <span className="font-bold text-destructive">{score.toFixed(0)}%</span></p>
                        <p className="mt-2 text-muted-foreground">Don't be discouraged, agent. Review the learning materials and try again.</p>
                    </CardContent>
                     <CardFooter className="flex-col sm:flex-row justify-center gap-4">
                        <Button asChild>
                            <Link href="/learning">Review Missions</Link>
                        </Button>
                         <Button asChild variant="outline">
                            <Link href="/examination">Try Again</Link>
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}
