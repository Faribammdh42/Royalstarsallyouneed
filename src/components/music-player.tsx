'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Heart, Loader2, Search } from 'lucide-react';
import { useAppContext } from '@/context/app-context';
import { MusicSearch } from './music-search';

export function MusicPlayer({ className }: { className?: string }) {
  const { activeTrack } = useAppContext();
  const audioRef = React.useRef<HTMLAudioElement>(null);
  
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  React.useEffect(() => {
    if (activeTrack && audioRef.current) {
      setIsReady(false);
      audioRef.current.src = activeTrack.audioUrl;
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.error("Audio play failed", e);
        setIsPlaying(false);
      });
    }
  }, [activeTrack]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current?.duration) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };
  
  const onCanPlay = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
        setIsReady(true);
      }
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current && isReady) {
      const newTime = (value[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };
  
  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!activeTrack) {
    return (
        <div className={cn("bg-background/80 backdrop-blur-md border-t p-2", className)}>
            <div className="flex items-center justify-center h-full w-full gap-4 px-4 text-muted-foreground">
                Select a track to play
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                    <Search className="size-5" />
                </Button>
            </div>
            {isSearchOpen && <MusicSearch />}
        </div>
    );
  }

  return (
    <div className={cn("bg-background/80 backdrop-blur-md border-t p-2", className)}>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onCanPlay={onCanPlay}
        onLoadedData={onCanPlay}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="flex items-center justify-between h-full w-full gap-4 px-4">
        {/* Track Info */}
        <div className="flex items-center gap-4 w-1/4 min-w-0">
          <Image
            src={activeTrack.imageUrl}
            alt="Album Art"
            width={56}
            height={56}
            className="rounded-md"
            data-ai-hint={activeTrack.dataAiHint}
          />
          <div className="hidden lg:block min-w-0">
            <p className="font-bold truncate">{activeTrack.title}</p>
            <p className="text-sm text-muted-foreground truncate">{activeTrack.artist}</p>
          </div>
          <Button variant="ghost" size="icon" className="hidden lg:inline-flex ml-auto">
            <Heart className="size-5 text-primary" />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-grow max-w-xl">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" disabled={!isReady}>
              <SkipBack className="size-5" />
            </Button>
            <Button size="icon" className="size-12 rounded-full" onClick={handlePlayPause} disabled={!isReady}>
              {!isReady ? <Loader2 className="size-6 animate-spin" /> : isPlaying ? <Pause className="size-6" /> : <Play className="size-6 pl-1" />}
            </Button>
            <Button variant="ghost" size="icon" disabled={!isReady}>
              <SkipForward className="size-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground w-10 text-center">{formatTime(currentTime)}</span>
            <Slider
              value={[progress || 0]}
              max={100}
              step={1}
              onValueChange={handleSliderChange}
              disabled={!isReady}
            />
            <span className="text-xs text-muted-foreground w-10 text-center">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Other Controls */}
        <div className="flex items-center justify-end gap-2 w-1/4">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="size-5" />
          </Button>
          <Volume2 className="hidden md:block size-5 text-muted-foreground" />
          <Slider defaultValue={[70]} max={100} step={1} className="hidden md:block w-24" 
            onValueChange={(value) => {
              if (audioRef.current) audioRef.current.volume = value[0] / 100;
            }}
          />
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Maximize2 className="size-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
      {isSearchOpen && <MusicSearch />}
    </div>
  );
}
