'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Puzzle, Play, RefreshCw, ChevronLeft, Trophy, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Game constants
const GRID_SIZE = 5;
const START_POS = { x: 0, y: 2 };
const END_POS = { x: 4, y: 2 };
const WALLS = [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 3 }, { x: 2, y: 4 }];
const CELL_SIZE_REM = 4.25; // 4rem for cell, 0.25rem for gap

type Position = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const OnboardingPuzzleGame = () => {
  const [gameState, setGameState] = useState<'playing' | 'success' | 'failure' | 'executing'>('playing');
  const [characterPos, setCharacterPos] = useState<Position>(START_POS);
  const [characterDir, setCharacterDir] = useState<Direction>('RIGHT');
  const [userCode, setUserCode] = useState('MOVE\nMOVE\nTURN_LEFT\nMOVE\nMOVE\nTURN_RIGHT\nMOVE\nMOVE');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const rotationDegrees: Record<Direction, number> = {
    'UP': -90,
    'RIGHT': 0,
    'DOWN': 90,
    'LEFT': 180,
  };

  const resetGame = () => {
    setGameState('playing');
    setCharacterPos(START_POS);
    setCharacterDir('RIGHT');
    setFeedback(null);
    setIsShaking(false);
  };

  const executeCode = async () => {
    resetGame();
    setFeedback({ type: 'info', message: 'Executing...' });
    setGameState('executing');
    
    const commands = userCode.toUpperCase().split('\n').filter(cmd => cmd.trim() !== '');
    let currentPos = { ...START_POS };
    let currentDir: Direction = 'RIGHT';

    for (const command of commands) {
      await new Promise(resolve => setTimeout(resolve, 400)); // Animation delay

      if (command === 'MOVE') {
        let nextPos = { ...currentPos };
        if (currentDir === 'RIGHT') nextPos.x++;
        else if (currentDir === 'LEFT') nextPos.x--;
        else if (currentDir === 'DOWN') nextPos.y++;
        else if (currentDir === 'UP') nextPos.y--;

        const isWall = WALLS.some(w => w.x === nextPos.x && w.y === nextPos.y);
        const isOutOfBounds = nextPos.x < 0 || nextPos.x >= GRID_SIZE || nextPos.y < 0 || nextPos.y >= GRID_SIZE;

        if (isWall || isOutOfBounds) {
          setFeedback({ type: 'error', message: 'Execution failed: Hit an obstacle!' });
          setGameState('failure');
          setIsShaking(true);
          setTimeout(() => setIsShaking(false), 820);
          return;
        }
        currentPos = nextPos;
        setCharacterPos(currentPos);
      } else if (command === 'TURN_RIGHT') {
        const dirMap: Record<Direction, Direction> = { 'UP': 'RIGHT', 'RIGHT': 'DOWN', 'DOWN': 'LEFT', 'LEFT': 'UP' };
        currentDir = dirMap[currentDir];
        setCharacterDir(currentDir);
      } else if (command === 'TURN_LEFT') {
        const dirMap: Record<Direction, Direction> = { 'UP': 'LEFT', 'LEFT': 'DOWN', 'DOWN': 'RIGHT', 'RIGHT': 'UP' };
        currentDir = dirMap[currentDir];
        setCharacterDir(currentDir);
      } else {
        setFeedback({ type: 'error', message: `Execution failed: Unknown command "${command}"` });
        setGameState('failure');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 820);
        return;
      }
    }

    if (currentPos.x === END_POS.x && currentPos.y === END_POS.y) {
      setFeedback({ type: 'success', message: 'Success! You reached the destination.' });
      setGameState('success');
    } else {
      setFeedback({ type: 'error', message: 'Execution finished, but you did not reach the destination.'});
      setGameState('failure');
    }
  };
  
  const gridCells = useMemo(() => {
    return Array.from({ length: GRID_SIZE }, (_, y) =>
      Array.from({ length: GRID_SIZE }, (_, x) => {
        const isWall = WALLS.some(w => w.x === x && w.y === y);
        const isStart = x === START_POS.x && y === START_POS.y;
        const isEnd = x === END_POS.x && y === END_POS.y;
        
        let content = '';
        if (isStart) content = 'S';
        else if (isEnd) content = 'E';

        return {
          key: `${x}-${y}`,
          className: cn(
            'w-16 h-16 border flex items-center justify-center font-bold text-2xl transition-all',
            isWall && 'bg-muted/50',
            isStart && 'bg-blue-500/20 text-blue-300',
            isEnd && 'bg-green-500/20 text-green-300 animate-pulse-goal',
          ),
          content,
        };
      })
    );
  }, []);


  return (
    <div className="container py-12">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/games">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Game Zone
            </Link>
        </Button>
        <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
            Onboarding Puzzle
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
             As Nick Fury says: “Before fighting villains, learn how the system works.” Guide Spider-Man through this training simulation to learn the basics of logic and flow control.
            </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left side: Code Editor */}
            <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Puzzle className="w-5 h-5"/>Mission Control</CardTitle>
                <CardDescription className="pt-1">
                    Use `MOVE`, `TURN_RIGHT`, and `TURN_LEFT` to navigate the grid. Each command must be on a new line.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="font-code min-h-[250px] text-base"
                placeholder="MOVE
TURN_RIGHT
..."
                />
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
                <div className="flex w-full gap-4">
                    <Button onClick={executeCode} className="w-full" disabled={gameState === 'executing'}>
                        <Play className="mr-2"/> Run Simulation
                    </Button>
                    <Button onClick={resetGame} variant="outline" disabled={gameState === 'executing'}>
                        <RefreshCw className="mr-2"/> Reset
                    </Button>
                </div>
                {feedback && (
                  <Alert variant={feedback.type === 'error' ? 'destructive' : 'default'} className={cn(feedback.type === 'success' && 'border-green-500/50 bg-green-500/10 text-foreground')}>
                    {feedback.type === 'success' ? <Trophy className="h-4 w-4 text-green-500" /> : feedback.type === 'error' ? <ShieldAlert className="h-4 w-4"/> : null}
                    <AlertTitle>{feedback.type === 'success' ? 'Success!' : feedback.type === 'error' ? 'Mission Failed' : 'Status'}</AlertTitle>
                    <AlertDescription>{feedback.message}</AlertDescription>
                  </Alert>
                )}
            </CardFooter>
            </Card>

            {/* Right side: Grid Preview */}
            <div className="sticky top-20">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Training Grid</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center p-4">
                        <div className={cn("relative grid gap-1", isShaking && 'animate-shake')} style={{gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`}}>
                            {gridCells.flat().map(cell => (
                                <div key={cell.key} className={cell.className}>
                                    {cell.content}
                                </div>
                            ))}
                            <div 
                                className="absolute flex items-center justify-center text-4xl transition-all duration-300"
                                style={{
                                    width: '4rem',
                                    height: '4rem',
                                    transform: `translate(${characterPos.x * CELL_SIZE_REM}rem, ${characterPos.y * CELL_SIZE_REM}rem) rotate(${rotationDegrees[characterDir]}deg)`,
                                }}
                            >
                                {gameState === 'success' ? <Trophy className="h-10 w-10 text-yellow-400 animate-thumbs-up"/> : '🕷️'}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
      </div>
    </div>
  );
};

export default OnboardingPuzzleGame;
