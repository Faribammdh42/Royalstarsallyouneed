'use client';

import * as React from 'react';
import { MainNav } from '@/components/main-nav';
import { MobileNav } from '@/components/mobile-nav';
import { MusicPlayer } from '@/components/music-player';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { AppProvider } from '@/context/app-context';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Or a loader
  }

  const playerHeight = 'h-20';
  const mobileNavHeight = 'h-20';

  return (
    <AppProvider>
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block fixed top-0 left-0 h-full w-72 border-r bg-background/50 z-20">
            <MainNav />
          </aside>

          {/* Main Content */}
          <main className="flex-1 md:ml-72 pb-40">
            {children}
          </main>
        </div>

        {/* Mobile Bottom Nav */}
        <nav className={cn(
          "md:hidden fixed bottom-0 left-0 right-0 z-40 border-t bg-background/90 backdrop-blur-sm",
          playerHeight
        )}>
          <MobileNav />
        </nav>
        
        {/* Music Player */}
        <div className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          !isMobile && 'md:left-72',
          isMobile && `bottom-20`, // Position above mobile nav
        )}>
           <MusicPlayer className={playerHeight} />
        </div>
      </div>
    </AppProvider>
  );
}
