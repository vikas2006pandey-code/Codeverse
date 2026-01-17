'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Zap, CheckCircle, ShieldAlert, ArrowRight, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

type ThorChallengeProps = {
  level: 'Low' | 'Medium' | 'High';
  title: string;
  story: string;
  clue: string;
  initialCode: string;
  validate: (code: string) => boolean;
  successTitle: string;
  successMessage: string;
  onSuccess: () => void;
  nextLevelUrl?: string;
};

export const ThorChallenge = ({
  level,
  title,
  story,
  clue,
  initialCode,
  validate,
  successTitle,
  successMessage,
  onSuccess,
  nextLevelUrl,
}: ThorChallengeProps) => {
  const [code, setCode] = useState(initialCode);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const router = useRouter();

  const handleRunCode = () => {
    try {
      if (validate(code)) {
        setFeedback({ type: 'success', message: successMessage });
        setIsSolved(true);
        onSuccess(); // Call the success handler to save progress
      } else {
        setFeedback({ type: 'error', message: "That's not quite right. The power remains dormant. Try again!" });
      }
    } catch (e) {
      if (e instanceof Error) {
        setFeedback({ type: 'error', message: `Your code has a syntax error: ${e.message}` });
      } else {
        setFeedback({ type: 'error', message: 'An unknown error occurred while running your code.' });
      }
    }
  };

  return (
    <Card className="max-w-4xl mx-auto animate-in fade-in-up">
      <CardHeader>
        <div className="text-center">
          <Zap className="mx-auto h-12 w-12 text-yellow-400 animate-lightning-pulse" />
          <CardTitle className="mt-4 text-3xl font-headline">{title}</CardTitle>
          <CardDescription className="mt-2 text-lg text-muted-foreground">{story}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Odin's Clue</AlertTitle>
          <AlertDescription>{clue}</AlertDescription>
        </Alert>

        <div className="space-y-2">
          <label htmlFor="code-editor" className="text-sm font-medium">Your Code</label>
          <Textarea
            id="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-code min-h-[200px] text-base bg-muted/50"
            placeholder="// Your code here..."
            disabled={isSolved}
          />
        </div>
        
        {feedback && (
          <Alert variant={feedback.type === 'error' ? 'destructive' : 'default'} className={cn(feedback.type === 'success' && 'border-green-500/50 bg-green-500/10 text-foreground')}>
            {feedback.type === 'success' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <ShieldAlert className="h-4 w-4" />}
            <AlertTitle>{feedback.type === 'success' ? successTitle : 'Trial Failed'}</AlertTitle>
            <AlertDescription>{feedback.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        {!isSolved ? (
          <Button onClick={handleRunCode} className="w-full">
            Unleash Power
          </Button>
        ) : (
          <Button onClick={() => nextLevelUrl ? router.push(nextLevelUrl) : router.back()} className="w-full">
            Continue
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
