'use client';

import { useState, useEffect } from 'react';
import type { Character, Question } from '@/lib/data';
import { getAIResponse } from '@/app/battle/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, ShieldAlert, Trophy, Clock, Swords, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

// Marvel-themed icon for Infinity Stones
const InfinityStone = ({ color, collected }: { color: string; collected: boolean }) => (
  <div className={`relative transition-all duration-500 ${collected ? 'opacity-100' : 'opacity-20'}`}>
    <svg viewBox="0 0 100 100" className="w-12 h-12">
      <path
        d="M50 0L61.8 38.2L100 38.2L69.1 61.8L80.9 100L50 76.4L19.1 100L30.9 61.8L0 38.2L38.2 38.2L50 0Z"
        fill={color}
        className={collected ? `drop-shadow-[0_0_8px_${color}]` : ''}
      />
    </svg>
  </div>
);

const stoneMap = {
    Mind: { name: 'Mind Stone', color: '#FFD700' },
    Time: { name: 'Time Stone', color: '#2ECC40' },
    Power: { name: 'Power Stone', color: '#FF00FF' },
    Reality: { name: 'Reality Stone', color: '#FF4136' },
    Space: { name: 'Space Stone', color: '#7DF9FF' },
    Soul: { name: 'Soul Stone', color: '#FF851B' },
};

export default function BattleInterface({ character, questions: allAvailableQuestions, searchParams }: { character: Character; questions: Question[], searchParams?: { redirect?: string } }) {
  const [showIntro, setShowIntro] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userHealth, setUserHealth] = useState(100);
  const [aiHealth, setAiHealth] = useState(100);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState<'win' | 'loss' | null>(null);
  const [aiHint, setAiHint] = useState<string | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);

  const IS_TIME_CHALLENGE = character.id === 'doctor-strange';
  const INITIAL_TIME = 20; // 20 seconds for Doctor Strange's challenge
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  useEffect(() => {
    if (allAvailableQuestions.length > 0) {
      const initialDifficulty = character.difficulty === 'Beginner' ? 'easy' : character.difficulty === 'Advanced' ? 'medium' : 'hard';
      const filteredQuestions = allAvailableQuestions.filter(q => q.difficulty === initialDifficulty);
      const questionSet = filteredQuestions.length > 0 ? filteredQuestions : allAvailableQuestions;
      setQuestions(questionSet.sort(() => Math.random() - 0.5).slice(0, 4)); // Limit to 4 questions for a quick demo
    }
  }, [character.difficulty, allAvailableQuestions]);

  const currentQuestion = questions[currentQuestionIndex];
  const userPerformance = currentQuestionIndex > 0 ? (score / currentQuestionIndex) * 100 : 0;
  const redirectUrl = searchParams?.redirect;

  useEffect(() => {
    if (currentQuestion && !showIntro) {
      setIsHintLoading(true);
      setAiHint(null);
      getAIResponse(character.name, userPerformance, currentQuestion.topic, currentQuestion.difficulty)
        .then(response => {
          if (response?.hint) {
            setAiHint(response.hint);
          }
        })
        .finally(() => setIsHintLoading(false));
    }
  }, [currentQuestion, character.name, userPerformance, showIntro]);
  
  // Timer effect for Doctor Strange
  useEffect(() => {
    if (!IS_TIME_CHALLENGE || isAnswered || gameOver || showIntro) return;

    if (timeLeft <= 0) {
      handleAnswer(''); // Auto-submit empty (wrong) answer when time runs out
      return;
    }

    const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft, IS_TIME_CHALLENGE, isAnswered, gameOver, showIntro]);

  // Reset timer for next question
  useEffect(() => {
    if (!gameOver) {
        setTimeLeft(INITIAL_TIME);
    }
  }, [currentQuestionIndex, gameOver]);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    let nextUserHealth = userHealth;
    let nextAiHealth = aiHealth;

    if (isCorrect) {
      nextAiHealth = Math.max(0, aiHealth - 25);
      setAiHealth(nextAiHealth);
      setScore(prev => prev + 1);
    } else {
      nextUserHealth = Math.max(0, userHealth - (character.id === 'thanos' ? 50 : 34)); // 3 hits to lose, 2 for Thanos
      setUserHealth(nextUserHealth);
      if (IS_TIME_CHALLENGE) {
        setTimeLeft(prev => Math.max(0, prev - 5)); // 5 second penalty for wrong answer
      }
    }

    setTimeout(() => {
      if (nextAiHealth <= 0) {
        setGameOver('win');
      } else if (nextUserHealth <= 0) {
        setGameOver('loss');
      } else if (currentQuestionIndex === questions.length - 1) {
        setGameOver(nextAiHealth <= nextUserHealth ? 'win' : 'loss');
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsAnswered(false);
        setSelectedAnswer(null);
      }
    }, 2000);
  };
  
  const characterImage = PlaceHolderImages.find((p) => p.id === character.id);
  const scenarioParagraphs = character.storyline?.scenarioText.split('\n').filter(p => p);

  if (showIntro && character.storyline && scenarioParagraphs) {
    return (
        <div className="container py-12 flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
            <Card className="max-w-4xl mx-auto animate-in fade-in">
                <CardHeader>
                    <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        {characterImage && (
                        <Image
                            src={characterImage.imageUrl}
                            alt={character.name}
                            width={200}
                            height={200}
                            className="rounded-full border-4 border-primary"
                            data-ai-hint={characterImage.imageHint}
                        />
                        )}
                        <div>
                        <CardTitle className="text-3xl font-headline">{scenarioParagraphs[0]}</CardTitle>
                        <CardDescription className="mt-4 text-base space-y-2">
                            {scenarioParagraphs.slice(1).map((p, i) => (
                            <p key={i}>{p}</p>
                            ))}
                        </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col sm:flex-row justify-center gap-4 pt-6">
                    <Button onClick={() => setShowIntro(false)} size="lg">
                        <Swords className="mr-2 h-4 w-4" />
                        Start Battle!
                    </Button>
                    <Button variant="ghost" asChild>
                      <Link href="/opponents">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Choose another opponent
                      </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
  }

  if (gameOver) {
    const stone = character.unlocksStone ? stoneMap[character.unlocksStone] : null;
    const isIronManLoss = gameOver === 'loss' && character.id === 'iron-man';

    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <Card className="w-full max-w-md text-center p-8 shadow-2xl animate-in fade-in zoom-in-95">
          <CardHeader>
            {gameOver === 'win' ? <Trophy className="mx-auto h-16 w-16 text-yellow-400" /> : <ShieldAlert className="mx-auto h-16 w-16 text-destructive" />}
            <CardTitle className="text-4xl font-bold font-headline mt-4">
              {gameOver === 'win' ? 'Victory!' : 'Defeated!'}
            </CardTitle>
            <CardDescription className="text-lg">
              {isIronManLoss
                ? 'You have been assigned a targeted practice mission.'
                : gameOver === 'win'
                ? `You defeated ${character.name}!`
                : `${character.name} proved too strong.`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <p className="text-xl">Final Score: <span className="font-bold text-primary">{score}/{questions.length}</span></p>
             {gameOver === 'win' && stone && (
                <div className="mt-6 flex flex-col items-center gap-2 animate-in fade-in delay-500">
                    <p className="font-semibold text-muted-foreground">You Unlocked The</p>
                    <div className="flex items-center gap-2">
                        <InfinityStone color={stone.color} collected={true} />
                        <p className="text-xl font-bold" style={{ color: stone.color, textShadow: `0 0 8px ${stone.color}` }}>{stone.name}!</p>
                    </div>
                </div>
             )}
            <Button asChild size="lg" className="mt-4">
              <Link href={redirectUrl || "/learning"}>
                {redirectUrl ? "Continue Learning" : "Back to Learning"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (questions.length === 0 || !currentQuestion) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Card className="max-w-4xl w-full mx-auto p-8">
             <CardHeader>
                <CardTitle>Preparing Battle...</CardTitle>
                <CardDescription>Filtering questions for your selected topics. If this takes too long, there might be no questions for this combination.</CardDescription>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-8 w-1/2 mb-4" />
                <Skeleton className="h-6 w-full mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                </div>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12 animate-in fade-in">
      <div className="grid grid-cols-3 gap-4 md:gap-8 items-center mb-8">
        <div className="text-left">
          <h2 className="text-xl md:text-2xl font-bold font-headline">You</h2>
          <Progress value={userHealth} className="h-4 mt-2" />
        </div>
        <div className="text-center">
            <p className="font-semibold text-muted-foreground">VS</p>
            <h1 className="text-2xl md:text-3xl font-bold font-headline">{character.name}</h1>
        </div>
        <div className="text-right">
          <h2 className="text-xl md:text-2xl font-bold font-headline">{character.name}</h2>
          <Progress value={aiHealth} className="h-4 mt-2" indicatorClassName="bg-destructive" />
        </div>
      </div>

      <Card className="max-w-4xl mx-auto shadow-lg relative overflow-hidden">
        {IS_TIME_CHALLENGE && (
             <div className="absolute top-0 left-0 w-full h-2">
                <Progress value={(timeLeft / INITIAL_TIME) * 100} className="h-2 rounded-none" indicatorClassName="bg-yellow-400 transition-all duration-1000 linear" />
             </div>
        )}
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl md:text-3xl font-headline">Question {currentQuestionIndex + 1}</CardTitle>
              <CardDescription className="text-lg pt-2">{currentQuestion.question}</CardDescription>
            </div>
            {IS_TIME_CHALLENGE && (
                <div className="flex items-center gap-2 text-yellow-400 font-bold font-mono text-2xl">
                    <Clock className="w-6 h-6" />
                    {timeLeft}
                </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedAnswer;

              return (
                <Button
                  key={option}
                  variant="outline"
                  size="lg"
                  className={cn(
                    "justify-start text-left h-auto py-4 whitespace-normal transition-all duration-300",
                    isAnswered && isCorrect && "bg-green-500/20 border-green-500 text-foreground scale-105",
                    isAnswered && isSelected && !isCorrect && "bg-red-500/20 border-red-500 text-foreground",
                    !isAnswered && "hover:border-primary hover:bg-primary/10"
                  )}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                >
                  {option}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <div className="max-w-4xl mx-auto mt-6 min-h-[96px]">
        {isHintLoading ? (
            <Skeleton className="h-24 w-full" />
        ) : aiHint && !IS_TIME_CHALLENGE && (
            <Alert className="border-primary/50 bg-primary/10 animate-in fade-in">
                <Lightbulb className="h-4 w-4 text-primary" />
                <AlertTitle className="font-headline text-primary">AI Hint</AlertTitle>
                <AlertDescription>
                    {aiHint}
                </AlertDescription>
            </Alert>
        )}
      </div>

      <div className="mt-8 text-center text-muted-foreground">
        <p>XP: {score * 10} | Correct Answers: {score}/{questions.length}</p>
      </div>
    </div>
  );
}
