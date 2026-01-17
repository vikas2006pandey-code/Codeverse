'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldQuestion, MapPin, Move, Eye, Trophy, ShieldAlert, ChevronLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Game constants
const GRID_SIZE = 8;
const MAX_MOVES = 5;

type Position = { x: number; y: number };
type GameState = 'intro' | 'playing' | 'win' | 'loss';

const generateRandomPosition = (): Position => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

const RadarHeaderAnimation = () => (
    <div className="relative h-24 w-full max-w-md mx-auto mb-4 flex items-center justify-center">
        <ShieldQuestion className="h-16 w-16 text-primary" />
        <div className="absolute w-24 h-24 rounded-full border-2 border-primary/50 animate-radar-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="absolute w-40 h-40 rounded-full border-2 border-primary/30 animate-radar-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute w-56 h-56 rounded-full border-2 border-primary/20 animate-radar-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
);


const ShadowsOfTheKnightGame = () => {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [villainPos, setVillainPos] = useState<Position | null>(null);
  const [guesses, setGuesses] = useState<Position[]>([]);
  const [hint, setHint] = useState<string>('');

  const movesLeft = MAX_MOVES - guesses.length;

  const startGame = useCallback(() => {
    setVillainPos(generateRandomPosition());
    setGuesses([]);
    setHint('');
    setGameState('playing');
  }, []);

  const getHint = useCallback((guess: Position, target: Position): string => {
    let vertical = '';
    let horizontal = '';

    if (guess.y > target.y) vertical = 'Up';
    if (guess.y < target.y) vertical = 'Down';

    if (guess.x > target.x) horizontal = 'Left';
    if (guess.x < target.x) horizontal = 'Right';

    if (vertical && horizontal) return `${vertical}-${horizontal}`;
    if (vertical) return vertical;
    if (horizontal) return horizontal;
    return 'Found!';
  }, []);
  
  const handleGuess = (x: number, y: number) => {
    if (gameState !== 'playing' || !villainPos) return;

    const newGuess: Position = { x, y };
    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);

    if (x === villainPos.x && y === villainPos.y) {
      setGameState('win');
      setHint('You found the villain!');
      return;
    }

    const newHint = getHint(newGuess, villainPos);
    setHint(newHint);

    if (newGuesses.length >= MAX_MOVES) {
      setGameState('loss');
    }
  };

  const gridCells = useMemo(() => {
    return Array.from({ length: GRID_SIZE }, (_, y) =>
      Array.from({ length: GRID_SIZE }, (_, x) => {
        const isGuessed = guesses.some(g => g.x === x && g.y === y);
        const isVillain = gameState === 'win' || gameState === 'loss' ? villainPos?.x === x && villainPos?.y === y : false;
        
        return {
          key: `${x}-${y}`,
          x,
          y,
          isGuessed,
          isVillain,
          content: isVillain ? '🦹' : isGuessed ? '🦇' : '',
        };
      })
    );
  }, [guesses, villainPos, gameState]);
  
  if (gameState === 'intro') {
    return (
        <div className="container py-12 flex items-center justify-center">
            <Card className="max-w-2xl text-center">
                <CardHeader>
                    <RadarHeaderAnimation />
                    <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
                        Shadows of the Knight
                    </CardTitle>
                    <CardDescription className="mt-4 text-lg text-muted-foreground">
                        Use your radar sense to locate a hidden villain in the city grid. Each attempt will guide you closer. This game teaches binary search and space reduction through experience, not code. You have {MAX_MOVES} attempts.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Button onClick={startGame} size="lg">Begin the Hunt</Button>
                    <Button asChild variant="ghost">
                        <Link href="/games">Back to Game Zone</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
  }
  
  if (gameState === 'win' || gameState === 'loss') {
    const isVictory = gameState === 'win';
    return (
        <div className="container py-12 flex items-center justify-center">
            <Card className="max-w-2xl text-center animate-in fade-in zoom-in-95">
                <CardHeader>
                    {isVictory ? (
                        <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
                    ) : (
                        <ShieldAlert className="mx-auto h-16 w-16 text-destructive" />
                    )}
                    <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
                        {isVictory ? "Villain Apprehended!" : "Target Escaped!"}
                    </CardTitle>
                    <CardDescription className="mt-4 text-lg text-muted-foreground">
                        {isVictory 
                            ? `You found the villain in ${guesses.length} moves! Your keen senses saved the city.`
                            : `The villain slipped away. You ran out of moves.`}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                     <div className="border rounded-md p-2 bg-muted/30">
                        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
                            {gridCells.flat().map(cell => (
                                <div key={cell.key} className={cn('flex items-center justify-center w-8 h-8 rounded-sm text-xl', cell.isVillain ? 'bg-destructive' : cell.isGuessed ? 'bg-muted/50' : 'bg-background')}>
                                    {cell.content}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 pt-4">
                        <Button onClick={startGame}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Play Again
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/games">Back to Game Zone</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="container py-12">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/games">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Game Zone
            </Link>
        </Button>
        <div className="text-center mb-8">
            <RadarHeaderAnimation />
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
                Shadows of the Knight
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
             A villain is hidden in the grid. Use your radar sense to find them.
            </p>
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Game Grid */}
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>City Grid</CardTitle>
                        <CardDescription>Click on a square to use your radar sense.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
                            {gridCells.flat().map(cell => (
                                <button 
                                    key={cell.key}
                                    onClick={() => handleGuess(cell.x, cell.y)}
                                    disabled={cell.isGuessed || gameState !== 'playing'}
                                    className={cn(
                                        'flex items-center justify-center w-full aspect-square rounded-md text-2xl transition-all',
                                        'bg-muted/30 hover:bg-muted/70 disabled:bg-muted/50 disabled:cursor-not-allowed',
                                        cell.isGuessed && 'bg-primary/20 hover:bg-primary/20'
                                    )}
                                >
                                    {cell.isGuessed && '🦇'}
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Game Info */}
            <div className="sticky top-20 space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Move /> Moves Left</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-center">{movesLeft}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Eye /> Radar Hint</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-center h-8">
                            {hint || '...'}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
};

export default ShadowsOfTheKnightGame;
