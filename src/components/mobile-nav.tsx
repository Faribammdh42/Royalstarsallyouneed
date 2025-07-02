'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Home, Mic, Music, MessageSquare, User } from 'lucide-react';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/generate', label: 'Generate', icon: Music },
  { href: '/sing', label: 'Sing', icon: Mic, isCentral: true },
  { href: '/chats', label: 'Chats', icon: MessageSquare },
  { href: '/profile', label: 'Profile', icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="h-full grid grid-cols-5 items-center justify-items-center">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        
        if (item.isCentral) {
          return (
            <Link key={item.href} href={item.href} className="-translate-y-6">
              <div className="size-16 rounded-full holo-button flex items-center justify-center shadow-lg shadow-primary/50">
                <item.icon className="size-8 text-white" />
              </div>
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 text-muted-foreground transition-colors",
              isActive && 'text-primary'
            )}
          >
            <item.icon className={cn("size-6", isActive && 'neon-icon-active')} />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
