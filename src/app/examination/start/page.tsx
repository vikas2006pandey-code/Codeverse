'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Simplified exam questions
const examQuestions = [
    {
        question: 'What is the correct HTML element for the largest heading?',
        options: ['<h1>', '<h6>', '<head>', '<heading>'],
        correctAnswer: '<h1>'
    },
    {
        question: 'Which CSS property controls the text size?',
        options: ['font-style', 'text-size', 'font-size', 'text-style'],
        correctAnswer: 'font-size'
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        options: ['msg("Hello World");', 'alert("Hello World");', 'alertBox("Hello World");', 'msgBox("Hello World");'],
        correctAnswer: 'alert("Hello World");'
    },
     {
        question: 'What does the `===` operator do in JavaScript?',
        options: ['Assigns a value', 'Compares for equality without type conversion', 'Compares for equality with type conversion', 'Checks for a partial match'],
        correctAnswer: 'Compares for equality without type conversion'
    },
    {
        question: 'What is the purpose of the `alt` attribute on an `<img>` tag?',
        options: ['To provide alternate text if the image cannot be displayed', 'To set the alignment of the image', 'To provide a title for the image', 'To link the image to another page'],
        correctAnswer: 'To provide alternate text if the image cannot be displayed'
    }
];

export default function ExamStartPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const router = useRouter();

    const currentQuestion = examQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / examQuestions.length) * 100;

    const handleAnswer = (answer: string) => {
        if (isAnswered) return;

        setIsAnswered(true);
        setSelectedAnswer(answer);
        if (answer === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
        }

        setTimeout(() => {
            if (currentQuestionIndex < examQuestions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setIsAnswered(false);
                setSelectedAnswer(null);
            } else {
                // Exam finished, navigate to certificate page with score
                const finalScore = (score + (answer === currentQuestion.correctAnswer ? 1 : 0)) / examQuestions.length;
                router.push(`/examination/certificate?score=${finalScore * 100}`);
            }
        }, 1500);
    };

    return (
        <div className="container py-12 flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Certification Exam</CardTitle>
                    <CardDescription>Answer the following questions to the best of your ability.</CardDescription>
                    <Progress value={progress} className="mt-4 !h-2" />
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-semibold mb-6">{currentQuestion.question}</p>
                    <div className="grid grid-cols-1 gap-4">
                        {currentQuestion.options.map(option => {
                            const isCorrect = option === currentQuestion.correctAnswer;
                            const isSelected = option === selectedAnswer;
                            return (
                                <Button
                                    key={option}
                                    variant="outline"
                                    size="lg"
                                    className={cn(
                                        "justify-start text-left h-auto py-4 whitespace-normal transition-all duration-300",
                                        isAnswered && isCorrect && "bg-green-500/20 border-green-500 text-foreground",
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
        </div>
    );
}
