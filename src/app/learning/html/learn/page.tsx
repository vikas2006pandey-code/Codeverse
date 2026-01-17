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
    title: 'Introduction to HTML',
    content: 'HTML stands for HyperText Markup Language. It is the standard markup language for creating Web pages. It describes the structure of a Web page and consists of a series of elements. HTML elements tell the browser how to display the content.',
    code: `<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>

  <h1>My First Heading</h1>
  <p>My first paragraph.</p>

</body>
</html>`,
  },
  {
    title: 'HTML Elements',
    content: 'An HTML element is defined by a start tag, some content, and an end tag. For example, `<h1>My First Heading</h1>`. Some HTML elements have no content (like the `<br>` element). These elements are called empty elements.',
    code: `<p>This is a paragraph.</p>
<br>
<p>This is another paragraph.</p>`,
  },
  {
    title: 'HTML Attributes',
    content: 'All HTML elements can have attributes. Attributes provide additional information about elements. Attributes are always specified in the start tag and usually come in name/value pairs like: name="value". The `href` attribute of `<a>` specifies the URL of the page the link goes to.',
    code: `<a href="https://www.w3schools.com">This is a link</a>`,
  },
    {
    title: 'HTML Headings & Paragraphs',
    content: 'HTML headings are defined with the `<h1>` to `<h6>` tags. `<h1>` defines the most important heading. `<h6>` defines the least important heading. Paragraphs are defined with the `<p>` tag.',
    code: `<h1>Heading 1</h1>
<h2>Heading 2</h2>
<p>This is a paragraph.</p>`,
  },
  {
    title: 'HTML Links & Images',
    content: 'HTML links are defined with the `<a>` tag. The link\'s destination is specified in the `href` attribute. Images are defined with the `<img>` tag. The `src` attribute specifies the path to the image, and the `alt` attribute provides alternate text.',
    code: `<a href="/learning">A link</a>
<img src="https://picsum.photos/seed/1/200/100" alt="placeholder">`
  },
  {
    title: 'HTML Lists',
    content: 'HTML lists allow web developers to group a set of related items. An unordered list starts with the `<ul>` tag. Each list item starts with the `<li>` tag. An ordered list starts with the `<ol>` tag.',
    code: `<ul>
  <li>Coffee</li>
  <li>Tea</li>
</ul>

<ol>
  <li>First</li>
  <li>Second</li>
</ol>`,
  },
    {
    title: 'HTML Tables',
    content: 'HTML tables allow web developers to arrange data into rows and columns. A table is defined with the `<table>` tag. A table row is defined with the `<tr>` tag. A table header is defined with the `<th>` tag, and a table cell (data) is defined with the `<td>` tag.',
    code: `<table>
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
  </tr>
  <tr>
    <td>Peter</td>
    <td>Griffin</td>
  </tr>
</table>`,
  },
  {
    title: 'HTML Forms',
    content: 'An HTML form is used to collect user input. The `<form>` element is a container for different types of input elements, such as: text fields, checkboxes, radio buttons, submit buttons, etc.',
    code: `<form action="/submit-form">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname"><br>
  <input type="submit" value="Submit">
</form>`,
  },
  {
    title: 'Semantic HTML',
    content: 'Semantic elements clearly describe their meaning in a human- and machine-readable way. Elements such as `<header>`, `<footer>`, `<article>`, and `<section>` are considered semantic because they accurately describe the purpose of the element and the type of content that is inside them.',
    code: `<article>
  <h2>What is Semantic HTML?</h2>
  <p>Semantic HTML elements are those that clearly describe their meaning.</p>
</article>`,
  },
];

const invitations = [
  { step: 2, characterId: 'spider-man' }, // After step 2 (22%)
  { step: 5, characterId: 'iron-man' },   // After step 5 (55%)
  { step: 9, characterId: 'thanos' },     // After step 9 (100%)
];

const LOCAL_STORAGE_KEY = 'marvelmind-html-progress';

export default function HTMLLearningPage() {
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
              Congratulations! You have completed the HTML learning path.
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
        <Link href="/learning/html">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to HTML Hub
        </Link>
      </Button>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          HTML Learning Path
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Master the fundamentals of HTML, one step at a time.
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
                <Link href={`/battle/${character.id}?topics=HTML&redirect=/learning/html/learn`}>
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
