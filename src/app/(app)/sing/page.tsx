
'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2, Music } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TrackCard } from '@/components/track-card';
import { useAppContext } from '@/context/app-context';
import { generateMusic } from '@/ai/flows/generate-music-from-prompt';

export default function SingPage() {
  const { toast } = useToast();
  const { aiTracks, addAiTrack, playTrack } = useAppContext();
  const [prompt, setPrompt] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGenerateMusic = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Prompt is empty',
        description: 'Please enter a description for the music you want to generate.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateMusic({ prompt });
      
      const newTrack = {
        title: prompt.length > 30 ? prompt.substring(0, 27) + '...' : prompt,
        artist: 'AI Generated',
        audioUrl: result.musicDataUri,
        imageUrl: `https://placehold.co/300x300.png`,
        dataAiHint: 'abstract music',
        lyrics: result.lyrics,
      };

      addAiTrack(newTrack);

      toast({
        title: 'Music Generated!',
        description: 'Your new track has been added to the playlist.',
      });
      setPrompt('');

    } catch (error) {
      console.error('Error generating music:', error);
      toast({
        title: 'Generation Failed',
        description: 'Something went wrong while generating the music. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Sing with AI"
        description="Describe the music you want to create and let AI do the rest. Or, choose a song and record your own karaoke version."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="text-primary" />
                AI Music Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="e.g., A sad, slow, acoustic country song about losing a dog..."
                className="min-h-[120px] text-base"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
              />
              <Button
                size="lg"
                className="w-full"
                onClick={handleGenerateMusic}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Music className="mr-2" />
                    Generate
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
                <Music className="text-primary" />
                Your AI Creations
            </h3>
            {aiTracks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aiTracks.map((track, index) => (
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
            ) : (
                <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                    <p>Your generated tracks will appear here.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
