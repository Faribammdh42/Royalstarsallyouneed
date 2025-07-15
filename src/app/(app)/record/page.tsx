
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Mic, Video, Square, Play, Pause, Volume2, Sparkles, Camera, Music, Save } from 'lucide-react';

export default function RecordPage() {
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordingTime, setRecordingTime] = React.useState(0);
  const [selectedEffect, setSelectedEffect] = React.useState('none');
  const [volume, setVolume] = React.useState([80]);

  const audioEffects = [
    { id: 'none', name: 'No Effect', icon: '🎤' },
    { id: 'reverb', name: 'Reverb', icon: '🌊' },
    { id: 'autotune', name: 'Autotune', icon: '🤖' },
    { id: 'chorus', name: 'Chorus', icon: '🎵' },
    { id: 'bass', name: 'Bass', icon: '🔊' }
  ];

  const videoFilters = [
    { id: 'normal', name: 'Normal', color: 'bg-gray-100' },
    { id: 'vintage', name: 'Vintage', color: 'bg-amber-100' },
    { id: 'cool', name: 'Cool', color: 'bg-blue-100' },
    { id: 'warm', name: 'Warm', color: 'bg-orange-100' },
    { id: 'dramatic', name: 'Dramatic', color: 'bg-purple-100' }
  ];

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden flex flex-col">
      {/* Camera View */}
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <div className="text-white/50 text-6xl">
          <Camera />
        </div>
      </div>
      
      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <Badge variant="secondary" className="bg-black/50 text-white">
          {formatTime(recordingTime)}
        </Badge>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
            <Sparkles className="w-4 h-4 mr-1" /> Effects
          </Button>
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
            <Music className="w-4 h-4 mr-1" /> Choose Song
          </Button>
        </div>
      </div>
      
      {/* Lyrics Display */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl text-center p-4 z-10">
        <p className="text-white text-3xl font-bold" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>
          When the night has come...
        </p>
      </div>

      {/* Recording Timeline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full max-w-4xl p-4 z-10">
          <div className="h-2 bg-white/20 rounded-full relative">
            <div className="h-2 bg-accent rounded-full" style={{width: `${(recordingTime / 60) * 100}%`}}></div>
            <div className="absolute top-1/2 -translate-y-1/2 h-4 w-1 bg-white" style={{left: `50%`}} />
          </div>
      </div>


      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 mt-auto">
        <Card className="bg-black/30 backdrop-blur-md border-white/20">
          <CardContent className="p-4 flex items-center justify-center gap-6">
            <Button
              size="lg"
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              <Video className="w-6 h-6" />
            </Button>

            <Button
              size="lg"
              className={`w-20 h-20 rounded-full ${
                isRecording 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white pl-1" />
              )}
            </Button>

            <Button
              size="lg"
              variant="default"
              className="text-white bg-green-600 hover:bg-green-700"
            >
              <Save className="w-6 h-6" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
