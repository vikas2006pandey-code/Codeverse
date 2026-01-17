import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, LogIn } from 'lucide-react';

export default function GetStartedPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)] py-12">
      <Card className="w-full max-w-2xl text-center animate-in fade-in zoom-in-95">
        <CardHeader>
          <Rocket className="mx-auto h-16 w-16 text-primary" />
          <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
            Your Journey Begins Now
          </CardTitle>
          <CardDescription className="mt-4 text-lg text-muted-foreground">
            You're about to enter the MarvelMind universe, where learning is an epic adventure.
            Create an account to start your training, or log in to continue your mission.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/register">
              <Rocket className="mr-2" />
              Create Account
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/login">
              <LogIn className="mr-2" />
              Login to Your Account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
