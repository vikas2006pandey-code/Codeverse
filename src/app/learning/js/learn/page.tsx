'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { characters } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Swords, ChevronLeft, Trophy, Loader2 } from 'lucide-react';

const learningSteps = [
  {
    title: 'Introduction to JavaScript',
    content: 'JavaScript is the world\'s most popular programming language. It is the programming language of the Web. JavaScript can update and change both HTML and CSS and is used to control web page behavior.',
    code: `// Example of changing HTML content
document.getElementById("demo").innerHTML = "Hello JavaScript";`,
  },
  {
    title: 'JavaScript Variables',
    content: 'Variables are containers for storing data values. In JavaScript, you can use `var`, `let`, and `const` to declare variables. `let` and `const` were introduced in ES6 and have block scope.',
    code: `let x = 5;
let y = 6;
let z = x + y;
console.log(z); // 11`,
  },
  {
    title: 'JavaScript Data Types',
    content: 'JavaScript has several data types: String, Number, Bigint, Boolean, Undefined, Null, Symbol, and Object. The Object data type can contain collections of data.',
    code: `let length = 16; // Number
let lastName = "Johnson"; // String
const x = {firstName:"John", lastName:"Doe"}; // Object`,
  },
  {
    title: 'JavaScript Functions',
    content: 'A JavaScript function is a block of code designed to perform a particular task. A JavaScript function is executed when "something" invokes it (calls it).',
    code: `function myFunction(p1, p2) {
  return p1 * p2;   // The function returns the product of p1 and p2
}

let result = myFunction(4, 3); // result will be 12`,
  },
  {
    title: 'JavaScript Events',
    content: 'HTML events are "things" that happen to HTML elements. When JavaScript is used in HTML pages, JavaScript can "react" on these events. An HTML event can be something the browser does, or something a user does.',
    code: `<button onclick="document.getElementById('demo').innerHTML = Date()">The time is?</button>`,
  },
  {
    title: 'JavaScript and the DOM',
    content: 'The HTML DOM (Document Object Model) is the standard for how to get, change, add, or delete HTML elements. When a web page is loaded, the browser creates a DOM of the page.',
    code: `// Find an element by its ID
const element = document.getElementById("intro");

// Change the content of the element
element.innerHTML = "New Heading";`,
  },
];

const invitations: { step: number, characterId: string }[] = [
    { step: 3, characterId: 'spider-man' },
    { step: 6, characterId: 'iron-man' },
];

const LOCAL_STORAGE_KEY = 'marvelmind-js-progress';

export default function JSLearningPage() {
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
              Congratulations! You have completed the JavaScript learning path.
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
        <Link href="/learning/js">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to JS Hub
        </Link>
      </Button>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          JavaScript Learning Path
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Master the fundamentals of JavaScript, one step at a time.
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
                <Link href={`/battle/${character.id}?topics=JavaScript&redirect=/learning/js/learn`}>
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
