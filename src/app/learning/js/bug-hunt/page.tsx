'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bug, Terminal, Timer, Trophy, ChevronLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const puzzles = [
  {
    level: 1,
    title: 'Missing Parenthesis',
    description: 'This `console.log` is missing a closing parenthesis. Find the mistake and fix it.',
    brokenCode: 'console.log("Hello, World!";',
    correctCode: 'console.log("Hello, World!");',
    correctOutput: '> Hello, World!',
    bugs: 1,
    timeLimit: 30,
  },
  {
    level: 2,
    title: 'Undeclared Variable',
    description: 'The variable `message` was never declared. Use `let` to declare it.',
    brokenCode: 'message = "This is a test";\nconsole.log(message);',
    correctCode: 'let message = "This is a test";\nconsole.log(message);',
    correctOutput: '> This is a test',
    bugs: 1,
    timeLimit: 35,
  },
  {
    level: 3,
    title: 'Incorrect Operator',
    description: 'This function should multiply two numbers, but it\'s adding them instead.',
    brokenCode: 'function multiply(a, b) {\n  return a + b;\n}\nconsole.log(multiply(5, 3));',
    correctCode: 'function multiply(a, b) {\n  return a * b;\n}\nconsole.log(multiply(5, 3));',
    correctOutput: '> 15',
    bugs: 1,
    timeLimit: 40,
  },
  {
    level: 4,
    title: 'Infinite Loop',
    description: 'This `while` loop will run forever! The incrementor is missing. Fix the loop to count from 0 to 4.',
    brokenCode: 'let i = 0;\nwhile (i < 5) {\n  console.log(i);\n}',
    correctCode: 'let i = 0;\nwhile (i < 5) {\n  console.log(i);\n  i++;\n}',
    correctOutput: '> 0\n> 1\n> 2\n> 3\n> 4',
    bugs: 1,
    timeLimit: 45,
  },
  {
    level: 5,
    title: 'Reassigning a Constant',
    description: 'Constants cannot be reassigned. Change `const` to `let` to fix this error.',
    brokenCode: 'const score = 100;\nscore = 150;\nconsole.log(score);',
    correctCode: 'let score = 100;\nscore = 150;\nconsole.log(score);',
    correctOutput: '> 150',
    bugs: 1,
    timeLimit: 50,
  },
];

const BugHuntHeaderAnimation = () => (
    <div className="relative h-24 w-full max-w-md mx-auto mb-4 flex items-center justify-center overflow-hidden">
        <Bug className="h-16 w-16 text-destructive animate-pulse" />
        <div className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-transparent to-primary/30 animate-[bug-scan_4s_ease-in-out_infinite]" />
    </div>
);

// Helper to normalize code for comparison
const normalizeCode = (code: string) => code.replace(/\s+/g, ' ').trim();

export default function JSBugHuntPage() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [gameStatus, setGameStatus] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [timeLeft, setTimeLeft] = useState(puzzles[0].timeLimit);
  const [totalBugsFixed, setTotalBugsFixed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentPuzzle = puzzles[currentPuzzleIndex];

  const startGame = useCallback(() => {
    setGameStatus('playing');
    setCurrentPuzzleIndex(0);
    setUserInput(puzzles[0].brokenCode);
    setTimeLeft(puzzles[0].timeLimit);
    setTotalBugsFixed(0);
    setError(null);
    setIsCorrect(false);
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
      setIsCorrect(true);

      setTimeout(() => {
        if (currentPuzzleIndex < puzzles.length - 1) {
          const nextIndex = currentPuzzleIndex + 1;
          setCurrentPuzzleIndex(nextIndex);
          setUserInput(puzzles[nextIndex].brokenCode);
          setTimeLeft(puzzles[nextIndex].timeLimit);
          setIsCorrect(false);
        } else {
          setGameStatus('finished');
        }
      }, 2000)
    } else {
      setError("Not quite! There's still a bug lurking in the code. Keep searching!");
      setIsCorrect(false);
    }
  };
  
  if (gameStatus === 'ready') {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Card className="max-w-2xl text-center">
          <CardHeader>
            <BugHuntHeaderAnimation />
            <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
              JavaScript Bug Hunt
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              Find and fix the errors in broken JavaScript code snippets before the timer runs out. Ready to debug?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={startGame} size="lg">Start Hunting</Button>
             <Button asChild variant="ghost" className="mt-4">
                <Link href="/learning/js/games">
                  Back to JS Games
                </Link>
              </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameStatus === 'finished') {
    const totalBugs = puzzles.reduce((acc, p) => acc + p.bugs, 0);
    const success = totalBugsFixed >= totalBugs;
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
            <p className="text-2xl font-bold">Bugs Fixed: {totalBugsFixed} / {puzzles.length}</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={startGame} size="lg">
                <RefreshCw className="mr-2 h-4 w-4" />
                Play Again
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/learning/js/games">Back to JS Games</Link>
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
        <Link href="/learning/js/games">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to JS Games
        </Link>
      </Button>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          JavaScript Bug Hunt
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

        {/* Right side: Console Output */}
        <div className="sticky top-20">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Terminal className="w-5 h-5" />Console Output</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md p-4 bg-muted/20 min-h-[250px] font-code text-sm whitespace-pre-wrap">
                      {isCorrect ? (
                        <p className="text-green-400">{currentPuzzle.correctOutput}</p>
                      ) : (
                        <p className="text-destructive">&gt; SyntaxError: Unexpected token...</p>
                      )}
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button onClick={handleSubmit} className="w-full">
                        Run Code
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
