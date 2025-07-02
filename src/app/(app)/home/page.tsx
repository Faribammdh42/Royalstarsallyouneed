import { PageHeader } from '@/components/page-header';
import { TrackCard } from '@/components/track-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const featuredTracks = [
  { title: "Neon Dream", artist: "Synthwave Surfer", imageUrl: "https://placehold.co/300x300", dataAiHint: "synthwave album" },
  { title: "Midnight City", artist: "M83", imageUrl: "https://placehold.co/300x300", dataAiHint: "city night" },
  { title: "Future Funk", artist: "Yung Bae", imageUrl: "https://placehold.co/300x300", dataAiHint: "abstract vibrant" },
  { title: "Galactic Groove", artist: "Starship Collective", imageUrl: "https://placehold.co/300x300", dataAiHint: "galaxy stars" },
  { title: "Pink Haze", artist: "Vaporwave Vibes", imageUrl: "https://placehold.co/300x300", dataAiHint: "pink smoke" },
  { title: "80s Sunset", artist: "Retro Runner", imageUrl: "https://placehold.co/300x300", dataAiHint: "retro sunset" },
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Discover Music" description="Find new tracks, artists, and genres to explore.">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search tracks, artists..." className="pl-10" />
        </div>
      </PageHeader>

      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="featured">Featured Tracks</TabsTrigger>
          <TabsTrigger value="new">New Releases</TabsTrigger>
          <TabsTrigger value="ai">AI Generated</TabsTrigger>
        </TabsList>
        <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {featuredTracks.map(track => (
                    <TrackCard key={track.title} {...track} />
                ))}
            </div>
        </TabsContent>
        <TabsContent value="new" className="mt-6 text-center text-muted-foreground">
          <p>New releases coming soon!</p>
        </TabsContent>
        <TabsContent value="ai" className="mt-6 text-center text-muted-foreground">
          <p>AI generated content will appear here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
