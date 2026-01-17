import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Cpu, Paintbrush, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const bugHunts = [
  {
    name: 'HTML Bug Hunt',
    description: 'Find and fix common errors in broken HTML code snippets.',
    icon: <Code className="w-12 h-12 text-primary" />,
    href: '/learning/html/bug-hunt',
  },
  {
    name: 'CSS Bug Hunt',
    description: 'Debug a broken stylesheet and see your fixes in a live preview.',
    icon: <Paintbrush className="w-12 h-12 text-accent" />,
    href: '/learning/css/bug-hunt',
  },
  {
    name: 'JS Bug Hunt',
    description: 'Fix syntax errors and logical flaws in JavaScript code.',
    icon: <Cpu className="w-12 h-12 text-chart-4" />,
    href: '/learning/js/bug-hunt',
  },
];

export default function BugHuntsPage() {
  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/challenges">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Challenges
        </Link>
      </Button>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          Bug Hunt
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose a language to start debugging.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {bugHunts.map((hunt) => (
          <Link key={hunt.name} href={hunt.href} className="group block">
            <Card className="h-full flex flex-col justify-center items-center text-center p-6 transition-all duration-300 ease-in-out group-hover:border-primary group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20 bg-card/50">
              <CardHeader>
                {hunt.icon}
                <CardTitle className="mt-4 text-2xl font-bold font-headline">{hunt.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{hunt.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
