'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Eye, Terminal, Trophy, ChevronLeft, Paintbrush } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

const puzzles = [
  {
    title: 'Color the Box',
    description: "This box is colorless. Give it a background color of `hsl(var(--primary))`.",
    hint: 'Use the `background-color` property.',
    answer: 'background-color: hsl(var(--primary));',
    styleProperty: 'backgroundColor',
    styleValue: 'hsl(var(--primary))',
  },
  {
    title: 'Change the Text Color',
    description: 'The text is hard to read. Make it white.',
    hint: 'The property is `color`. The value for white is `white`.',
    answer: 'color: white;',
    styleProperty: 'color',
    styleValue: 'white',
  },
  {
    title: 'Add Some Padding',
    description: 'The content is too close to the edge. Add `20px` of padding.',
    hint: 'Use the `padding` property.',
    answer: 'padding: 20px;',
    styleProperty: 'padding',
    styleValue: '20px',
  },
  {
    title: 'Round the Corners',
    description: "Let's soften the edges. Give the box a `border-radius` of `8px`.",
    hint: 'The property is `border-radius`.',
    answer: 'border-radius: 8px;',
    styleProperty: 'borderRadius',
    styleValue: '8px',
  },
];

export default function CSSEscapeRoomPage() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [appliedStyles, setAppliedStyles] = useState<string[]>([]);
  const [styles, setStyles] = useState<React.CSSProperties>({});


  const handleSubmit = () => {
    const puzzle = puzzles[currentPuzzle];
    const userAnswer = inputValue.trim().toLowerCase().replace(/\s/g, '');
    const expectedAnswer = puzzle.answer.toLowerCase().replace(/\s/g, '');

    if (userAnswer === expectedAnswer) {
      setError(null);
      setInputValue('');
      setStyles(prev => ({
        ...prev,
        [puzzle.styleProperty]: puzzle.styleValue,
      }));
      setAppliedStyles(prev => [...prev, `${puzzle.answer}`]);
      
      if (currentPuzzle < puzzles.length - 1) {
        setCurrentPuzzle(currentPuzzle + 1);
      } else {
        setCompleted(true);
      }
    } else {
      setError(`Not quite. The style seems incorrect. Hint: ${puzzle.hint}`);
    }
  };

  if (completed) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Card className="max-w-2xl text-center animate-in fade-in zoom-in-95">
          <CardHeader>
            <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
            <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
              Room Escaped!
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              You've successfully used CSS to style your way to freedom. Your design skills are sharp!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">You've completed the CSS Escape Room. Great job!</p>
            <Button asChild size="lg">
              <Link href="/learning/css/games">Back to CSS Games</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const puzzle = puzzles[currentPuzzle];
  const progressPercentage = ((currentPuzzle + 1) / puzzles.length) * 100;

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
          CSS Escape Room
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Apply the correct styles to build your escape.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side: Puzzle */}
        <div className="flex flex-col gap-8">
            <Progress value={progressPercentage} className="h-2" />
            <Card className="shadow-lg flex-grow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Paintbrush className="w-8 h-8 text-primary" />
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
                    placeholder="property: value;"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    className="font-code"
                  />
                  <Button onClick={handleSubmit}>Apply</Button>
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
                    <CardTitle className="text-2xl font-headline">Live Preview</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md p-4 bg-background/50 min-h-[200px] flex items-center justify-center">
                    <div style={styles} className="w-48 h-48 flex items-center justify-center text-center p-4 transition-all duration-500">
                      This is the box you are styling.
                    </div>
                </div>
                 <pre className="bg-muted p-4 rounded-md overflow-x-auto mt-4 font-code text-sm">
                    .box &#123;<br />
                    {appliedStyles.map(s => <span key={s}>&nbsp;&nbsp;{s}<br /></span>)}
                    &#125;
                </pre>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
