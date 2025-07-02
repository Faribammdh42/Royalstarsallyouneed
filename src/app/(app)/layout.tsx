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

  const sidebarWidth = 'w-72';
  const playerHeight = 'h-20';
  const mobileNavHeight = 'h-20';

  return (
    <AppProvider>
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex">
          {/* Desktop Sidebar */}
          <aside className={cn("hidden md:block border-r bg-background/50", sidebarWidth)}>
            <div className="fixed top-0 h-full">
              <MainNav className={sidebarWidth} />
            </div>
          </aside>

          {/* Main Content */}
          <main
            className={cn(
              'flex-1 transition-[margin-left]',
              !isMobile && sidebarWidth,
              'pb-40' // Padding for both player and mobile nav
            )}
          >
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
          !isMobile && `left-0 ${sidebarWidth}`,
          isMobile && `bottom-20`, // Position above mobile nav
        )}>
           <MusicPlayer className={playerHeight} />
        </div>
      </div>
    </AppProvider>
  );
}
