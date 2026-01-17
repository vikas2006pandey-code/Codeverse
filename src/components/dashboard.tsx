import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Swords, BookOpen } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Dashboard() {
  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Background elements for theme */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)_/_0.2),rgba(255,255,255,0))]"></div>
        {/* Faded character images in background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] blur-sm">
            <Image 
                src={PlaceHolderImages.find(p => p.id === 'captain-america')?.imageUrl || ''}
                alt="background hero"
                width={800}
                height={800}
                className="absolute left-0 top-1/4 object-contain"
                data-ai-hint="captain america shield"
            />
            <Image 
                src={PlaceHolderImages.find(p => p.id === 'iron-man')?.imageUrl || ''}
                alt="background hero"
                width={800}
                height={800}
                className="absolute right-0 bottom-1/4 object-contain"
                data-ai-hint="iron suit"
            />
        </div>
      </div>

      <div className="container py-12 animate-in fade-in-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl font-headline neon-glow-primary">
            Welcome, Agent
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
            Your mission dashboard is ready. Choose your next challenge or continue your training.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/learning" className="group block">
            <Card className="h-full bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20">
              <CardHeader className="items-center text-center p-8">
                <div className="p-4 bg-primary/10 rounded-full border-2 border-primary/30 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="mt-4 text-2xl font-bold font-headline">Learn a Subject</CardTitle>
                 <CardDescription className="mt-2">Study core concepts of HTML, CSS, and JavaScript with guided lessons.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/challenges" className="group block">
            <Card className="h-full bg-card/80 backdrop-blur-sm border-accent/20 hover:border-accent transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-accent/20">
               <CardHeader className="items-center text-center p-8">
                <div className="p-4 bg-accent/10 rounded-full border-2 border-accent/30 group-hover:bg-accent/20 transition-colors">
                  <Swords className="w-12 h-12 text-accent" />
                </div>
                <CardTitle className="mt-4 text-2xl font-bold font-headline">Challenge Arena</CardTitle>
                <CardDescription className="mt-2">Test your skills in 1v1 battles, bug hunts, typing challenges, and more.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
