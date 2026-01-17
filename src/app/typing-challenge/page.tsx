'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronLeft, RefreshCw, Keyboard, Trophy } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CODE_SNIPPETS = {
  JavaScript: [
    `function factorial(num) {
  if (num < 0) return -1;
  else if (num == 0) return 1;
  else {
    return (num * factorial(num - 1));
  }
}`,
    `const greeting = 'Hello, World!';
console.log(greeting);`,
    `const user = { name: 'John Doe', age: 30 };
for (const key in user) {
  console.log(\`\${key}: \${user[key]}\`);
}`,
  ],
  HTML: [
    `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Welcome</h1>
  <p>This is a sample paragraph.</p>
</body>
</html>`,
    `<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>`,
    `<div class="container">
  <img src="image.jpg" alt="An example image">
</div>`,
  ],
  CSS: [
    `body {
  font-family: sans-serif;
  line-height: 1.6;
  background-color: #f4f4f4;
}`,
    `.container {
  max-width: 1100px;
  margin: auto;
  overflow: auto;
  padding: 0 2rem;
}`,
    `button:hover {
  background-color: #333;
  color: #fff;
}`,
  ],
};


type Language = keyof typeof CODE_SNIPPETS;

const TypingChallengeHeaderAnimation = () => (
    <div className="relative h-24 w-full max-w-md mx-auto mb-4 flex items-center justify-center gap-2">
        <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center font-bold animate-[key-press_2s_ease-in-out_infinite]">C</div>
        <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center font-bold animate-[key-press_2s_ease-in-out_infinite]" style={{animationDelay: '0.2s'}}>O</div>
        <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center font-bold animate-[key-press_2s_ease-in-out_infinite]" style={{animationDelay: '0.4s'}}>D</div>
        <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center font-bold animate-[key-press_2s_ease-in-out_infinite]" style={{animationDelay: '0.6s'}}>E</div>
    </div>
);

const TypingChallengePage = () => {
  const [language, setLanguage] = useState<Language>('JavaScript');
  const [snippet, setSnippet] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  
  const totalTyped = useRef(0);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const loadNewSnippet = useCallback(() => {
    const snippets = CODE_SNIPPETS[language];
    const randomIndex = Math.floor(Math.random() * snippets.length);
    setSnippet(snippets[randomIndex]);
    resetState();
  }, [language]);

  useEffect(() => {
    loadNewSnippet();
  }, [language, loadNewSnippet]);
  
  const resetState = () => {
    setUserInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setIsFinished(false);
    setIsStarted(false);
    totalTyped.current = 0;
    if (timerInterval.current) clearInterval(timerInterval.current);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    if (isFinished) return;
    
    setUserInput(value);

    if (!isStarted && value.length > 0) {
      setStartTime(Date.now());
      setIsStarted(true);
    }
    
    if (isStarted) {
        totalTyped.current++;
    }

    if (value.length >= snippet.length) {
      if (value === snippet) {
        setIsFinished(true);
        if (timerInterval.current) clearInterval(timerInterval.current);
      }
    }
  };
  
  useEffect(() => {
    if (isStarted && !isFinished) {
      timerInterval.current = setInterval(() => {
        if (startTime) {
          const elapsedTime = (Date.now() - startTime) / 1000 / 60; // in minutes
          const wordsTyped = userInput.length / 5;
          setWpm(elapsedTime > 0 ? Math.round(wordsTyped / elapsedTime) : 0);
          
          let currentErrors = 0;
          for (let i = 0; i < userInput.length; i++) {
              if (userInput[i] !== snippet[i]) {
                  currentErrors++;
              }
          }
          setErrors(currentErrors);

          if (totalTyped.current > 0) {
              setAccuracy(Math.max(0, ((userInput.length - currentErrors) / userInput.length) * 100));
          }
        }
      }, 500);
    } else if (isFinished && timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    
    return () => {
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, [isStarted, isFinished, startTime, userInput, snippet]);


  const renderSnippet = () => {
    return snippet.split('').map((char, index) => {
      let colorClass = 'text-muted-foreground/50';
      if (index < userInput.length) {
        colorClass = char === userInput[index] ? 'text-foreground' : 'text-destructive';
      }
      return <span key={index} className={cn(colorClass, 'transition-colors duration-100')}>{char}</span>;
    });
  };

  if (isFinished) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Card className="max-w-2xl text-center animate-in fade-in zoom-in-95">
          <CardHeader>
            <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
            <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
              Challenge Complete!
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              You've successfully typed the code snippet. Here are your results.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-around text-center">
              <div>
                <p className="text-3xl font-bold text-primary">{Math.round(wpm)}</p>
                <p className="text-sm text-muted-foreground">WPM</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">{Math.round(accuracy)}%</p>
                <p className="text-sm text-muted-foreground">Accuracy</p>
              </div>
               <div>
                <p className="text-3xl font-bold text-primary">{errors}</p>
                <p className="text-sm text-muted-foreground">Errors</p>
              </div>
            </div>
            <div className="flex gap-4 justify-center pt-4">
              <Button onClick={loadNewSnippet} size="lg">
                <RefreshCw className="mr-2 h-4 w-4" />
                Play Again
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/challenges">Back to Challenges</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/challenges">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Challenges
        </Link>
      </Button>
      <div className="text-center mb-8">
        <TypingChallengeHeaderAnimation />
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          Typing Challenge
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Test your coding speed and accuracy by typing out code snippets against the clock.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2"><Keyboard /> Type the code below</CardTitle>
            <Tabs defaultValue={language} onValueChange={(value) => setLanguage(value as Language)}>
              <TabsList>
                <TabsTrigger value="JavaScript">JavaScript</TabsTrigger>
                <TabsTrigger value="HTML">HTML</TabsTrigger>
                <TabsTrigger value="CSS">CSS</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="font-code text-lg p-6 bg-muted/50 rounded-md border whitespace-pre-wrap select-none">
            {renderSnippet()}
          </div>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="w-full mt-4 p-2 text-lg font-code bg-transparent border-b-2 border-primary focus:outline-none"
            placeholder={isStarted ? '' : 'Start typing here...'}
            autoFocus
            disabled={isFinished}
            spellCheck="false"
            autoComplete="off"
          />
          <div className="flex justify-around mt-6 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{Math.round(wpm)}</p>
              <p className="text-sm text-muted-foreground">WPM</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{Math.round(accuracy)}%</p>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TypingChallengePage;
