'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Heart } from 'lucide-react';

export function MusicPlayer({ className }: { className?: string }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(30);

  return (
    <div className={cn("bg-background/80 backdrop-blur-md border-t p-2", className)}>
      <div className="flex items-center justify-between h-full w-full gap-4 px-4">
        {/* Track Info */}
        <div className="flex items-center gap-4 w-1/4">
          <Image
            src="https://placehold.co/64x64"
            alt="Album Art"
            width={56}
            height={56}
            className="rounded-md"
            data-ai-hint="album cover"
          />
          <div className="hidden lg:block">
            <p className="font-bold truncate">Starlight Serenade</p>
            <p className="text-sm text-muted-foreground truncate">Cosmic Echoes</p>
          </div>
          <Button variant="ghost" size="icon" className="hidden lg:inline-flex">
            <Heart className="size-5 text-primary" />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-grow max-w-xl">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <SkipBack className="size-5" />
            </Button>
            <Button size="icon" className="size-12 rounded-full" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="size-6" /> : <Play className="size-6 pl-1" />}
            </Button>
            <Button variant="ghost" size="icon">
              <SkipForward className="size-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground">1:23</span>
            <Slider
              defaultValue={[progress]}
              max={100}
              step={1}
              onValueChange={(value) => setProgress(value[0])}
            />
            <span className="text-xs text-muted-foreground">4:56</span>
          </div>
        </div>

        {/* Volume & Other Controls */}
        <div className="flex items-center justify-end gap-2 w-1/4">
          <Volume2 className="hidden md:block size-5 text-muted-foreground" />
          <Slider defaultValue={[70]} max={100} step={1} className="hidden md:block w-24" />
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Maximize2 className="size-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
}
