'use client';

import * as React from 'react';
import { Mic, Music, Square, Play, Pause, Save, Upload, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Mock data - in a real app, this would come from a backend
const song = {
  title: 'Shape of You',
  artist: 'Ed Sheeran',
  lyrics: [
    { time: 0, text: "The club isn't the best place to find a lover" },
    { time: 3, text: "So the bar is where I go" },
    { time: 6, text: "Me and my friends at the table doing shots" },
    { time: 9, text: "Drinking fast and then we talk slow" },
    { time: 12, text: "Come over and start up a conversation with just me" },
    { time: 15, text: "And trust me I'll give it a chance now" },
    { time: 18, text: "Take my hand, stop, put Van the Man on the jukebox" },
    { time: 21, text: "And then we start to dance, and now I'm singing like" },
  ],
  instrumentalUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder
};

const audioEffects = [
    { id: 'none', name: 'Original' },
    { id: 'studio', name: 'Studio' },
    { id: 'concert', name: 'Concert Hall' },
    { id: 'echo', name: 'Echo' },
];


// 1. Frontend Components (as React components)

interface MicInputVisualizerProps {
  isRecording: boolean;
}

const MicInputVisualizer: React.FC<MicInputVisualizerProps> = ({ isRecording }) => {
  const [audioLevel, setAudioLevel] = React.useState(0);

  React.useEffect(() => {
    let animationFrameId: number;
    if (isRecording) {
      const updateLevel = () => {
        setAudioLevel(Math.random() * 100);
        animationFrameId = requestAnimationFrame(updateLevel);
      };
      updateLevel();
    } else {
      setAudioLevel(0);
    }
    if (animationFrameId) {
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [isRecording]);

  return (
    <Card className="bg-black/30 border-white/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-center h-24">
          <div className="flex items-end gap-1 h-20">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="w-2 bg-gradient-to-t from-green-400 to-blue-500 rounded-t transition-all duration-100"
                style={{ height: `${isRecording ? Math.random() * 100 : 5}%` }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface LyricLine {
  time: number;
  text: string;
}

interface LyricsSyncViewerProps {
  lyrics: LyricLine[];
  currentTime: number;
}

const LyricsSyncViewer: React.FC<LyricsSyncViewerProps> = ({ lyrics, currentTime }) => {
    const currentLineIndex = lyrics.findIndex((line, i) => {
        const nextLine = lyrics[i + 1];
        return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
    });

    return (
        <Card className="mb-4 bg-black/30 border-white/20 h-48 flex items-center justify-center">
            <CardContent className="p-6 text-center">
                <div className="space-y-2">
                    {lyrics.map((line, index) => (
                        <p
                            key={index}
                            className={`text-xl transition-all duration-300 ${
                                index === currentLineIndex ? 'text-yellow-300 font-bold scale-110' : 'text-white/60'
                            }`}
                        >
                            {line.text}
                        </p>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

interface RecordControlsProps {
  isRecording: boolean;
  isPlaying: boolean;
  onRecord: () => void;
  onPlayPause: () => void;
  onSave: () => void;
}

const RecordControls: React.FC<RecordControlsProps> = ({ isRecording, onRecord, onPlayPause, isPlaying, onSave }) => (
  <Card className="bg-black/30 border-white/20">
    <CardContent className="p-4">
      <div className="flex items-center justify-center gap-4">
        <Button size="lg" variant="ghost" onClick={onPlayPause} className="text-white">
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </Button>
        <Button
          size="lg"
          className={`w-20 h-20 rounded-full ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          onClick={onRecord}
        >
          {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </Button>
        <Button size="lg" variant="ghost" onClick={onSave} className="text-white">
          <Save className="w-6 h-6" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

interface AIEffectsProps {
  selected: string;
  onSelect: (id: string) => void;
}

const AIEffects: React.FC<AIEffectsProps> = ({ selected, onSelect }) => (
    <Card className="bg-black/30 border-white/20">
        <CardContent className="p-4">
            <h3 className="font-bold mb-3 text-center text-white">AI Audio Effects</h3>
            <div className="grid grid-cols-2 gap-2">
                {audioEffects.map(effect => (
                    <Button
                        key={effect.id}
                        variant={selected === effect.id ? 'secondary' : 'outline'}
                        onClick={() => onSelect(effect.id)}
                        className="border-white/20 text-white"
                    >
                        {effect.name}
                    </Button>
                ))}
            </div>
        </CardContent>
    </Card>
);

interface VoiceEnhancementToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

const VoiceEnhancementToggle: React.FC<VoiceEnhancementToggleProps> = ({ enabled, onToggle }) => (
     <Card className="bg-black/30 border-white/20">
        <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Wand2 className="text-purple-400"/>
                <h3 className="font-bold text-white">AI Voice Enhancement</h3>
            </div>
            <Button size="sm" onClick={onToggle} variant={enabled ? 'secondary' : 'outline'} className="border-white/20 text-white">
                {enabled ? 'Enabled' : 'Disabled'}
            </Button>
        </CardContent>
    </Card>
);


export default function SingPage() {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [selectedEffect, setSelectedEffect] = React.useState('none');
  const [aiEnhancement, setAiEnhancement] = React.useState(false);
  
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const timeUpdate = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('timeupdate', timeUpdate);
    return () => audio.removeEventListener('timeupdate', timeUpdate);
  }, []);

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({ title: 'Recording Started' });
      if(audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      toast({ title: 'Recording Stopped' });
      if(audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSave = () => {
    toast({
      title: 'Uploading Recording...',
      description: 'Your performance is being saved to your profile.',
    });
    // Here you would call the backend API (e.g., using GraphQL mutation)
    // uploadRecording({ variables: { file: ..., userId: ..., songId: ... } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <audio ref={audioRef} src={song.instrumentalUrl} />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold">{song.title}</h1>
          <p className="text-lg text-white/70">{song.artist}</p>
        </header>

        <main className="space-y-4">
          <MicInputVisualizer isRecording={isRecording} />
          <LyricsSyncViewer lyrics={song.lyrics} currentTime={currentTime} />
          
          <div className="grid md:grid-cols-2 gap-4">
            <AIEffects selected={selectedEffect} onSelect={setSelectedEffect} />
            <VoiceEnhancementToggle enabled={aiEnhancement} onToggle={() => setAiEnhancement(!aiEnhancement)} />
          </div>

          <RecordControls 
            isRecording={isRecording}
            isPlaying={isPlaying}
            onRecord={handleRecord}
            onPlayPause={handlePlayPause}
            onSave={handleSave}
          />

          <div className="text-center mt-4">
            <Button variant="outline" className="border-white/20 text-white">
                <Upload className="w-4 h-4 mr-2" />
                Upload / Save
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
