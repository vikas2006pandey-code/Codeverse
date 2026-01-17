'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Cpu, Paintbrush } from 'lucide-react';
import Link from 'next/link';

const subjects = [
  {
    id: 'html',
    name: 'HTML',
    description: 'The backbone of the web. Start your coding journey here.',
    icon: <Code className="w-12 h-12 text-primary" />,
    href: '/learning/html'
  },
  {
    id: 'css',
    name: 'CSS',
    description: 'Style your web pages and bring them to life with design.',
    icon: <Paintbrush className="w-12 h-12 text-accent" />,
    href: '/learning/css'
  },
  {
    id: 'js',
    name: 'JavaScript',
    description: 'Add interactivity and logic to your web applications.',
    icon: <Cpu className="w-12 h-12 text-chart-4" />,
    href: '/learning/js'
  },
];

export default function LearningPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
          Choose your Mission
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Select a subject to start your training.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map((subject) => (
          <Link key={subject.id} href={subject.href} className="group block">
            <Card className="h-full flex flex-col justify-center items-center text-center p-6 transition-all duration-300 ease-in-out group-hover:border-primary group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20 bg-card/50">
              <CardHeader>
                {subject.icon}
                <CardTitle className="mt-4 text-2xl font-bold font-headline">{subject.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{subject.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
