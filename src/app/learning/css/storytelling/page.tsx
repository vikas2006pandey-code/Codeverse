'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { characters } from '@/lib/data';
import type { Character as CharacterType } from '@/lib/data';
import { CheckCircle, XCircle, ArrowRight, Trophy, BookOpen, ChevronLeft, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Game Component
const StorytellingGame = ({ character, onExit }: { character: CharacterType, onExit: () => void }) => {
  const characterImage = PlaceHolderImages.find(p => p.id === character.image);

  const [gameState, setGameState] = useState<'intro' | 'playing' | 'end'>('intro');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  // This should not happen if character is selected properly, but as a safeguard.
  if (!character.storyline || !character.storyline.steps) {
    return (
      <div className="container py-12 text-center">
        <p>Storyline coming soon for this character.</p>
        <Button onClick={onExit} className="mt-4">Choose Another Hero</Button>
      </div>
    );
  }

  const { storyline } = character;
  const { steps } = storyline;
  const stepData = steps[currentStep];
  const scenarioParagraphs = storyline.scenarioText.split('\n').filter(p => p);
  const isCorrect = selectedAnswer === stepData.question.correctAnswer;

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(answer);
    if (answer === stepData.question.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
    } else {
      setGameState('end');
    }
  };

  const handleStartGame = () => {
    setGameState('playing');
  };

  const resetGame = () => {
    setGameState('intro');
    setCurrentStep(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
  }

  if (gameState === 'intro') {
    return (
        <div className="container py-12">
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
                <CardFooter className="flex-col gap-4 pt-6">
                    <Button onClick={handleStartGame} size="lg">
                        Let's Do It!
                    </Button>
                    <Button onClick={onExit} variant="ghost">Choose a different hero</Button>
                </CardFooter>
            </Card>
        </div>
    );
  }
  
  if (gameState === 'end') {
    const isVictory = score === steps.length;

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
                        {isVictory ? "You Mastered the Mystic Arts!" : "Reality Unravels"}
                    </CardTitle>
                    <CardDescription className="mt-4 text-lg text-muted-foreground">
                        {isVictory 
                            ? `You succeeded with ${character.name} and proved your mastery of CSS!`
                            : `You fought bravely alongside ${character.name}, but more training is required. Don't give up!`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="mb-6 text-xl">You scored: <span className="font-bold text-primary">{score} / {steps.length}</span></p>
                    <div className="flex justify-center gap-4">
                        <Button onClick={resetGame} variant="outline">Play Again</Button>
                        <Button onClick={onExit}>
                            Choose Another Hero
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="container py-12">
      <Button onClick={onExit} variant="ghost" className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Hero Selection
      </Button>
      <Card className="max-w-3xl mx-auto animate-in fade-in-up">
        <CardHeader>
            <div className="flex items-center gap-4">
                 {characterImage && (
                    <Image
                        src={characterImage.imageUrl}
                        alt={character.name}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-primary"
                        data-ai-hint={characterImage.imageHint}
                    />
                )}
                <CardTitle className="font-normal text-lg md:text-xl text-muted-foreground italic">
                    &quot;{stepData.narrative}&quot;
                </CardTitle>
            </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="border-t pt-6">
                <h3 className="font-headline text-xl mb-4">{stepData.question.question}</h3>
                <div className="grid grid-cols-1 gap-3">
                    {stepData.question.options.map((option) => {
                        const isSelected = option === selectedAnswer;
                        const isCorrectOption = option === stepData.question.correctAnswer;
                        return (
                            <Button
                            key={option}
                            variant="outline"
                            size="lg"
                            className={cn(
                                "justify-start text-left h-auto py-3 whitespace-normal transition-all duration-300",
                                isAnswered && isCorrectOption && "bg-green-500/20 border-green-500 text-foreground",
                                isAnswered && isSelected && !isCorrectOption && "bg-red-500/20 border-red-500 text-foreground",
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
            </div>
            {isAnswered && (
                <Alert variant={isCorrect ? 'default' : 'destructive'} className={cn(isCorrect && 'border-green-500/50 bg-green-500/10 text-foreground')}>
                     {isCorrect ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4" />}
                    <AlertTitle className="font-headline">{isCorrect ? 'Correct!' : 'Not Quite!'}</AlertTitle>
                    <AlertDescription>
                        {isCorrect ? stepData.feedback.correct : stepData.feedback.incorrect}
                    </AlertDescription>
                </Alert>
            )}
        </CardContent>
        <CardFooter>
            {isAnswered && (
                <Button onClick={handleNext} className="w-full" size="lg">
                    {currentStep < steps.length - 1 ? 'Next Question' : 'Finish Story'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
};


// Selection Component
const StorytellingCharacterSelection = ({ onSelectCharacter }: { onSelectCharacter: (character: CharacterType) => void }) => {
    // Show all characters that have a storyline with steps for CSS.
    const storyCharacters = characters.filter(c => c.storyline && c.storyline.steps && c.storyline.steps.length > 0 && c.storyline.steps.some(s => s.question.topic === 'CSS'));

    return (
        <div className="container py-12">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/learning/css/games">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to CSS Games
                </Link>
            </Button>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
                    Choose Your Story Guide
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Select a Marvel character to guide you through a CSS learning story.
                </p>
            </div>

            {storyCharacters.length === 0 ? (
                <Card className="max-w-2xl mx-auto text-center p-8">
                    <CardHeader>
                        <CardTitle>More Stories Coming Soon!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">It looks like there are no stories available for CSS right now. Check back later!</p>
                        <Button asChild className="mt-6">
                            <Link href="/learning/css/games">Back to CSS Games</Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {storyCharacters.map((character) => {
                        const placeholder = PlaceHolderImages.find(p => p.id === character.image);

                        return (
                            <Card 
                                key={character.id}
                                onClick={() => onSelectCharacter(character)}
                                className="h-full flex flex-col transition-all duration-300 ease-in-out hover:border-primary hover:scale-105 hover:shadow-lg hover:shadow-primary/20 bg-card/50 cursor-pointer group"
                            >
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold font-headline">{character.name}</CardTitle>
                                    <CardDescription>{character.storyline?.learningRole}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col justify-center items-center">
                                    {placeholder && (
                                        <div className="relative w-full h-80 mb-4 overflow-hidden rounded-md">
                                            <Image
                                                src={placeholder.imageUrl}
                                                alt={character.name}
                                                fill
                                                className="object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
                                                data-ai-hint={placeholder.imageHint}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                        </div>
                                    )}
                                    <p className="text-center text-muted-foreground italic">&quot;{character.storyline?.motivation}&quot;</p>
                                </CardContent>
                                <CardFooter>
                                    <div className="w-full justify-center py-2 text-sm font-semibold flex items-center gap-2 text-primary">
                                        <BookOpen className="w-4 h-4" />
                                        <span>Start Story</span>
                                    </div>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}


// Main Page Component
export default function StorytellingPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType | null>(null);

  if (selectedCharacter) {
    return <StorytellingGame character={selectedCharacter} onExit={() => setSelectedCharacter(null)} />;
  }
  
  return <StorytellingCharacterSelection onSelectCharacter={setSelectedCharacter} />;
}
