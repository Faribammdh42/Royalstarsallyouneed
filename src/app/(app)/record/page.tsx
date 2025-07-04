'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Mic, Video, Square, Play, Pause, Volume2, Sparkles, Camera, Music } from 'lucide-react';

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
    <div className="h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white/50 text-6xl">
            <Camera />
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <Badge variant="secondary" className="bg-black/50 text-white">
          {formatTime(recordingTime)}
        </Badge>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" className="text-white">
            <Sparkles className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-white">
            <Music className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <div className="flex flex-col gap-2">
          {audioEffects.map((effect) => (
            <Button
              key={effect.id}
              size="sm"
              variant={selectedEffect === effect.id ? "default" : "ghost"}
              className={`w-12 h-12 rounded-full ${
                selectedEffect === effect.id 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-black/30 text-white hover:bg-black/50'
              }`}
              onClick={() => setSelectedEffect(effect.id)}
            >
              <span className="text-lg">{effect.icon}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <div className="flex flex-col gap-2">
          {videoFilters.map((filter) => (
            <div
              key={filter.id}
              className={`w-12 h-12 rounded-full ${filter.color} border-2 border-white/30 cursor-pointer hover:border-white/60 transition-all`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <Card className="bg-black/30 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <Volume2 className="w-5 h-5 text-white" />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-white text-sm w-8">{volume[0]}</span>
            </div>

            <div className="flex items-center justify-center gap-6">
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
                  <Square className="w-8 h-8 text-white" />
                ) : (
                  <Mic className="w-8 h-8 text-white" />
                )}
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                {isRecording ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </Button>
            </div>

            {selectedEffect !== 'none' && (
              <div className="mt-4 text-center">
                <Badge className="bg-purple-600 text-white">
                  {audioEffects.find(e => e.id === selectedEffect)?.name}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
