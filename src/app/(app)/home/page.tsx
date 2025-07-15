
'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { TrackCard } from '@/components/track-card';
import { useAppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { Music, Wand2 } from 'lucide-react';
import Link from 'next/link';

const trendingTracks = [
  {
    title: 'Shallow',
    artist: 'Lady Gaga',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'pop music cover',
    audioUrl: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
  },
  {
    title: 'Perfect',
    artist: 'Ed Sheeran',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'acoustic guitar',
    audioUrl: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
  },
  {
    title: 'گل یاس',
    artist: 'داریوش',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'persian music',
    audioUrl: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
  },
  {
    title: 'Neon Dreams',
    artist: 'Synthwave Surfer',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'synthwave sunset',
    audioUrl: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
  },
];

export default function HomePage() {
  const { playTrack } = useAppContext();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-purple-900/50 to-background text-white">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Discover"
          description="Trending tracks and community creations"
        >
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white font-bold">
                <Link href="/sing">
                    <Wand2 className="mr-2"/>
                    Create with AI
                </Link>
            </Button>
        </PageHeader>
        
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Music className="text-purple-400" />
                    Popular Tracks
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {trendingTracks.map((track, index) => (
                        <TrackCard
                            key={index}
                            title={track.title}
                            artist={track.artist}
                            imageUrl={track.imageUrl}
                            dataAiHint={track.dataAiHint}
                            onPlay={() => playTrack(track)}
                        />
                    ))}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
