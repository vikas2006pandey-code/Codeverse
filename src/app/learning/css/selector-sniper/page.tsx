
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Crosshair, Terminal, Trophy, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

type MazeBlock = {
  id: string;
  type: 'start' | 'end' | 'path' | 'wall';
  attributes?: Record<string, string>;
};

const MAZE_LAYOUT: MazeBlock[] = [
  // Row 1
  { id: 'R1C1', type: 'wall' }, { id: 'R1C2', type: 'wall' }, { id: 'R1C3', type: 'start', attributes: { 'id': 'start-point' } }, { id: 'R1C4', type: 'wall' }, { id: 'R1C5', type: 'wall' },
  // Row 2
  { id: 'R2C1', type: 'wall' }, { id: 'R2C2', type: 'path' }, { id: 'R2C3', type: 'path' }, { id: 'R2C4', type: 'path' }, { id: 'R2C5', type: 'wall' },
  // Row 3
  { id: 'R3C1', type: 'path' }, { id: 'R3C2', type: 'path' }, { id: 'R3C3', type: 'wall' }, { id: 'R3C4', type: 'wall' }, { id: 'R3C5', type: 'wall' },
  // Row 4
  { id: 'R4C1', type: 'path' }, { id: 'R4C2', type: 'wall' }, { id: 'R4C3', type: 'path' }, { id: 'R4C4', type: 'path', attributes: { 'data-treasure': 'true' } }, { id: 'R4C5', type: 'wall' },
  // Row 5
  { id: 'R5C1', type: 'path' }, { id: 'R5C2', type: 'path' }, { id: 'R5C3', type: 'path' }, { id: 'R5C4', type: 'wall' }, { id: 'R5C5', type: 'end', attributes: { 'id': 'end-point' } },
];


const puzzles = [
  {
    title: 'Target the Starting Point',
    description: "Every mission needs a starting point. Use an ID selector to target the 'start' block.",
    hint: 'IDs are unique. Use the # symbol.',
    correctSelector: '#start-point',
  },
  {
    title: 'Select All Walls',
    description: 'To know the path, you must first know the obstacles. Use a class selector to target all the wall blocks.',
    hint: 'Classes are shared. Use the . symbol.',
    correctSelector: '.wall',
  },
  {
    title: 'Find the Adjacent Path',
    description: "Let's take the first step. Target the path block immediately following the start block.",
    hint: 'Use the adjacent sibling selector `+`.',
    correctSelector: '#start-point + .path',
  },
  {
    title: 'Find the Secret Treasure',
    description: "There's a hidden item in the maze. Target the block with the `data-treasure` attribute set to 'true'.",
    hint: 'Use an attribute selector like `[attribute="value"]`.',
    correctSelector: "[data-treasure='true']",
  },
  {
    title: 'Target Start and End',
    description: 'For the final challenge, target both the start and end points with a single selector rule.',
    hint: 'You can target multiple selectors by separating them with a comma.',
    correctSelector: '#start-point, #end-point',
  },
];

const SelectorSniperHeaderAnimation = () => (
    <div className="relative h-24 w-full max-w-md mx-auto mb-4 flex items-center justify-center">
        <Crosshair className="h-16 w-16 text-primary animate-[selector-target_3s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="font-bold text-lg text-muted-foreground opacity-50">#id</p>
        </div>
    </div>
);


export default function SelectorSniperPage() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [highlighted, setHighlighted] = useState<Record<string, boolean>>({});

  const correctNodes = useMemo(() => {
    if (typeof window === 'undefined') return [];
    const puzzle = puzzles[currentPuzzle];
    try {
        return Array.from(document.querySelectorAll(puzzle.correctSelector));
    } catch(e) {
        return [];
    }
  }, [currentPuzzle]);

  const handleSubmit = () => {
    const selector = inputValue.trim();

    if (!selector) {
      setError('Please enter a selector.');
      return;
    }

    try {
      const userNodes = Array.from(document.querySelectorAll(`.maze-grid ${selector}`));
      
      const isCorrect = 
        userNodes.length === correctNodes.length && 
        userNodes.every(node => correctNodes.includes(node));

      if (isCorrect) {
        setError(null);
        setInputValue('');

        const newHighlights: Record<string, boolean> = {};
        userNodes.forEach(node => {
          newHighlights[node.id] = true;
        });
        setHighlighted(prev => ({...prev, ...newHighlights}));
        
        setTimeout(() => {
            if (currentPuzzle < puzzles.length - 1) {
                setCurrentPuzzle(currentPuzzle + 1);
            } else {
                setCompleted(true);
            }
        }, 1000);

      } else {
        setError(`Not quite. Your selector targeted ${userNodes.length} elements, but it should target ${correctNodes.length}. Keep trying!`);
      }
    } catch (e) {
      setError(`That doesn't seem to be a valid CSS selector. Hint: ${puzzles[currentPuzzle].hint}`);
    }
  };

  if (completed) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Card className="max-w-2xl text-center animate-in fade-in zoom-in-95">
          <CardHeader>
            <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
            <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
              Selector Master!
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              You've successfully used CSS selectors to navigate the maze. Your precision and skill are impressive!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">You've completed the Selector Sniper challenge. Great job!</p>
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
        <SelectorSniperHeaderAnimation />
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          CSS Selector Sniper
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Use CSS selectors to target elements and solve the maze.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left side: Puzzle */}
        <div className="flex flex-col gap-8">
            <Progress value={progressPercentage} className="h-2" />
            <Card className="shadow-lg flex-grow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Crosshair className="w-8 h-8 text-primary" />
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
                    placeholder="Enter the CSS selector..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    className="font-code"
                  />
                  <Button onClick={handleSubmit}>Target</Button>
                </div>
              </CardContent>
              {error && (
                <CardFooter>
                  <Alert variant="destructive" className="w-full">
                    <AlertTitle>Aim Again</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </CardFooter>
              )}
            </Card>
        </div>

        {/* Right side: Maze Preview */}
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">The Maze</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="maze-grid grid grid-cols-5 gap-1 p-2 bg-muted/30 rounded-md border">
                    {MAZE_LAYOUT.map(block => (
                        <div
                            key={block.id}
                            id={block.attributes?.id || block.id}
                            className={cn(
                                'cell w-full aspect-square rounded-sm transition-all duration-300',
                                {
                                    'bg-background/50': block.type === 'path',
                                    'bg-muted/10': block.type === 'wall',
                                    'bg-blue-500/50': block.type === 'start',
                                    'bg-green-500/50': block.type === 'end',
                                    'shadow-lg scale-105 border-2 border-yellow-400 z-10': highlighted[block.attributes?.id || block.id],
                                },
                                block.type
                            )}
                            {...block.attributes}
                        >
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
