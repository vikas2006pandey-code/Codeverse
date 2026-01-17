'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ChevronLeft, Code, CheckCircle, ShieldAlert, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

// The powerful animation component for the header
const IronManHeaderAnimation = () => (
  <div className="relative h-24 w-full max-w-md mx-auto mb-4 overflow-hidden rounded-lg bg-black/30 border border-destructive/30">
    {/* Radar sweep line */}
    <div className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-transparent to-destructive/50 animate-radar-sweep"></div>
    
    {/* Falling missile elements with varied delays and positions */}
    <div className="absolute top-0 left-1/4 h-8 w-1 animate-missile-fall bg-yellow-400" style={{ animationDelay: '0s' }}></div>
    <div className="absolute top-0 left-1/2 h-10 w-1 animate-missile-fall bg-yellow-400/80" style={{ animationDelay: '0.5s' }}></div>
    <div className="absolute top-0 left-3/4 h-6 w-1 animate-missile-fall bg-yellow-400" style={{ animationDelay: '1.2s' }}></div>
    <div className="absolute top-0 left-1/3 h-12 w-1 animate-missile-fall bg-yellow-400/90" style={{ animationDelay: '1.8s' }}></div>

    {/* Target reticle in the center */}
    <Target className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-destructive/70 animate-pulse" />
  </div>
);

const TheDescentGame = () => {
  const initialCode = `function findHighest(mountains) {
  // J.A.R.V.I.S. needs your help!
  return mountains[0];
}`;
  const [code, setCode] = useState(initialCode);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  // Validation logic for the user's code
  const validate = (userCode: string): boolean => {
    try {
      const userFunction = new Function(`return (function() { ${userCode}; return findHighest; })()`)();
      // Test cases
      const test1 = userFunction([3, 7, 2, 9, 5]) === 9;
      const test2 = userFunction([100, 20, 50, 200, 150]) === 200;
      const test3 = userFunction([1, 1, 1, 1]) === 1;
      return test1 && test2 && test3;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const handleRunCode = () => {
    try {
      if (validate(code)) {
        setFeedback({ type: 'success', message: "Target locked! Missile threat neutralized. Great job, pilot!" });
        setIsSolved(true);
      } else {
        setFeedback({ type: 'error', message: "That's not right. The missile is still a threat. Check your logic." });
      }
    } catch (e) {
       if (e instanceof Error) {
        setFeedback({ type: 'error', message: `J.A.R.V.I.S. reports a syntax error: ${e.message}` });
      } else {
        setFeedback({ type: 'error', message: 'An unknown error occurred. Try again.' });
      }
    }
  };

  const resetGame = () => {
    setCode(initialCode);
    setFeedback(null);
    setIsSolved(false);
  };

  return (
    <div className="container py-12 min-h-[calc(100vh-3.5rem)]">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/games">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Game Zone
        </Link>
      </Button>

      <div className="text-center mb-8">
        {/* The hero animation element */}
        <IronManHeaderAnimation />
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl font-headline text-glow-red">
          The Descent
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Help Iron Man defend against missiles by finding the highest threat in an array of mountains.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto animate-in fade-in-up bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Code className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl font-headline">Threat Analysis</CardTitle>
              <CardDescription>
                J.A.R.V.I.S. needs the highest mountain to predict the missile impact point.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="code-editor" className="text-sm font-medium text-muted-foreground">Your Targeting Logic (JavaScript)</label>
            <Textarea
              id="code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-code min-h-[180px] text-base bg-background/50"
              placeholder="// Your function here..."
              disabled={isSolved}
            />
          </div>
          {feedback && (
            <Alert variant={feedback.type === 'error' ? 'destructive' : 'default'} className={cn(feedback.type === 'success' && 'border-green-500/50 bg-green-500/10 text-foreground')}>
              {feedback.type === 'success' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <ShieldAlert className="h-4 w-4" />}
              <AlertTitle>{feedback.type === 'success' ? 'Threat Neutralized!' : 'Mission Update'}</AlertTitle>
              <AlertDescription>{feedback.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex-col sm:flex-row gap-4">
          <Button onClick={isSolved ? resetGame : handleRunCode} className="w-full sm:w-auto">
            {isSolved ? 'Reset Simulation' : 'Run Analysis'}
          </Button>
          <Badge variant="outline" className="border-yellow-500/50 text-yellow-300">
            More Levels Coming Soon
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TheDescentGame;
