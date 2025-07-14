'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Compass, MessageSquareText, User, Music } from 'lucide-react';
import { Badge } from './ui/badge';

// Custom SVG for Moment Icon
const MomentIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"></circle>
    </svg>
);


const CreateIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
    <path d="M19 10v1a7 7 0 0 1-14 0v-1h2v1a5 5 0 0 0 10 0v-1z"/>
    <path d="M5 18v-3h14v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"/>
  </svg>
);


const MeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <circle cx="12" cy="8" r="4" fillOpacity="0.5"/>
        <path d="M12 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" fillOpacity="0.5"/>
        <path d="M15.5 13.92c.63-.09 1.25-.21 1.84-.37-.8-.6-1.74-1.05-2.77-1.29a7.97 7.97 0 0 1-2.07-.02c-1.12.23-2.1.75-2.89 1.4.61.16 1.25.3 1.91.43A5.99 5.99 0 0 1 12 13c1.23 0 2.38-.37 3.29-.98.07.33.15.66.21.98z" />
    </svg>
);


const navItems = [
  { href: '/home', label: 'Room', icon: Home },
  { href: '/moment', label: 'Moment', icon: MomentIcon },
  { href: '/record', label: 'Create', icon: CreateIcon, isCentral: true },
  { href: '/chats', label: 'Chat', icon: MessageSquareText, notification: 99 },
  { href: '/profile', label: 'Me', icon: MeIcon },
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
              isActive && 'text-accent'
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
