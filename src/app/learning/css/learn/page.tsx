'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { characters } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Swords, ChevronLeft, Trophy, Loader2 } from 'lucide-react';

const learningSteps = [
  {
    title: 'Introduction to CSS',
    content: 'CSS (Cascading Style Sheets) is the language we use to style an HTML document. It describes how HTML elements should be displayed on screen, paper, or in other media. CSS saves a lot of work. It can control the layout of multiple web pages all at once.',
    code: `body {
  background-color: lightblue;
}

h1 {
  color: white;
  text-align: center;
}`,
  },
  {
    title: 'CSS Syntax',
    content: 'A CSS rule consists of a selector and a declaration block. The selector points to the HTML element you want to style. The declaration block contains one or more declarations separated by semicolons. Each declaration includes a CSS property name and a value, separated by a colon.',
    code: `p {
  color: red; /* property: value */
  text-align: center;
}`,
  },
  {
    title: 'CSS Selectors',
    content: 'CSS selectors are used to "find" (or select) the HTML elements you want to style. We can divide CSS selectors into five categories: Simple selectors (select elements based on name, id, class), Combinator selectors, Pseudo-class selectors, Pseudo-elements selectors, and Attribute selectors.',
    code: `/* Element selector */
p { ... }

/* ID selector */
#myId { ... }

/* Class selector */
.myClass { ... }`,
  },
  {
    title: 'How To Add CSS',
    content: 'There are three ways of inserting a style sheet: External CSS (using a <link> element in the <head>), Internal CSS (using a <style> element in the <head>), and Inline CSS (using the style attribute inside HTML elements).',
    code: `/* External */
<link rel="stylesheet" href="mystyle.css">

/* Internal */
<style>
body { background-color: linen; }
</style>

/* Inline */
<h1 style="color:blue;">A Blue Heading</h1>`,
  },
  {
    title: 'The Box Model',
    content: 'All HTML elements can be considered as boxes. In CSS, the term "box model" is used when talking about design and layout. It is a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content.',
    code: `.box {
  width: 300px;
  border: 15px solid green;
  padding: 50px;
  margin: 20px;
}`,
  },
  {
    title: 'CSS Flexbox',
    content: 'The Flexbox Layout Module makes it easier to design flexible responsive layout structure without using float or positioning. A flex container expands items to fill available free space or shrinks them to prevent overflow.',
    code: `.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
  },
];

const invitations = [
  { step: 2, characterId: 'captain-america' }, // After step 2 (33%)
  { step: 4, characterId: 'thor' },   // After step 4 (66%)
  { step: 6, characterId: 'doctor-strange' },     // After step 6 (100%)
];

const LOCAL_STORAGE_KEY = 'marvelmind-css-progress';

export default function CSSLearningPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showInvitation, setShowInvitation] = useState(false);
  const [activeInvitation, setActiveInvitation] = useState<(typeof invitations[0]) | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedStep = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedStep) {
      const step = parseInt(savedStep, 10);
      if (step >= learningSteps.length) {
        setIsCompleted(true);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } else {
        setCurrentStep(step);
      }
    }
    setIsLoading(false);
  }, []);

  const advanceStep = (step: number) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, step.toString());
    if (step >= learningSteps.length) {
      setIsCompleted(true);
    } else {
      setCurrentStep(step);
    }
  }

  const handleNextStep = () => {
    const nextStepIndex = currentStep + 1;
    const invitation = invitations.find((inv) => inv.step === nextStepIndex);

    if (invitation && nextStepIndex <= learningSteps.length) {
      setActiveInvitation(invitation);
      setShowInvitation(true);
    } else {
      advanceStep(nextStepIndex);
    }
  };

  const handleInvitationResponse = (accepted: boolean) => {
    const nextStepIndex = currentStep + 1;
    if (accepted) {
        localStorage.setItem(LOCAL_STORAGE_KEY, nextStepIndex.toString());
    } else {
        setShowInvitation(false);
        setActiveInvitation(null);
        advanceStep(nextStepIndex);
    }
  };
  
  const progressPercentage = isLoading ? 0 : ((currentStep + 1) / learningSteps.length) * 100;
  
  if (isLoading) {
    return (
        <div className="container py-12 flex items-center justify-center h-[calc(100vh-150px)]">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
    );
  }

  if (isCompleted) {
    return (
        <div className="container py-12 flex items-center justify-center">
            <Card className="max-w-2xl text-center animate-in fade-in zoom-in-95">
                <CardHeader>
                    <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
                    <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
                        Mission Complete!
                    </CardTitle>
                    <CardDescription className="mt-4 text-lg text-muted-foreground">
                        Congratulations! You have completed the CSS learning path.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild size="lg">
                        <Link href="/learning">Back to Missions</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  const stepData = learningSteps[currentStep];
  const character = activeInvitation ? characters.find((c) => c.id === activeInvitation.characterId) : null;
  const characterImage = character ? PlaceHolderImages.find((p) => p.id === character.image) : null;

  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/learning/css">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to CSS Hub
        </Link>
      </Button>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          CSS Learning Path
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Master the fundamentals of CSS, one step at a time.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Progress value={progressPercentage} className="mb-8 h-3" />
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-headline">
              Step {currentStep + 1}: {stepData.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">{stepData.content}</p>
            {stepData.code && (
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code className="font-code text-sm text-muted-foreground">{stepData.code}</code>
              </pre>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleNextStep} size="lg" className="w-full">
              {currentStep < learningSteps.length - 1 ? 'Continue' : 'Finish Learning'}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {character && (
        <Dialog open={showInvitation} onOpenChange={(isOpen) => !isOpen && handleInvitationResponse(false)}>
          <DialogContent>
            <DialogHeader>
              <div className="flex flex-col items-center text-center">
                {characterImage && (
                  <Image
                    src={characterImage.imageUrl}
                    alt={character.name}
                    width={150}
                    height={150}
                    className="rounded-full border-4 border-primary mb-4"
                    data-ai-hint={characterImage.imageHint}
                  />
                )}
                <DialogTitle className="text-3xl font-headline">Challenge from {character.name}!</DialogTitle>
                <DialogDescription className="text-lg mt-2">
                  You've made great progress! {character.name} challenges you to a {character.difficulty} level quiz.
                </DialogDescription>
              </div>
            </DialogHeader>
            <DialogFooter className="sm:justify-center pt-4 gap-2">
              <Button onClick={() => handleInvitationResponse(false)} variant="outline">Continue Learning</Button>
              <Button asChild onClick={() => handleInvitationResponse(true)}>
                <Link href={`/battle/${character.id}?topics=CSS&redirect=/learning/css/learn`}>
                  <Swords className="mr-2 h-4 w-4" />
                  Accept Challenge
                </Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
