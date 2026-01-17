
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MousePointer, Eye, Terminal, Trophy, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

const puzzles = [
  {
    title: 'Target and Destroy',
    description: "An enemy target with the ID `#target` has appeared. Select and remove it from the DOM.",
    hint: 'Use `document.getElementById(...)` to select the element, then call the `.remove()` method on it.',
    initialHtml: `
      <p>Civilian</p>
      <div id="target" class="p-4 bg-destructive/50 border border-destructive rounded-md my-2">Enemy Target</div>
      <p>Civilian</p>
    `,
    solutionCode: "document.getElementById('target').remove();",
    finalHtml: `
      <p>Civilian</p>
      <p>Civilian</p>
    `
  },
  {
    title: 'Purge Corrupted Data',
    description: "All elements with class `.corrupted` are showing bad data. Select them all and change their text to 'Data Purged'.",
    hint: 'Use `document.querySelectorAll(...)` which returns a list. You need to loop over it with `.forEach(...)`.',
    initialHtml: `
      <p class="corrupted p-2 bg-red-900/50 rounded">XXX</p>
      <p class="p-2">Safe Data</p>
      <p class="corrupted p-2 bg-red-900/50 rounded">YYY</p>
    `,
    solutionCode: "document.querySelectorAll('.corrupted').forEach(el => el.textContent = 'Data Purged');",
    finalHtml: `
      <p class="corrupted p-2 bg-green-900/50 rounded">Data Purged</p>
      <p class="p-2">Safe Data</p>
      <p class="corrupted p-2 bg-green-900/50 rounded">Data Purged</p>
    `
  },
  {
    title: 'Reinforce Shields',
    description: 'The base shields are weak. Find all elements with the attribute `data-shield="weak"` and add the class `reinforced` to them.',
    hint: 'Use an attribute selector like `[data-shield="weak"]` and the `.classList.add()` method.',
    initialHtml: `
      <style>.shield { border: 2px dashed hsl(var(--muted-foreground)); margin-top: 4px; height: 40px; } .reinforced { border: 3px solid hsl(var(--primary)); background: hsl(var(--primary)/.1); }</style>
      <div class="shield" data-shield="weak"></div>
      <div class="shield" data-shield="strong" style="border-style: solid;"></div>
      <div class="shield" data-shield="weak"></div>
    `,
    solutionCode: "document.querySelectorAll('[data-shield=\"weak\"]').forEach(el => el.classList.add('reinforced'));",
    finalHtml: `
      <style>.shield { border: 2px dashed hsl(var(--muted-foreground)); margin-top: 4px; height: 40px; } .reinforced { border: 3px solid hsl(var(--primary)); background: hsl(var(--primary)/.1); }</style>
      <div class="shield reinforced" data-shield="weak"></div>
      <div class="shield" data-shield="strong" style="border-style: solid;"></div>
      <div class="shield reinforced" data-shield="weak"></div>
    `
  },
];

const DOMDestroyerHeaderAnimation = () => (
    <div className="relative h-24 w-full max-w-md mx-auto mb-4 flex items-center justify-center">
        <MousePointer className="h-16 w-16 text-primary" />
        <div className="absolute w-6 h-6 bg-destructive/50 rounded animate-[dom-change_2s_ease-in-out_infinite]" style={{ animationDelay: '0s', top: '20%', left: '30%' }}></div>
        <div className="absolute w-6 h-6 bg-muted/50 rounded animate-[dom-change_2s_ease-in-out_infinite]" style={{ animationDelay: '1s', bottom: '20%', right: '30%' }}></div>
    </div>
);

export default function DOMDestroyerPage() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [domState, setDomState] = useState(puzzles[0].initialHtml);

  const handleSubmit = () => {
    const expectedAnswer = puzzles[currentPuzzle].solutionCode.replace(/\s/g, '').replace(/;$/, '');
    const userAnswer = inputValue.replace(/\s/g, '').replace(/;$/, '');

    if (userAnswer === expectedAnswer) {
      setError(null);
      setDomState(puzzles[currentPuzzle].finalHtml);
      
      setTimeout(() => {
        if (currentPuzzle < puzzles.length - 1) {
          const nextIndex = currentPuzzle + 1;
          setCurrentPuzzle(nextIndex);
          setInputValue('');
          setDomState(puzzles[nextIndex].initialHtml);
        } else {
          setCompleted(true);
        }
      }, 2000);
    } else {
      setError(`That command doesn't seem right for this objective. Hint: ${puzzles[currentPuzzle].hint}`);
    }
  };
  
  const handleReset = () => {
      setCurrentPuzzle(0);
      setInputValue('');
      setError(null);
      setCompleted(false);
      setDomState(puzzles[0].initialHtml);
  }

  if (completed) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Card className="max-w-2xl text-center animate-in fade-in zoom-in-95">
          <CardHeader>
            <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
            <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
              DOM Master!
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              You have successfully manipulated the DOM to complete your mission. Your control over the web is impressive!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">You've completed the DOM Destroyer challenge. Great job!</p>
            <div className="flex gap-4 justify-center">
                <Button onClick={handleReset}>Play Again</Button>
                <Button asChild variant="outline">
                    <Link href="/learning/js/games">Back to JS Games</Link>
                </Button>
            </div>
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
        <Link href="/learning/js/games">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to JS Games
        </Link>
      </Button>
      <div className="text-center mb-8">
        <DOMDestroyerHeaderAnimation />
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          DOM Destroyer
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Use your JavaScript skills to manipulate the DOM and complete the objectives.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side: Puzzle */}
        <div className="flex flex-col gap-8">
            <Progress value={progressPercentage} className="h-2" />
            <Card className="shadow-lg flex-grow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <MousePointer className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle className="text-2xl font-headline">{puzzle.title}</CardTitle>
                    <CardDescription className="pt-1">{puzzle.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="document.getElementById('...')"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="font-code min-h-[150px]"
                  />
                  <Button onClick={handleSubmit} className="w-full">Execute Command</Button>
                </div>
              </CardContent>
              {error && (
                <CardFooter>
                  <Alert variant="destructive" className="w-full">
                    <AlertTitle>Command Failed</AlertTitle>
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
                    <CardTitle className="text-2xl font-headline">Live DOM</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md p-4 bg-background/50 min-h-[250px] prose-sm prose-headings:text-foreground prose-p:text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: domState }}
                />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
