'use client';

import { characters } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, ChevronLeft, ArrowRight, Code, Paintbrush, Cpu } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const topicsList = [
  { id: 'HTML', name: 'Structure', description: 'The backbone of the web, focusing on elements and tags.', icon: <Code className="h-8 w-8 text-primary" /> },
  { id: 'CSS', name: 'Style', description: 'The art of visual presentation, from colors to layouts.', icon: <Paintbrush className="h-8 w-8 text-accent" /> },
  { id: 'JavaScript', name: 'Logic', description: 'The power of interactivity and dynamic content.', icon: <Cpu className="h-8 w-8 text-chart-4" /> }
];

export default function OpponentSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fixedTopic = searchParams.get('topic');
  
  const [step, setStep] = useState<'select-topics' | 'select-opponent'>(fixedTopic ? 'select-opponent' : 'select-topics');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(fixedTopic ? [fixedTopic] : []);

  useEffect(() => {
    if (fixedTopic) {
      setSelectedTopics([fixedTopic]);
      setStep('select-opponent');
    } else {
      // If user navigates back and forth, reset to topic selection if no topic is fixed
      if (step === 'select-opponent') {
        // do nothing, let them go back
      } else {
         setStep('select-topics');
         setSelectedTopics([]);
      }
    }
  }, [fixedTopic, step]);

  const handleTopicChange = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };
  
  const getTopicNames = (ids: string[]) => {
    return ids.map(id => topicsList.find(t => t.id === id)?.name || id);
  };

  if (step === 'select-topics' && !fixedTopic) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <div className="w-full max-w-lg">
          <Button variant="ghost" onClick={() => router.back()} className="mb-8">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
              Define the Battlefield
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Select the disciplines for your trial by combat.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Mission Disciplines</CardTitle>
              <CardDescription>Choose at least one discipline to engage an opponent.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topicsList.map(topic => (
                <div key={topic.id}
                     className="flex items-center space-x-4 rounded-md border p-4 has-[:checked]:bg-primary/10 has-[:checked]:border-primary/50"
                >
                  <Checkbox
                    id={topic.id}
                    checked={selectedTopics.includes(topic.id)}
                    onCheckedChange={() => handleTopicChange(topic.id)}
                  />
                  <label
                    htmlFor={topic.id}
                    className="flex flex-1 items-center gap-4 cursor-pointer"
                  >
                    {topic.icon}
                    <div className="grid gap-1.5">
                      <span className="font-medium leading-none">
                        {topic.name}
                      </span>
                      <p className="text-sm text-muted-foreground">{topic.description}</p>
                    </div>
                  </label>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={selectedTopics.length === 0}
                onClick={() => setStep('select-opponent')}
              >
                Choose Your Opponent <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  // select-opponent step
  return (
    <div className="container py-12">
      <Button variant="ghost" onClick={() => fixedTopic ? router.back() : setStep('select-topics')} className="mb-8">
        <ChevronLeft className="mr-2 h-4 w-4" />
        {fixedTopic ? 'Back' : 'Back to Disciplines'}
      </Button>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          Choose Your Quiz Opponent
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Select a Marvel character to challenge you in a {getTopicNames(selectedTopics).join(', ')} quiz battle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {characters.map((character) => {
          const placeholder = PlaceHolderImages.find(p => p.id === character.image);
          const isLocked = character.id === 'thanos';
          const topicsQuery = `?topics=${selectedTopics.join(',')}`;

          if (isLocked) {
            return (
              <div key={character.id} className="group block">
                <Card className="h-full flex flex-col transition-all duration-300 ease-in-out bg-card/50 opacity-60 cursor-not-allowed relative">
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-md z-10">
                      <Lock className="w-16 h-16 text-primary" />
                      <p className="mt-4 font-bold text-xl font-headline">LOCKED</p>
                      <p className="text-sm text-muted-foreground">Defeat other opponents to unlock.</p>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold font-headline">{character.name}</CardTitle>
                    <CardDescription>{character.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-center items-center">
                    {placeholder && (
                       <div className="relative w-full h-80 mb-4 overflow-hidden rounded-md">
                          <Image
                              src={placeholder.imageUrl}
                              alt={character.name}
                              fill
                              className="object-cover rounded-md"
                              data-ai-hint={placeholder.imageHint}
                          />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                       </div>
                    )}
                    <p className="text-center text-muted-foreground italic">&quot;{character.personality}&quot;</p>
                  </CardContent>
                  <CardFooter>
                    <Badge
                      className={
                          `w-full justify-center py-2 text-sm font-semibold 
                          bg-red-500/20 text-red-300 border-red-500/30`
                      }
                      variant="outline">
                      {character.difficulty} AI
                    </Badge>
                  </CardFooter>
                </Card>
              </div>
            );
          }

          return (
            <Link key={character.id} href={`/battle/${character.id}${topicsQuery}`} className="group block">
              <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:border-primary group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20 bg-card/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-headline">{character.name}</CardTitle>
                  <CardDescription>{character.description}</CardDescription>
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
                  <p className="text-center text-muted-foreground italic">&quot;{character.personality}&quot;</p>
                </CardContent>
                <CardFooter>
                  <Badge
                    className={
                        `w-full justify-center py-2 text-sm font-semibold 
                        ${character.difficulty === 'Beginner' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                          character.difficulty === 'Advanced' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                          'bg-red-500/20 text-red-300 border-red-500/30'}`
                    }
                    variant="outline">
                    {character.difficulty} AI
                  </Badge>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
