'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Code, Eye, Terminal, Trophy, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

const puzzles = [
  {
    title: 'The Main Heading',
    description: "Let's start building a webpage. What's the tag for the most important heading?",
    hint: 'Think "Heading 1".',
    answer: '<h1>',
    resultHtml: '<h1>My Awesome Webpage</h1>',
  },
  {
    title: 'A Simple Paragraph',
    description: 'Great! Now, let\'s add some text. What tag do you use to create a paragraph?',
    hint: 'It starts with "p".',
    answer: '<p>',
    resultHtml: '<p>This is a paragraph where I can write anything I want. Learning HTML is fun!</p>',
  },
  {
    title: 'Adding an Image',
    description: 'Time to make it visual. What tag is used to embed an image?',
    hint: 'It\'s short for "image".',
    answer: '<img>',
    resultHtml: '<img src="https://picsum.photos/seed/html/400/200" alt="A random placeholder" class="rounded-md mt-4" />',
  },
  {
    title: 'Creating a Link',
    description: "Let's add a way to navigate. What's the tag for creating a hyperlink?",
    hint: 'It\'s called an anchor tag.',
    answer: '<a>',
    resultHtml: '<p class="mt-4">You can <a href="#" class="text-primary underline">visit other pages</a> with this tag.</p>',
  },
];

const HTMLBuilderHeaderAnimation = () => (
    <div className="relative h-24 w-full max-w-md mx-auto mb-4 flex items-center justify-center gap-2">
        <span className="text-4xl text-muted-foreground animate-[tags-assemble_3s_ease-in-out_infinite]">&lt;</span>
        <Code className="h-16 w-16 text-primary" />
        <span className="text-4xl text-muted-foreground animate-[tags-assemble_3s_ease-in-out_infinite]" style={{animationDelay: '0.5s'}}>&gt;</span>
    </div>
);

export default function HTMLEscapeRoomPage() {
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
              Webpage Built!
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              You've successfully used the fundamental HTML tags to build a mini webpage. Your coding journey has begun!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">You've completed the HTML Builder challenge. Great job!</p>
            <Button asChild size="lg">
              <Link href="/learning/html/games">Back to HTML Games</Link>
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
        <Link href="/learning/html/games">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to HTML Games
        </Link>
      </Button>
      <div className="text-center mb-8">
        <HTMLBuilderHeaderAnimation />
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          HTML Page Builder
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Use your HTML knowledge to construct a webpage element by element.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side: Puzzle */}
        <div className="flex flex-col gap-8">
            <Progress value={progressPercentage} className="h-2" />
            <Card className="shadow-lg flex-grow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Code className="w-8 h-8 text-primary" />
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
                <div className="border rounded-md p-4 bg-background/50 min-h-[200px] prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground">
                    {elements.length === 0 ? (
                        <p className="text-muted-foreground italic">Your webpage preview will appear here...</p>
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: elements.join('') }} />
                    )}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
