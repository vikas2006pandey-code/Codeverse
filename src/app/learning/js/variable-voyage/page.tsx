'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Rocket, Eye, Terminal, Trophy, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

const puzzles = [
  {
    title: 'Declare a Variable',
    description: 'Let\'s start our voyage. Declare a variable named `shipName` using `let`.',
    hint: 'Use the `let` keyword followed by the variable name.',
    answer: 'let shipName;',
    resultLog: 'Variable "shipName" declared.',
  },
  {
    title: 'Assign a Value',
    description: 'Our ship needs a name. Assign the string "Stardust" to your `shipName` variable.',
    hint: 'Use the assignment operator `=`. Don\'t forget quotes for the string!',
    answer: 'shipName = "Stardust";',
    resultLog: 'shipName is now "Stardust".',
  },
  {
    title: 'Declare and Assign',
    description: 'Efficient! Now, declare a new variable `speed` and assign it the number `5` in one line.',
    hint: 'Combine declaration and assignment. `let variable = value;`',
    answer: 'let speed = 5;',
    resultLog: 'Variable "speed" declared and set to 5.',
  },
  {
    title: 'Using `const`',
    description: 'Some things never change, like our destination. Declare a constant variable `destination` and set it to "Andromeda".',
    hint: 'Use `const` for values that won\'t be reassigned.',
    answer: 'const destination = "Andromeda";',
    resultLog: 'Constant "destination" set to "Andromeda".',
  },
];

const VariableVoyageHeaderAnimation = () => (
    <div className="relative h-24 w-full max-w-md mx-auto mb-4 flex items-center justify-center overflow-hidden">
        <Rocket className="h-16 w-16 text-primary animate-[rocket-voyage_3s_ease-in-out_infinite]" />
        <span className="absolute top-4 left-1/4 font-code text-muted-foreground">let</span>
        <span className="absolute bottom-4 right-1/4 font-code text-muted-foreground">const</span>
    </div>
);

export default function VariableVoyagePage() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  const handleSubmit = () => {
    const expectedAnswer = puzzles[currentPuzzle].answer.replace(/\s/g, '');
    const userAnswer = inputValue.replace(/\s/g, '');

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
      setError(`Not quite. Your code doesn't seem right. Hint: ${puzzles[currentPuzzle].hint}`);
    }
  };

  if (completed) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Card className="max-w-2xl text-center animate-in fade-in zoom-in-95">
          <CardHeader>
            <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
            <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
              Voyage Complete!
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              You've successfully navigated the basics of JavaScript variables. Your coding journey is off to a flying start!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">You've completed the Variable Voyage challenge. Great job!</p>
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
        <VariableVoyageHeaderAnimation />
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          Variable Voyage
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Use JavaScript variables to command your starship.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side: Puzzle */}
        <div className="flex flex-col gap-8">
            <Progress value={progressPercentage} className="h-2" />
            <Card className="shadow-lg flex-grow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Rocket className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle className="text-2xl font-headline">{puzzle.title}</CardTitle>
                    <CardDescription className="pt-1">{puzzle.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex w-full items-center space-x-2">
                  <Terminal className="w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter the JavaScript code..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    className="font-code"
                  />
                  <Button onClick={handleSubmit}>Run</Button>
                </div>
              </CardContent>
              {error && (
                <CardFooter>
                  <Alert variant="destructive" className="w-full">
                    <AlertTitle>Syntax Error</AlertTitle>
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
                    <CardTitle className="text-2xl font-headline">Ship's Log</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md p-4 bg-muted/20 min-h-[200px] font-code text-sm">
                    {consoleLogs.length === 0 ? (
                        <p className="text-muted-foreground italic">Your command outputs will appear here...</p>
                    ) : (
                        consoleLogs.map((log, i) => <p key={i}>&gt; {log}</p>)
                    )}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
