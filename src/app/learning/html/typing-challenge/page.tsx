'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Keyboard, Timer, Trophy, ChevronLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const snippets = [
  {
    level: 1,
    title: 'Simple Heading',
    code: '<h1>Welcome to Code Rush!</h1>',
    timeLimit: 25,
  },
  {
    level: 2,
    title: 'Paragraph with a Link',
    code: '<p>Click <a href="#">here</a> to start.</p>',
    timeLimit: 30,
  },
  {
    level: 3,
    title: 'Unordered List',
    code: '<ul>\n  <li>First item</li>\n  <li>Second item</li>\n</ul>',
    timeLimit: 45,
  },
  {
    level: 4,
    title: 'Image with Attributes',
    code: '<img src="/logo.png" alt="logo" width="100" height="50">',
    timeLimit: 40,
  },
  {
    level: 5,
    title: 'Simple Form',
    code: '<form>\n  <label for="username">Username:</label>\n  <input type="text" id="username">\n  <button type="submit">Submit</button>\n</form>',
    timeLimit: 60,
  },
];

export default function HTMLTypingChallengePage() {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [gameStatus, setGameStatus] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [timeLeft, setTimeLeft] = useState(snippets[0].timeLimit);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [finalStats, setFinalStats] = useState({ wpm: 0, accuracy: 0, score: 0 });

  const currentSnippet = snippets[currentSnippetIndex];

  const resetGame = useCallback(() => {
    setCurrentSnippetIndex(0);
    setUserInput('');
    setGameStatus('ready');
    setTimeLeft(snippets[0].timeLimit);
    setStartTime(null);
    setFinalStats({ wpm: 0, accuracy: 0, score: 0 });
  }, []);

  const finishRound = useCallback(() => {
    if (gameStatus !== 'playing' || !startTime) return;

    const endTime = Date.now();
    const timeElapsedSeconds = (endTime - startTime) / 1000;
    const timeElapsedMinutes = timeElapsedSeconds > 0 ? timeElapsedSeconds / 60 : 1 / 60;

    const typedChars = userInput.length;
    const wpm = Math.round((typedChars / 5) / timeElapsedMinutes);

    let correctChars = 0;
    const cleanTargetCode = currentSnippet.code.replace(/\s/g, '');
    const cleanUserInput = userInput.replace(/\s/g, '');

    for (let i = 0; i < cleanTargetCode.length; i++) {
        if (i < cleanUserInput.length && cleanUserInput[i] === cleanTargetCode[i]) {
            correctChars++;
        }
    }
    const accuracy = cleanTargetCode.length > 0 ? Math.round((correctChars / cleanTargetCode.length) * 100) : 0;
    
    const score = (accuracy * 0.7) + (wpm * 0.3);

    setFinalStats(prev => ({
        wpm: prev.wpm + wpm,
        accuracy: prev.accuracy + accuracy,
        score: prev.score + score,
    }));

    if (currentSnippetIndex < snippets.length - 1) {
        const nextIndex = currentSnippetIndex + 1;
        setCurrentSnippetIndex(nextIndex);
        setUserInput('');
        setStartTime(Date.now());
        setTimeLeft(snippets[nextIndex].timeLimit);
    } else {
        setGameStatus('finished');
    }
  }, [gameStatus, startTime, userInput, currentSnippet.code, currentSnippetIndex]);

  useEffect(() => {
    if (gameStatus !== 'playing') return;

    if (timeLeft <= 0) {
      finishRound();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameStatus, finishRound]);

  const handleStartGame = () => {
    resetGame();
    setGameStatus('playing');
    setStartTime(Date.now());
  };
  
  if (gameStatus === 'ready') {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Card className="max-w-2xl text-center">
          <CardHeader>
            <Keyboard className="mx-auto h-16 w-16 text-primary" />
            <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
              HTML Code Rush
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              Test your speed and accuracy by typing real HTML snippets against the clock. Type the code exactly as you see it. Ready to test your might?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleStartGame} size="lg">Start Challenge</Button>
             <Button asChild variant="ghost" className="mt-4">
                <Link href="/learning/html/games">
                  Back to HTML Games
                </Link>
              </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameStatus === 'finished') {
    const averageWpm = Math.round(finalStats.wpm / snippets.length);
    const averageAccuracy = Math.round(finalStats.accuracy / snippets.length);

    return (
      <div className="container py-12 flex items-center justify-center">
        <Card className="max-w-2xl text-center animate-in fade-in zoom-in-95">
          <CardHeader>
            <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
            <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
              Challenge Complete!
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              You've successfully completed the HTML Code Rush. Great job!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex justify-around text-center">
                <div>
                    <p className="text-2xl font-bold">{averageWpm}</p>
                    <p className="text-sm text-muted-foreground">Avg. WPM</p>
                </div>
                <div>
                    <p className="text-2xl font-bold">{averageAccuracy}%</p>
                    <p className="text-sm text-muted-foreground">Avg. Accuracy</p>
                </div>
            </div>
            <p className="text-2xl font-bold">Final Score: {Math.round(finalStats.score)}</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleStartGame} size="lg">
                <RefreshCw className="mr-2 h-4 w-4" />
                Play Again
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/learning/html/games">Back to HTML Games</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/learning/html/games">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to HTML Games
        </Link>
      </Button>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          HTML Code Rush
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Round {currentSnippetIndex + 1} of {snippets.length}: {currentSnippet.title}
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Code to Type:</CardTitle>
            </CardHeader>
            <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code className="font-code text-sm text-foreground whitespace-pre-wrap">{currentSnippet.code}</code>
                </pre>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Your Code:</CardTitle>
                <div className="flex items-center gap-2 text-lg font-semibold text-destructive">
                    <Timer className="h-5 w-5" />
                    <span>{timeLeft}s</span>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Start typing here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="font-code min-h-[150px] text-base"
              autoFocus
            />
          </CardContent>
          <CardFooter>
            <Button onClick={finishRound} className="w-full">
                {currentSnippetIndex < snippets.length - 1 ? 'Finish & Next' : 'Finish Challenge'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
