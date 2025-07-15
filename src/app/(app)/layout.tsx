
'use client';

import * as React from 'react';
import { MobileNav } from '@/components/mobile-nav';
import { MusicPlayer } from '@/components/music-player';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { AppProvider } from '@/context/app-context';
import { MainNav } from '@/components/main-nav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Or a loader to prevent hydration mismatch
  }

  const playerHeight = 'h-20';
  const mobileNavHeight = 'h-20';

  if (isMobile) {
    return (
      <AppProvider>
        <div className="min-h-screen bg-background text-foreground">
            {/* Main Content */}
            <main className="flex-1 pb-40">
                {children}
            </main>

            {/* Mobile Bottom Nav */}
            <nav className={cn(
                "fixed bottom-0 left-0 right-0 z-40 border-t bg-background/90 backdrop-blur-sm",
                mobileNavHeight
            )}>
                <MobileNav />
            </nav>
            
            {/* Music Player */}
            <div className={cn(
                "fixed bottom-0 left-0 right-0 z-50",
                `bottom-[${mobileNavHeight}]`,
            )}>
               <MusicPlayer className={playerHeight} />
            </div>
        </div>
      </AppProvider>
    );
  }

  return (
    <AppProvider>
        <div className="min-h-screen bg-background text-foreground">
            <div className="flex">
                <aside className="fixed top-0 left-0 h-full w-64 border-r z-30 bg-background/50 backdrop-blur-sm">
                    <MainNav />
                </aside>
                <main className="flex-1 ml-64 pb-24">
                    {children}
                </main>
            </div>
            
            {/* Music Player */}
            <div className={cn(
                "fixed bottom-0 left-64 right-0 z-50 border-t bg-background/90 backdrop-blur-sm",
            )}>
                <MusicPlayer className={playerHeight} />
            </div>
        </div>
    </AppProvider>
  );
}
