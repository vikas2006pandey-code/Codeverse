import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Swords, Bug, Keyboard, Code, ChevronLeft, MousePointer, Rocket, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const jsGames = [
  { name: '1v1 Quiz Battle', description: 'Go head-to-head with a Marvel AI on JavaScript topics.', icon: <Swords className="w-12 h-12 text-primary" />, href: '/opponents?topic=JavaScript' },
  { name: 'Bug Hunt', description: 'Fix syntax errors and logical flaws in JavaScript code.', icon: <Bug className="w-12 h-12 text-chart-5" />, href: '/learning/js/bug-hunt' },
  { name: 'DOM Destroyer', description: 'Use JavaScript to manipulate the DOM and complete objectives.', icon: <MousePointer className="w-12 h-12 text-chart-2" />, href: '/learning/js/dom-destroyer' },
  { name: 'Function Factory', description: 'Build JavaScript functions to meet production requirements.', icon: <Code className="w-12 h-12 text-chart-1" />, href: '/learning/js/function-factory' },
  { name: 'Typing Challenge', description: 'Test your JavaScript typing speed and accuracy.', icon: <Keyboard className="w-12 h-12 text-accent" />, href: '/learning/js/typing-challenge' },
  { name: 'Variable Voyage', description: 'Use JavaScript variables to command your starship.', icon: <Rocket className="w-12 h-12 text-chart-4" />, href: '/learning/js/variable-voyage' },
];

export default function JSGamesPage() {
  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/learning/js">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to JS Hub
        </Link>
      </Button>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          JavaScript Challenge Arena
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose your game mode and prove your JavaScript skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jsGames.sort((a,b) => a.name.localeCompare(b.name)).map((mode) => (
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
