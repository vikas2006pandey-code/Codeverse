'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ClipboardList, Eye, Terminal, Trophy, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

const puzzles = [
  {
    title: 'Label for Name',
    description: 'Let\'s start with a label for a "Name" input field.',
    hint: 'It tells the user what the input is for.',
    answer: '<label>',
    resultHtml: '<label for="name" class="font-medium">Name</label>',
  },
  {
    title: 'Text Input for Name',
    description: 'Now, add a text input for the name.',
    hint: 'The `input` tag is used for this.',
    answer: '<input>',
    resultHtml: '<input type="text" id="name" name="name" class="w-full rounded-md border border-input bg-background p-2" />',
  },
  {
    title: 'Label for Email',
    description: 'Great. Now a label for the email field.',
    hint: 'Same tag as before.',
    answer: '<label>',
    resultHtml: '<label for="email" class="font-medium">Email</label>',
  },
  {
    title: 'Email Input',
    description: 'And the input field for the email.',
    hint: 'Use the `input` tag with a specific `type`.',
    answer: '<input>',
    resultHtml: '<input type="email" id="email" name="email" class="w-full rounded-md border border-input bg-background p-2" />',
  },
  {
    title: 'Submit Button',
    description: "Finally, let's add a button to submit the form.",
    hint: 'It\'s what you click.',
    answer: '<button>',
    resultHtml: '<button type="submit" class="w-full rounded-md bg-primary text-primary-foreground p-2 hover:bg-primary/90">Submit</button>',
  },
];

export default function HTMLFormBuilderPage() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [elements, setElements] = useState<string[]>([]);

  const handleSubmit = () => {
    const expectedAnswer = puzzles[currentPuzzle].answer;
    const isCorrect = inputValue.trim().toLowerCase() === expectedAnswer.toLowerCase();

    if (isCorrect) {
      setError(null);
      setInputValue('');
      setElements([...elements, puzzles[currentPuzzle].resultHtml]);
      
      if (currentPuzzle < puzzles.length - 1) {
        setCurrentPuzzle(currentPuzzle + 1);
      } else {
        setCompleted(true);
      }
    } else {
      setError(`Not quite. The tag seems incorrect. Hint: ${puzzles[currentPuzzle].hint}`);
    }
  };

  if (completed) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Card className="max-w-2xl text-center animate-in fade-in zoom-in-95">
          <CardHeader>
            <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
            <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
              Form Forged!
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              You've successfully used HTML tags to build a complete form. Your skills are growing!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">You've completed the HTML Form Builder challenge. Great job!</p>
            <Button asChild size="lg">
              <Link href="/learning/html/games">Back to HTML Games</Link>
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
        <Link href="/learning/html/games">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to HTML Games
        </Link>
      </Button>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          HTML Form Builder
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Construct a user input form one element at a time.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side: Puzzle */}
        <div className="flex flex-col gap-8">
            <Progress value={progressPercentage} className="h-2" />
            <Card className="shadow-lg flex-grow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <ClipboardList className="w-8 h-8 text-primary" />
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
                    placeholder="Enter the HTML tag..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    className="font-code"
                  />
                  <Button onClick={handleSubmit}>Build</Button>
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
                <div className="border rounded-md p-4 bg-background/50 min-h-[300px]">
                    {elements.length === 0 ? (
                        <p className="text-muted-foreground italic">Your form preview will appear here...</p>
                    ) : (
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()} dangerouslySetInnerHTML={{ __html: elements.join('') }} />
                    )}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
