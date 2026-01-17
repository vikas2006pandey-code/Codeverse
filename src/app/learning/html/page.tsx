import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, Swords, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HTMLHubPage() {
  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/learning">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Missions
        </Link>
      </Button>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          HTML Mission Hub
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose to learn the fundamentals or test your skills in game challenges.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link href="/learning/html/learn" className="group block">
          <Card className="h-full bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20">
            <CardHeader className="items-center text-center p-8">
              <div className="p-4 bg-primary/10 rounded-full border-2 border-primary/30 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-12 h-12 text-primary" />
              </div>
              <CardTitle className="mt-4 text-2xl font-bold font-headline">Start Learning</CardTitle>
              <CardDescription className="mt-2">Study core concepts of HTML with guided lessons.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/learning/html/games" className="group block">
          <Card className="h-full bg-card/80 backdrop-blur-sm border-accent/20 hover:border-accent transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-accent/20">
            <CardHeader className="items-center text-center p-8">
              <div className="p-4 bg-accent/10 rounded-full border-2 border-accent/30 group-hover:bg-accent/20 transition-colors">
                <Swords className="w-12 h-12 text-accent" />
              </div>
              <CardTitle className="mt-4 text-2xl font-bold font-headline">Play Games</CardTitle>
              <CardDescription className="mt-2">Test your HTML skills in a variety of challenges.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
