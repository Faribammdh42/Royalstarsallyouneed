
'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2, Music, Mic, Play, Square } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TrackCard } from '@/components/track-card';
import { useAppContext } from '@/context/app-context';
import { generateMusic } from '@/ai/flows/generate-music-from-prompt';
import { Badge } from '@/components/ui/badge';

const musicStyles = ['Sad', 'Happy', 'Rap', 'Dreamy'];

export default function SingPage() {
  const { toast } = useToast();
  const { aiTracks, addAiTrack, playTrack } = useAppContext();
  const [prompt, setPrompt] = React.useState('');
  const [selectedStyle, setSelectedStyle] = React.useState('Sad');
  const [isLoading, setIsLoading] = React.useState(false);
  
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordedAudio, setRecordedAudio] = React.useState<string | null>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioChunksRef = React.useRef<Blob[]>([]);

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
      const result = await generateMusic({ prompt, style: selectedStyle });
      
      const newTrack = {
        title: prompt.length > 30 ? prompt.substring(0, 27) + '...' : prompt,
        artist: `AI Generated (${selectedStyle})`,
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

  const handleStartRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];
        
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setRecordedAudio(audioUrl);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        toast({ title: 'Recording started...' });
      } catch (err) {
        toast({ title: 'Microphone access denied', description: 'Please allow microphone access to record audio.', variant: 'destructive' });
      }
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast({ title: 'Recording stopped.', description: 'Your recording is ready to be played.' });
    }
  };

  const playRecordedAudio = () => {
    if (recordedAudio) {
      const audio = new Audio(recordedAudio);
      audio.play();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Sing with AI"
        description="Describe the music you want to create and let AI do the rest. Or, choose a song and record your own karaoke version."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="text-primary" />
                AI Music Generation
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
               <div className="space-y-2">
                <label className="text-sm font-medium">Select Style</label>
                <div className="flex flex-wrap gap-2">
                  {musicStyles.map((style) => (
                    <Badge
                      key={style}
                      variant={selectedStyle === style ? 'default' : 'secondary'}
                      onClick={() => setSelectedStyle(style)}
                      className="cursor-pointer"
                    >
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>
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
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="text-primary" />
                Karaoke Recording
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex gap-4">
                <Button onClick={handleStartRecording} disabled={isRecording} className="flex-1">
                  <Mic className="mr-2"/> Start Recording
                </Button>
                <Button onClick={handleStopRecording} disabled={!isRecording} className="flex-1">
                  <Square className="mr-2"/> Stop Recording
                </Button>
               </div>
               {recordedAudio && (
                 <Button onClick={playRecordedAudio} variant="outline" className="w-full">
                    <Play className="mr-2" /> Play Recording
                 </Button>
               )}
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
