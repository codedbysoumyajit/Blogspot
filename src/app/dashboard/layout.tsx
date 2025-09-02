import Link from 'next/link';
import { LayoutDashboard, LogOut, Home, PenSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid md:grid-cols-[240px_1fr] gap-8 items-start">
      <aside className="md:sticky top-20">
        <div className="flex flex-col space-y-2 p-4 bg-card rounded-lg shadow-sm">
            <h2 className="px-2 text-lg font-semibold tracking-tight font-headline">Dashboard</h2>
            <nav className="flex flex-col space-y-1">
            <Button variant="ghost" className="justify-start" asChild>
                <Link href="/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Overview
                </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
                <Link href="/dashboard/create">
                <PenSquare className="mr-2 h-4 w-4" />
                New Post
                </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
                <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                View Site
                </Link>
            </Button>
            <Button variant="ghost" className="justify-start text-destructive hover:text-destructive" asChild>
                <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
                </Link>
            </Button>
            </nav>
        </div>
      </aside>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
