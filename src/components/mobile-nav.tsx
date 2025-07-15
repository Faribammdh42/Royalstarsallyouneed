
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Clapperboard, MessageSquareText, User } from 'lucide-react';
import { Badge } from './ui/badge';


const SingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
    <path d="M19 10v1a7 7 0 0 1-14 0v-1h2v1a5 5 0 0 0 10 0v-1z"/>
    <path d="M5 18v-3h14v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"/>
  </svg>
);


const navItems = [
  { href: '/home', label: 'Room', icon: Home },
  { href: '/moment', label: 'Moment', icon: Clapperboard },
  { href: '/sing', label: 'Sing', icon: SingIcon, isCentral: true },
  { href: '/chats', label: 'Chat', icon: MessageSquareText, notification: 99 },
  { href: '/profile', label: 'Me', icon: User },
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
              <div className="size-16 rounded-full holo-button flex items-center justify-center shadow-lg shadow-accent/50">
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
              "relative flex flex-col items-center gap-1 text-muted-foreground transition-colors w-full h-full justify-center",
              isActive ? 'text-accent' : 'text-gray-400'
            )}
          >
            <item.icon className={cn("size-6", isActive && 'neon-icon-active')} />
            <span className="text-xs font-medium">{item.label}</span>
            {item.notification && (
                <Badge className="absolute top-2 right-4 bg-accent text-white rounded-full text-[10px] px-1.5 h-5 flex items-center justify-center">
                    {item.notification > 99 ? '99+' : item.notification}
                </Badge>
            )}
            {item.href === '/moment' && !isActive && (
                 <div className="absolute top-3 right-7 w-2 h-2 bg-accent rounded-full"></div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
