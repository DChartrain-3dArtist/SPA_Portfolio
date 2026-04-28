
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/language-context';
import { cn } from '@/lib/utils';

type ChatbotAction = {
  type: 'navigate';
  path: string;
} | undefined;

type Message = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  action?: ChatbotAction;
};

export function Chatbot({ show }: { show: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCtaBubble, setShowCtaBubble] = useState(false);
  const [ctaBubbleDismissed, setCtaBubbleDismissed] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { language } = useLanguage();

  useEffect(() => {
    if (show && !ctaBubbleDismissed && !isOpen) {
      const timer = setTimeout(() => {
        setShowCtaBubble(true);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setShowCtaBubble(false);
    }
  }, [show, ctaBubbleDismissed, isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
        const welcomeMessage = language === 'fr' 
            ? "Bienvenue. Je suis AURIA (Assistant Utilitaire de Recherche et d’Information par Intelligence Artificielle), créée pour vous guider à travers le portfolio de Donovan. Posez-moi une question sur ses compétences, un projet spécifique, ou demandez-moi comment le contacter."
            : "Welcome. I am AURIA (AI Utility for Research and Information), created to guide you through Donovan's portfolio. Ask me a question about his skills, a specific project, or how to contact him.";
      setMessages([
        { id: 0, role: 'assistant', text: welcomeMessage }
      ]);
    }
  }, [isOpen, messages.length, language]);
  
  useEffect(() => {
    if (isOpen && scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div');
      if (viewport) {
        setTimeout(() => {
          viewport.scrollTop = viewport.scrollHeight;
        }, 100);
      }
    }
  }, [messages, isOpen]);
  
  const handleDismissCtaBubble = () => {
    setShowCtaBubble(false);
    setCtaBubbleDismissed(true);
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowCtaBubble(false);
    setCtaBubbleDismissed(true);
  };

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage: Message = { id: Date.now(), role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Appel au backend
      const apiResponse = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue, language }),
      });

      if (!apiResponse.ok) {
        throw new Error(`Chatbot request failed with status ${apiResponse.status}`);
      }

      const response = (await apiResponse.json()) as { text: string; action?: ChatbotAction };
      
      const assistantMessage: Message = { 
        id: Date.now() + 1, 
        role: 'assistant', 
        text: response.text, 
        action: response.action
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch {
      const errorMessageText = language === 'fr'
          ? 'Désolé, une erreur inattendue est survenue. Veuillez réessayer plus tard.'
          : 'Sorry, an unexpected error occurred. Please try again later.';
      
      const errorMessage: Message = { id: Date.now() + 1, role: 'assistant', text: errorMessageText };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, language]);


  const handleActionClick = (action: ChatbotAction) => {
    if (action?.path) {
      router.push(action.path);
      setIsOpen(false);
    }
  };

  const ctaText = language === 'fr' ? "Allons-y" : "Let's go";
  const placeholderText = language === 'fr' ? "Posez votre question..." : "Ask your question...";
  const ctaBubbleText = language === 'fr' 
    ? "Bonjour ! Je suis AURIA, l'assistante IA de Donovan. Une question sur un projet ou une compétence ? Je peux trouver la réponse pour vous !"
    : "Hello! I'm AURIA, Donovan's AI assistant. Have a question about a project or a skill? I can find the answer for you!";

  return (
    <div className={cn(!show && "hidden")}>
      <AnimatePresence>
        {showCtaBubble && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-40 right-6 z-40 lg:bottom-24"
          >
            <div className="relative max-w-xs">
              <Card className="shadow-xl p-3">
                <p className="text-sm">{ctaBubbleText}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 bg-secondary text-secondary-foreground rounded-full"
                  onClick={handleDismissCtaBubble}
                >
                  <X className="h-4 w-4" />
                </Button>
              </Card>
              <div className="absolute bottom-[-10px] right-6 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-card border-r-[10px] border-r-transparent"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-24 right-6 z-50 lg:bottom-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5, type: 'spring' }}
        >
          <Button
            size="lg"
            className="rounded-full w-16 h-16 shadow-lg [&_svg]:size-9"
            onClick={handleOpenChat}
            aria-label="Ouvrir le chatbot"
          >
            <Bot />
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 right-6 z-50 lg:bottom-24"
          >
            <Card className="w-[350px] h-[500px] shadow-2xl flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <CardTitle className="text-lg font-headline flex items-center gap-2">
                  <Bot /> AURIA
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X size={20} />
                </Button>
              </CardHeader>
              <CardContent className="p-0 flex-grow overflow-hidden">
                 <ScrollArea className="h-full" ref={scrollAreaRef}>
                   <div className="p-4 space-y-4">
                    {messages.map((message) => {
                      const hasAction = !!(message.action && message.action.path);
                      return (
                      <div key={message.id} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                        {message.role === 'assistant' && (
                          <Avatar className="w-8 h-8">
                            <AvatarFallback><Bot size={20} /></AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`max-w-[80%] rounded-lg px-3 py-2 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                           {hasAction && (
                            <Button
                              variant="secondary"
                              size="sm"
                              className="mt-2 w-full"
                              onClick={() => handleActionClick(message.action)}
                            >
                              {ctaText} <ArrowRight className="ml-2" />
                            </Button>
                          )}
                        </div>
                      </div>
                    )})}
                    {isLoading && (
                       <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback><Bot size={20} /></AvatarFallback>
                          </Avatar>
                          <div className="bg-muted rounded-lg px-3 py-2">
                            <div className="flex items-center gap-1.5">
                               <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse" style={{animationDelay: '0s'}}></span>
                               <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></span>
                               <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></span>
                            </div>
                          </div>
                        </div>
                    )}
                    </div>
                </ScrollArea>
              </CardContent>
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={placeholderText}
                    autoComplete="off"
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()}>
                    <Send size={20} />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

    
