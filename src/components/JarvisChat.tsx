
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// This would be the actual server action calling the Genkit flow
// import { getJarvisResponse } from '@/app/chat/actions';

type Message = {
  sender: 'user' | 'jarvis';
  text: string;
  quickReplies?: string[];
};

const JarvisChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'jarvis',
      text: 'Greetings. I am J.A.R.V.I.S. How can I assist you with your current mission?',
      quickReplies: ['Explain this concept', 'Give me a hint'],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim()) return;

    const userMessage: Message = { sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    // In a real implementation, you would call your Genkit flow here
    // const response = await getJarvisResponse({ gameContext: '...', userMessage: text });
    setTimeout(() => {
      const aiResponse: Message = {
        sender: 'jarvis',
        text: `Thinking... Based on your fight with Captain America, let's break down CSS Flexbox. What part is confusing you?`,
        quickReplies: ['justify-content', 'align-items', 'flex-direction'],
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={() => setIsOpen(!isOpen)} size="icon" className="w-16 h-16 rounded-full shadow-lg">
          {isOpen ? <X /> : <Bot />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-full max-w-sm h-[60vh] flex flex-col shadow-2xl animate-in fade-in slide-in-from-bottom-4">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
                <AvatarFallback>J</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle className="font-headline">J.A.R.V.I.S.</CardTitle>
                <p className="text-sm text-green-400 flex items-center">
                    <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Online
                </p>
            </div>
          </CardHeader>
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <CardContent className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={cn('flex items-end gap-2', msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                  {msg.sender === 'jarvis' && <Avatar className="h-6 w-6"><AvatarFallback>J</AvatarFallback></Avatar>}
                  <div className={cn('max-w-[80%] rounded-lg px-3 py-2 text-sm', msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                    {msg.text}
                     {msg.sender === 'jarvis' && msg.quickReplies && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {msg.quickReplies.map(reply => (
                                <Button key={reply} size="sm" variant="outline" onClick={() => handleSend(reply)}>
                                    {reply}
                                </Button>
                            ))}
                        </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-end gap-2 justify-start">
                    <Avatar className="h-6 w-6"><AvatarFallback>J</AvatarFallback></Avatar>
                    <div className="bg-muted rounded-lg px-3 py-2">
                        <div className="flex items-center gap-1">
                            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </div>
              )}
            </CardContent>
          </ScrollArea>
          <CardFooter className="pt-4 border-t">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Ask for a hint..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button onClick={() => handleSend()} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default JarvisChat;
