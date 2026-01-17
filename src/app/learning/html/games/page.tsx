import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Swords, Bug, Keyboard, Code, BookOpen, ChevronLeft, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';

const htmlGames = [
  { name: '1v1 Quiz Battle', description: 'Go head-to-head with a Marvel AI on HTML topics.', icon: <Swords className="w-12 h-12 text-primary" />, href: '/opponents?topic=HTML' },
  { name: 'Escape Room', description: 'Solve HTML puzzles to build a webpage and find your way out.', icon: <Code className="w-12 h-12 text-chart-1" />, href: '/learning/html/escape-room' },
  { name: 'Storytelling', description: 'Team up with a Marvel hero to learn HTML through an interactive story.', icon: <BookOpen className="w-12 h-12 text-chart-2" />, href: '/learning/html/storytelling' },
  { name: 'Typing Challenge', description: 'Test your HTML typing speed and accuracy.', icon: <Keyboard className="w-12 h-12 text-accent" />, href: '/learning/html/typing-challenge' },
  { name: 'Bug Hunt', description: 'Find and fix errors in broken HTML code.', icon: <Bug className="w-12 h-12 text-chart-5" />, href: '/learning/html/bug-hunt' },
  { name: 'Form Builder', description: 'Construct an HTML form element by element.', icon: <ClipboardList className="w-12 h-12 text-chart-3" />, href: '/learning/html/form-builder' },
];

export default function HTMLGamesPage() {
  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/learning/html">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to HTML Hub
        </Link>
      </Button>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          HTML Challenge Arena
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose your game mode and prove your HTML skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {htmlGames.sort((a,b) => a.name.localeCompare(b.name)).map((mode) => (
          <Link key={mode.name} href={mode.href} className="group block">
            <Card className="h-full flex flex-col justify-between text-center p-6 transition-all duration-300 ease-in-out group-hover:border-primary group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20 bg-card/50">
              <CardHeader className="items-center">
                  {mode.icon}
                  <CardTitle className="mt-4 text-2xl font-bold font-headline">{mode.name}</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground">{mode.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
