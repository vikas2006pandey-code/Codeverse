'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bug, Eye, Timer, Trophy, ChevronLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const puzzles = [
  {
    level: 1,
    title: 'Misspelled Property',
    description: 'The background color should be a light blue, but the property is misspelled. Find and fix it.',
    brokenCode: '.box {\n  background-colr: #a0d6ef;\n  color: white;\n  padding: 20px;\n}',
    correctCode: '.box {\n  background-color: #a0d6ef;\n  color: white;\n  padding: 20px;\n}',
    bugs: 1,
    timeLimit: 30,
  },
  {
    level: 2,
    title: 'Missing Semicolon',
    description: 'The text color and padding are not applying because a semicolon is missing. Add it in the correct place.',
    brokenCode: '.box {\n  background-color: #a0d6ef;\n  color: white\n  padding: 20px;\n}',
    correctCode: '.box {\n  background-color: #a0d6ef;\n  color: white;\n  padding: 20px;\n}',
    bugs: 1,
    timeLimit: 30,
  },
  {
    level: 3,
    title: 'Invalid Hex Code',
    description: 'This button should be a nice green, but the hex code for the color is invalid.',
    brokenCode: 'button {\n  background-color: #2ECC4G;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n}',
    correctCode: 'button {\n  background-color: #2ECC40;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n}',
    bugs: 1,
    timeLimit: 40,
  },
  {
    level: 4,
    title: 'Unitless Value',
    description: 'The font size for the heading is missing a unit. Add `px` to make it work.',
    brokenCode: 'h1 {\n  font-size: 32;\n  color: hsl(var(--primary));\n}',
    correctCode: 'h1 {\n  font-size: 32px;\n  color: hsl(var(--primary));\n}',
    bugs: 1,
    timeLimit: 35,
  },
  {
    level: 5,
    title: 'A Messy Ruleset',
    description: 'This card has multiple bugs! A missing closing brace, a wrong property, and a syntax error. Fix them all!',
    brokenCode: '.card {\n  pading: 20px;\n  border-radius: 8px;\n  box-shadow: 0 4px 8px rgba(0,0,0,0.1);\n',
    correctCode: '.card {\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 4px 8px rgba(0,0,0,0.1);\n}',
    bugs: 3,
    timeLimit: 60,
  },
];

const BugHuntHeaderAnimation = () => (
    <div className="relative h-24 w-full max-w-md mx-auto mb-4 flex items-center justify-center overflow-hidden">
        <Bug className="h-16 w-16 text-destructive animate-pulse" />
        <div className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-transparent to-primary/30 animate-[bug-scan_4s_ease-in-out_infinite]" />
    </div>
);

// Helper to normalize code for comparison
const normalizeCode = (code: string) => code.replace(/\s+/g, '').trim();

export default function CSSBugHuntPage() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [gameStatus, setGameStatus] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [timeLeft, setTimeLeft] = useState(puzzles[0].timeLimit);
  const [totalBugsFixed, setTotalBugsFixed] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const currentPuzzle = puzzles[currentPuzzleIndex];

  const startGame = useCallback(() => {
    setGameStatus('playing');
    setCurrentPuzzleIndex(0);
    setUserInput(puzzles[0].brokenCode);
    setTimeLeft(puzzles[0].timeLimit);
    setTotalBugsFixed(0);
    setError(null);
  }, []);

  useEffect(() => {
    if (gameStatus === 'playing') {
      if (timeLeft <= 0) {
        setError("Time's up! The bugs got away. Try again.");
        setTimeout(() => {
          setGameStatus('finished');
        }, 2000);
        return;
      }
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStatus, timeLeft]);

  const handleSubmit = () => {
    if (normalizeCode(userInput) === normalizeCode(currentPuzzle.correctCode)) {
      setTotalBugsFixed(prev => prev + currentPuzzle.bugs);
      setError(null);
      
      if (currentPuzzleIndex < puzzles.length - 1) {
        const nextIndex = currentPuzzleIndex + 1;
        setCurrentPuzzleIndex(nextIndex);
        setUserInput(puzzles[nextIndex].brokenCode);
        setTimeLeft(puzzles[nextIndex].timeLimit);
      } else {
        setGameStatus('finished');
      }
    } else {
      setError("Not quite! There's still a styling bug lurking in the code. Keep searching!");
    }
  };
  
  if (gameStatus === 'ready') {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Card className="max-w-2xl text-center">
          <CardHeader>
            <BugHuntHeaderAnimation />
            <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
              CSS Bug Hunt
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              Find and fix the errors in broken CSS code snippets before the timer runs out. Ready to debug?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={startGame} size="lg">Start Hunting</Button>
             <Button asChild variant="ghost" className="mt-4">
                <Link href="/learning/css/games">
                  Back to CSS Games
                </Link>
              </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameStatus === 'finished') {
    const totalBugs = puzzles.reduce((acc, p) => acc + p.bugs, 0);
    const success = totalBugsFixed === totalBugs;
    return (
      <div className="container py-12 flex items-center justify-center">
        <Card className="max-w-2xl text-center animate-in fade-in zoom-in-95">
          <CardHeader>
            {success ? (
              <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
            ) : (
               <Bug className="mx-auto h-16 w-16 text-destructive" />
            )}
            <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
              {success ? 'All Bugs Squashed!' : 'Hunt Over'}
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              {success ? "You're a master bug hunter! Excellent work." : "Some bugs got away, but you fought well."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-2xl font-bold">Bugs Fixed: {totalBugsFixed} / {totalBugs}</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={startGame} size="lg">
                <RefreshCw className="mr-2 h-4 w-4" />
                Play Again
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/learning/css/games">Back to CSS Games</Link>
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
        <Link href="/learning/css/games">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to CSS Games
        </Link>
      </Button>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          CSS Bug Hunt
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Level {currentPuzzleIndex + 1}: {currentPuzzle.title}
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left side: Code Editor */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle className="flex items-center gap-2"><Bug className="w-5 h-5"/>Find the Bug(s)</CardTitle>
                    <CardDescription className="pt-1">{currentPuzzle.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-lg font-semibold text-destructive">
                    <Timer className="h-5 w-5" />
                    <span>{timeLeft}s</span>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="font-code min-h-[250px] text-base"
              autoFocus
            />
          </CardContent>
           {error && (
                <CardFooter>
                  <Alert variant="destructive" className="w-full">
                    <AlertTitle>Not Quite...</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </CardFooter>
            )}
        </Card>

        {/* Right side: Live Preview */}
        <div className="sticky top-20">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Eye className="w-5 h-5" />Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                    <style>{userInput}</style>
                    <div className="border rounded-md p-4 bg-background/50 min-h-[250px] space-y-4">
                        <div className="box">
                            <h1>A Title</h1>
                        </div>
                         <div className="card">
                            <p>This is a card.</p>
                        </div>
                        <button>A Button</button>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button onClick={handleSubmit} className="w-full">
                        Check Code
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
