'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Code, Eye, Terminal, Trophy, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

const puzzles = [
  {
    title: 'Create a "greet" Function',
    description: 'Write a function named `greet` that returns the string "Hello, factory!".',
    hint: 'The function should take no arguments.',
    answer: 'functiongreet(){return"Hello,factory!";}',
    resultLog: 'greet() -> "Hello, factory!"',
  },
  {
    title: 'Function with a Parameter',
    description: 'Write a function `addFive` that takes one number (`num`) as a parameter and returns that number plus 5.',
    hint: 'function addFive(num) { ... }',
    answer: 'functionaddFive(num){returnnum+5;}',
    resultLog: 'addFive(10) -> 15',
  },
  {
    title: 'Combining Two Parameters',
    description: 'Write a function `combine` that takes two strings, `str1` and `str2`, and returns them joined with a space in between.',
    hint: 'You can concatenate strings with the `+` operator.',
    answer: 'functioncombine(str1,str2){returnstr1+" "+str2;}',
    resultLog: 'combine("Hello", "World") -> "Hello World"',
  },
  {
    title: 'An Arrow Function',
    description: 'Let\'s use modern syntax. Write an arrow function assigned to a constant `multiply` that takes two numbers, `a` and `b`, and returns their product.',
    hint: 'const multiply = (a, b) => a * b;',
    answer: 'constmultiply=(a,b)=>a*b',
    resultLog: 'multiply(5, 4) -> 20',
  }
];

const FunctionFactoryHeaderAnimation = () => (
    <div className="relative h-24 w-full max-w-md mx-auto mb-4 flex items-center justify-center overflow-hidden">
        <div className="absolute w-full h-2 bg-muted/50" />
        <div className="absolute flex gap-8 animate-[conveyor-belt_5s_linear_infinite]">
            <span className="text-2xl font-code text-muted-foreground">{'{}'}</span>
            <span className="text-2xl font-code text-muted-foreground">{'()'}</span>
            <span className="text-2xl font-code text-muted-foreground">{'[]'}</span>
            <span className="text-2xl font-code text-muted-foreground">{'//'}</span>
        </div>
        <Code className="h-16 w-16 text-primary relative z-10" />
    </div>
);

export default function FunctionFactoryPage() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  const handleSubmit = () => {
    const expectedAnswer = puzzles[currentPuzzle].answer;
    const userAnswer = inputValue.replace(/\s/g, '').replace(/;$/, '');

    if (userAnswer === expectedAnswer) {
      setError(null);
      setInputValue('');
      setConsoleLogs([...consoleLogs, puzzles[currentPuzzle].resultLog]);
      
      if (currentPuzzle < puzzles.length - 1) {
        setCurrentPuzzle(currentPuzzle + 1);
      } else {
        setCompleted(true);
      }
    } else {
      setError(`That function doesn't look right. Remember the syntax! Hint: ${puzzles[currentPuzzle].hint}`);
    }
  };

  if (completed) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Card className="max-w-2xl text-center animate-in fade-in zoom-in-95">
          <CardHeader>
            <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
            <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
              Factory Foreman!
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              You've mastered the art of function creation. Your code is clean, efficient, and ready for production!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">You've completed the Function Factory challenge. Great job!</p>
            <Button asChild size="lg">
              <Link href="/learning/js/games">Back to JS Games</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const puzzle = puzzles[currentPuzzle];
  const progressPercentage = (currentPuzzle / puzzles.length) * 100;

  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/learning/js/games">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to JS Games
        </Link>
      </Button>
      <div className="text-center mb-8">
        <FunctionFactoryHeaderAnimation />
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          Function Factory
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Build JavaScript functions to meet the production requirements.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side: Puzzle */}
        <div className="flex flex-col gap-8">
            <Progress value={progressPercentage} className="h-2" />
            <Card className="shadow-lg flex-grow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Code className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle className="text-2xl font-headline">{puzzle.title}</CardTitle>
                    <CardDescription className="pt-1">{puzzle.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder={`// Write your full function here...`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="font-code min-h-[150px]"
                  />
                  <Button onClick={handleSubmit} className="w-full">Test Function</Button>
                </div>
              </CardContent>
              {error && (
                <CardFooter>
                  <Alert variant="destructive" className="w-full">
                    <AlertTitle>Test Failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </CardFooter>
              )}
            </Card>
        </div>

        {/* Right side: Preview */}
        <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Eye className="w-8 h-8 text-accent" />
                    <CardTitle className="text-2xl font-headline">Example Output</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md p-4 bg-muted/20 min-h-[200px] font-code text-sm">
                    {consoleLogs.length === 0 && currentPuzzle === 0 ? (
                        <p className="text-muted-foreground italic">Your function's example output will appear here...</p>
                    ) : 
                    consoleLogs.map((log, i) => <p key={i} className="text-green-400">&gt; {log}</p>)
                    }
                     {consoleLogs.length > 0 && consoleLogs.length < puzzles.length && (
                         <p className="text-muted-foreground italic mt-4">Next requirement is ready...</p>
                     )}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
