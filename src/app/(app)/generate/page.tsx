'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateMusic, GenerateMusicOutput } from '@/ai/flows/generate-music-from-prompt';
import { Loader2, Music4, Wand2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function GeneratePage() {
  const { toast } = useToast();
  const [prompt, setPrompt] = React.useState('');
  const [generationResult, setGenerationResult] = React.useState<GenerateMusicOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: 'Prompt is empty',
        description: 'Please enter a prompt to generate music.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setGenerationResult(null);
    try {
      const result = await generateMusic({ prompt });
      setGenerationResult(result);
      toast({
        title: 'Music Generated!',
        description: 'Your track is ready to be played.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Generation Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="AI Music Generation"
        description="Describe the music you want to create with a simple prompt."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="text-primary" />
              <span>Create Your Sound</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., 'A funky synth-pop track with a groovy bassline, inspired by the 80s'"
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Music
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="flex flex-col">
           <h2 className="text-xl font-bold mb-4 font-headline flex items-center gap-2"><Music4 className="text-primary"/> Generated Track</h2>
            <Card className="shadow-lg flex-grow">
                <CardContent className="flex items-center justify-center h-full p-6">
                {isLoading ? (
                    <div className="flex flex-col items-center gap-4 text-muted-foreground w-full">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ) : generationResult ? (
                    <div className="w-full">
                        <p className="text-lg font-semibold text-center mb-4">Your track is ready!</p>
                        <audio controls src={generationResult.musicDataUri} className="w-full">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground">
                        <p>Your generated music will appear here.</p>
                    </div>
                )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
