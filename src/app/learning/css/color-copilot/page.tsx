'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Palette, Eye, Timer, Trophy, ChevronLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const puzzles = [
  {
    hero: 'Spider-Man',
    part: 'Main Suit',
    targetColor: 'red',
    format: 'named',
    description: 'Spider-Man needs his classic suit. What is the named color for his primary suit color?',
    hint: 'It\'s a primary color, like a fire truck.',
    answer: 'red',
    timeLimit: 30,
  },
  {
    hero: 'Captain America',
    part: 'Shield Star',
    targetColor: '#FFFFFF',
    format: 'hex',
    description: "Captain America's shield needs its star. What is the HEX code for pure white?",
    hint: 'A full-value HEX code starts with # and has six characters.',
    answer: '#ffffff',
    timeLimit: 35,
  },
  {
    hero: 'Iron Man',
    part: 'Arc Reactor',
    targetColor: 'rgb(0, 255, 255)',
    format: 'rgb',
    description: 'Power up Iron Man\'s arc reactor. What is the RGB value for cyan?',
    hint: 'It\'s a mix of green and blue, with no red.',
    answer: 'rgb(0,255,255)',
    timeLimit: 40,
  },
  {
    hero: 'Hulk',
    part: 'Skin',
    targetColor: 'hsl(120, 100%, 50%)',
    format: 'hsl',
    description: 'The Hulk is looking a bit pale. What\'s the HSL value for pure green?',
    hint: 'The hue for green is 120 degrees.',
    answer: 'hsl(120,100%,50%)',
    timeLimit: 45,
  },
  {
    hero: 'Thanos',
    part: 'Gauntlet',
    targetColor: '#FFD700',
    format: 'hex',
    description: 'The Infinity Gauntlet needs its golden sheen. Provide the HEX code for gold.',
    hint: 'It is a common color used for gold medals in web design.',
    answer: '#ffd700',
    timeLimit: 40,
  },
];

const ColorCopilotHeaderAnimation = () => (
    <div className="relative h-24 w-full max-w-md mx-auto mb-4 flex items-center justify-center">
        <Palette className="h-16 w-16 text-accent" />
        <div className="absolute w-4 h-4 rounded-full bg-primary animate-[color-flow_3s_ease-in-out_infinite]" style={{ animationDelay: '0s' }}></div>
        <div className="absolute w-4 h-4 rounded-full bg-chart-4 animate-[color-flow_3s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-4 h-4 rounded-full bg-chart-5 animate-[color-flow_3s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}></div>
    </div>
);

// Helper to normalize color strings for comparison
const normalizeColor = (str: string) => str.toLowerCase().replace(/\s/g, '');

export default function ColorCopilotPage() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [gameStatus, setGameStatus] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [timeLeft, setTimeLeft] = useState(puzzles[0].timeLimit);
  const [correctMatches, setCorrectMatches] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const currentPuzzle = puzzles[currentPuzzleIndex];

  const startGame = useCallback(() => {
    setGameStatus('playing');
    setCurrentPuzzleIndex(0);
    setUserInput('');
    setTimeLeft(puzzles[0].timeLimit);
    setCorrectMatches(0);
    setError(null);
  }, []);

  useEffect(() => {
    if (gameStatus === 'playing') {
      if (timeLeft <= 0) {
        setError("Time's up! The design was not approved. Try again.");
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
    if (normalizeColor(userInput) === normalizeColor(currentPuzzle.answer)) {
      setCorrectMatches(prev => prev + 1);
      setError(null);
      
      if (currentPuzzleIndex < puzzles.length - 1) {
        const nextIndex = currentPuzzleIndex + 1;
        setCurrentPuzzleIndex(nextIndex);
        setUserInput('');
        setTimeLeft(puzzles[nextIndex].timeLimit);
      } else {
        setGameStatus('finished');
      }
    } else {
      setError(`Not quite! That color code doesn't look right. Hint: ${currentPuzzle.hint}`);
    }
  };

  if (gameStatus === 'ready') {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Card className="max-w-2xl text-center">
          <CardHeader>
            <ColorCopilotHeaderAnimation />
            <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
              Color Co-pilot
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              Help your favorite heroes design their suits by providing the correct CSS color codes. Each correct match gets you one step closer to becoming a design master!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={startGame} size="lg">Start Designing</Button>
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
    const success = correctMatches === puzzles.length;
    return (
      <div className="container py-12 flex items-center justify-center">
        <Card className="max-w-2xl text-center animate-in fade-in zoom-in-95">
          <CardHeader>
            <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
            <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
              {success ? 'Design Approved!' : 'Back to the Drawing Board'}
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              {success ? "Excellent work, designer! All suits are looking sharp." : "A valiant effort, but the color palette needs more work."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-2xl font-bold">Colors Matched: {correctMatches} / {puzzles.length}</p>
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
          Color Co-pilot
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Level {currentPuzzleIndex + 1}: {currentPuzzle.hero}'s {currentPuzzle.part}
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left side: Code Editor & Puzzle */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5"/>Design Brief</CardTitle>
                <CardDescription className="pt-1">{currentPuzzle.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2 text-lg font-semibold text-destructive">
                <Timer className="h-5 w-5" />
                <span>{timeLeft}s</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="font-code text-base"
              placeholder={`Enter color value (e.g., ${currentPuzzle.format})`}
              autoFocus
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
             <Button onClick={handleSubmit} className="w-full">
                Apply Color
            </Button>
            {error && (
              <Alert variant="destructive" className="w-full">
                <AlertTitle>Color Mismatch</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </Card>

        {/* Right side: Live Preview */}
        <div className="sticky top-20">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Eye className="w-5 h-5" />Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="font-semibold mb-2">Target Color</p>
                <div
                  className="h-32 w-full rounded-md border-2"
                  style={{ backgroundColor: currentPuzzle.targetColor }}
                ></div>
              </div>
              <div className="text-center">
                <p className="font-semibold mb-2">Your Color</p>
                <div
                  className="h-32 w-full rounded-md border-2 transition-colors"
                  style={{ backgroundColor: userInput || 'transparent' }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
