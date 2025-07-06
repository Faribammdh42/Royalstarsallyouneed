'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UploadCloud } from 'lucide-react';
import { useAppContext } from '@/context/app-context';

interface Track {
  id: string;
  title: string;
  artist: string;
  source: 'SoundCloud' | 'Radio Javan';
  audioUrl: string;
  imageUrl: string;
  dataAiHint: string;
}

export function MusicSearch() {
  const { setActiveTrack } = useAppContext();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Track[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setSearchResults([]);
    console.log(`Searching for: ${searchQuery} on SoundCloud and Radio Javan`);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockResults: Track[] = [
      { id: 'sc1', title: `${searchQuery} (SoundCloud)`, artist: 'Artist SC', source: 'SoundCloud', audioUrl: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3', imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'techno music' },
      { id: 'rj1', title: `${searchQuery} (Radio Javan)`, artist: 'Artist RJ', source: 'Radio Javan', audioUrl: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3', imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'persian pop' },
    ];

    setSearchResults(mockResults);
    setIsLoading(false);
  };

  return (
    <div className="p-4 border-t">
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search SoundCloud, Radio Javan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? '...' : <Search className="size-5" />}
        </Button>
      </div>
      
      {searchResults.length > 0 && (
        <div className="flex flex-col gap-2 mb-4">
          {searchResults.map(track => (
            <div key={track.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
              <div>
                <p className="font-semibold">{track.title}</p>
                <p className="text-sm text-muted-foreground">{track.artist} - {track.source}</p>
              </div>
              <Button size="sm" onClick={() => setActiveTrack(track)}>Play</Button>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={() => window.open('https://www.beatport.com', '_blank')}>
          Go to Beatport
        </Button>
        <Button variant="outline" onClick={() => window.open('https://www.youdj.com', '_blank')}>
          Go to YouDJ
        </Button>
      </div>
    </div>
  );
}
