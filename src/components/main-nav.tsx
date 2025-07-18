'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Home, Mic, Music, Clapperboard, MessageSquare, User, Upload, Settings, LogOut, Globe, Gift, Video, Link as LinkIcon, Wand2 } from 'lucide-react';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/sing', label: 'Sing', icon: Mic },
  { href: '/moment', label: 'Moments', icon: Clapperboard },
  { href: '/chats', label: 'Chats', icon: MessageSquare },
  { href: '/gifts', label: 'Gifts', icon: Gift },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-background/80 justify-between p-4 w-full">
      <div>
        <div className="p-4 mb-4 flex items-center justify-center">
           <h1 className="text-2xl font-bold text-primary">RoyalStars</h1>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: isActive ? 'default' : 'ghost', size: 'lg' }),
                  'justify-start gap-3',
                  isActive && 'font-bold'
                )}
              >
                <item.icon className={cn("size-5", isActive ? '' : 'text-muted-foreground')} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="outline" className="justify-start gap-3">
            <LinkIcon className="size-5 text-muted-foreground" />
            Connect to Google
        </Button>
         <Link
            href="/profile"
            className={cn(
                buttonVariants({ variant: 'ghost', size: 'lg'}),
                'justify-start gap-3'
            )}
            >
            <User className="size-5 text-muted-foreground" />
            Profile
         </Link>
         <Link
            href="/"
            className={cn(
                buttonVariants({ variant: 'ghost', size: 'lg'}),
                'justify-start gap-3 text-red-500 hover:text-red-500 hover:bg-red-500/10'
            )}
            >
            <LogOut className="size-5" />
            Logout
         </Link>
        <div className="flex items-center gap-3 p-2 rounded-lg">
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40" alt="User" />
            <AvatarFallback>RS</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">User</span>
            <span className="text-sm text-muted-foreground">user@email.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
