import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Swords, Bug, Keyboard, Code, BookOpen, ChevronLeft, Palette, Crosshair, LayoutTemplate } from 'lucide-react';
import { Button } from '@/components/ui/button';

const cssGames = [
  { name: '1v1 Quiz Battle', description: 'Go head-to-head with a Marvel AI on CSS topics.', icon: <Swords className="w-12 h-12 text-primary" />, href: '/opponents?topic=CSS' },
  { name: 'Bug Hunt', description: 'Debug a broken stylesheet and see your fixes in a live preview.', icon: <Bug className="w-12 h-12 text-chart-5" />, href: '/learning/css/bug-hunt' },
  { name: 'Color Co-pilot', description: 'Help heroes design their suits by providing correct CSS color codes.', icon: <Palette className="w-12 h-12 text-accent" />, href: '/learning/css/color-copilot' },
  { name: 'Escape Room', description: 'Solve CSS puzzles to style a component and escape.', icon: <Code className="w-12 h-12 text-chart-1" />, href: '/learning/css/escape-room' },
  { name: 'Layout Builder', description: 'Use Flexbox to build and manipulate a layout piece by piece.', icon: <LayoutTemplate className="w-12 h-12 text-chart-4" />, href: '/learning/css/layout-builder' },
  { name: 'Selector Sniper', description: 'Use CSS selectors to target elements and solve the maze.', icon: <Crosshair className="w-12 h-12 text-chart-3" />, href: '/learning/css/selector-sniper' },
  { name: 'Storytelling', description: 'Master the mystic arts of styling with a Marvel sorcerer.', icon: <BookOpen className="w-12 h-12 text-chart-2" />, href: '/learning/css/storytelling' },
  { name: 'Typing Challenge', description: 'Test your CSS typing speed and accuracy.', icon: <Keyboard className="w-12 h-12 text-accent" />, href: '/learning/css/typing-challenge' },
];

export default function CSSGamesPage() {
  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/learning/css">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to CSS Hub
        </Link>
      </Button>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          CSS Challenge Arena
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose your game mode and prove your CSS skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cssGames.sort((a,b) => a.name.localeCompare(b.name)).map((mode) => (
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
