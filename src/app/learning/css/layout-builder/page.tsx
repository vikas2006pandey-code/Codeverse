'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Palette, Eye, Terminal, Trophy, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

const puzzles = [
  {
    title: 'Flexing the Container',
    description: "Let's arrange these boxes in a row. What `display` property turns a container into a flex container?",
    hint: "It's the most 'flexible' display property.",
    answer: 'display: flex;',
    styleProperty: 'display',
    styleValue: 'flex',
  },
  {
    title: 'Horizontal Centering',
    description: 'Good. Now, center the boxes in the middle of the container. Which property controls horizontal alignment?',
    hint: 'It `justify`s the `content`.',
    answer: 'justify-content: center;',
    styleProperty: 'justifyContent',
    styleValue: 'center',
  },
  {
    title: 'Vertical Centering',
    description: 'Perfect. How about vertical alignment? Which property centers items along the cross-axis?',
    hint: 'It `align`s the `items`.',
    answer: 'align-items: center;',
    styleProperty: 'alignItems',
    styleValue: 'center',
  },
  {
    title: 'Adding Some Space',
    description: "They're a bit cramped. Let's add space between them. What property creates a `gap`?",
    hint: 'This one is easy, it is `gap`. Try `1rem` as the value.',
    answer: 'gap: 1rem;',
    styleProperty: 'gap',
    styleValue: '1rem',
  },
  {
    title: 'Changing the Flow',
    description: 'Great! Finally, let\'s stack them vertically while keeping them centered. Which property changes the direction?',
    hint: 'You want to change the `flex-direction`.',
    answer: 'flex-direction: column;',
    styleProperty: 'flexDirection',
    styleValue: 'column',
  },
];

export default function CSSLayoutBuilderPage() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [styles, setStyles] = useState<React.CSSProperties>({});

  const handleSubmit = () => {
    const expectedAnswer = puzzles[currentPuzzle].answer.toLowerCase().replace(/\s/g, '');
    const userAnswer = inputValue.toLowerCase().replace(/\s/g, '');

    if (userAnswer === expectedAnswer) {
      setError(null);
      setInputValue('');
      setStyles({
        ...styles,
        [puzzles[currentPuzzle].styleProperty]: puzzles[currentPuzzle].styleValue,
      });
      
      if (currentPuzzle < puzzles.length - 1) {
        setCurrentPuzzle(currentPuzzle + 1);
      } else {
        setCompleted(true);
      }
    } else {
      setError(`Not quite. That CSS rule doesn't seem right. Hint: ${puzzles[currentPuzzle].hint}`);
    }
  };

  if (completed) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Card className="max-w-2xl text-center animate-in fade-in zoom-in-95">
          <CardHeader>
            <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
            <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
              Layout Master!
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              You've successfully used Flexbox to build and manipulate a layout. You're on your way to becoming a CSS pro!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">You've completed the CSS Layout Builder challenge. Great job!</p>
            <Button asChild size="lg">
              <Link href="/learning/css/games">Back to CSS Games</Link>
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
        <Link href="/learning/css/games">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to CSS Games
        </Link>
      </Button>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          CSS Layout Builder
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Use your Flexbox knowledge to construct a layout piece by piece.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side: Puzzle */}
        <div className="flex flex-col gap-8">
            <Progress value={progressPercentage} className="h-2" />
            <Card className="shadow-lg flex-grow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Palette className="w-8 h-8 text-primary" />
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
                    placeholder="Enter the CSS rule..."
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
                <div className="border rounded-md p-4 bg-background/50 min-h-[300px] flex items-center justify-center">
                    <div
                        style={styles}
                        className="w-full h-56 bg-muted/50 rounded-md p-4 transition-all duration-500"
                    >
                        <div className="w-16 h-16 bg-red-500 rounded-md shadow-lg"></div>
                        <div className="w-16 h-16 bg-blue-500 rounded-md shadow-lg"></div>
                        <div className="w-16 h-16 bg-green-500 rounded-md shadow-lg"></div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
