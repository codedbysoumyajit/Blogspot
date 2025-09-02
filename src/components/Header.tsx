import Link from 'next/link';
import { Button } from './ui/button';
import { Code, UserCircle } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-primary hover:bg-accent">
            <Code className="h-6 w-6" />
          </Button>
          <span className="text-xl font-bold text-foreground font-headline">DevSpace</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="outline">
            <Link href="/login">
              <UserCircle className="mr-2 h-4 w-4" />
              Admin Login
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
