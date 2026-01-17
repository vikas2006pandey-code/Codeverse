import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Trophy, BarChart, ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const competeOptions = [
  {
    title: 'Weekly Leagues',
    description: 'Compete in weekly leagues to earn rewards and prove your skills.',
    icon: <Trophy className="w-12 h-12 text-primary" />,
    href: '#',
    disabled: true,
  },
  {
    title: 'Leaderboard',
    description: 'See how you stack up against other learners in the global leaderboard.',
    icon: <BarChart className="w-12 h-12 text-accent" />,
    href: '/leaderboard',
    disabled: false,
  },
];

export default function CompetePage() {
  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          Compete
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Challenge yourself and climb the ranks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {competeOptions.map((option) => (
          option.disabled ? (
            <div key={option.title} className="group block">
                <Card className="h-full flex flex-col justify-center items-center text-center p-6 transition-all duration-300 ease-in-out bg-card/50 opacity-50 cursor-not-allowed">
                    <CardHeader>
                        {option.icon}
                        <CardTitle className="mt-4 text-2xl font-bold font-headline">{option.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{option.description}</p>
                        <Badge variant="outline" className="mt-4 border-yellow-500/50 text-yellow-300">Coming Soon</Badge>
                    </CardContent>
                </Card>
            </div>
          ) : (
          <Link key={option.title} href={option.href} className="group block">
            <Card className="h-full flex flex-col justify-center items-center text-center p-6 transition-all duration-300 ease-in-out group-hover:border-primary group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20 bg-card/50">
              <CardHeader>
                {option.icon}
                <CardTitle className="mt-4 text-2xl font-bold font-headline">{option.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{option.description}</p>
              </CardContent>
            </Card>
          </Link>
          )
        ))}
      </div>
    </div>
  );
}
