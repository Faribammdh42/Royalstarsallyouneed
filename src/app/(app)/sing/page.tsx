
'use client';

import * as React from 'react';
import { Search, CalendarDays, Music, Star, Users, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const quickActions = [
    { label: 'Activity Center', icon: Star, color: 'text-orange-400',bgColor: 'bg-orange-100' },
    { label: 'My Songs', icon: Music, color: 'text-pink-500', bgColor: 'bg-pink-100' },
    { label: 'Artists', icon: Users, color: 'text-purple-500', bgColor: 'bg-purple-100' },
    { label: 'Collab', icon: Users, color: 'text-green-500', bgColor: 'bg-green-100' },
];

const forYouSongs = [
    { title: 'khali', artist: 'Ebi', recordings: 459, imageUrl: 'https://placehold.co/80x80.png', dataAiHint: 'male singer', hasPoints: true },
    { title: 'narooo', artist: 'Reza Sadeghi', recordings: 83, imageUrl: 'https://placehold.co/80x80.png', dataAiHint: 'man portrait' },
    { title: 'Hezaro Yek Shab', artist: 'Ebi', recordings: 124, imageUrl: 'https://placehold.co/80x80.png', dataAiHint: 'classic singer' },
];

export default function SingPage() {
  const [activeTab, setActiveTab] = React.useState('Sing');

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-4">
        {/* Header Search */}
        <header className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <Input placeholder="Hot Search: All Of Me" className="pl-10 rounded-full bg-muted border-0" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
                <CalendarDays className="size-6 text-primary" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Button>
        </header>
        
        {/* Tabs */}
        <div className="flex items-center gap-6 mb-4">
            {['Sing', 'Songbook', 'Learn to Sing'].map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-lg font-bold transition-colors ${activeTab === tab ? 'text-primary' : 'text-muted-foreground'}`}
                >
                    {tab}
                    {activeTab === tab && <div className="h-1 w-5 bg-accent mt-1 rounded-full mx-auto" />}
                </button>
            ))}
        </div>

        {/* Weekly Challenge Banner */}
        <Card className="mb-4 rounded-2xl overflow-hidden border-0">
            <CardContent className="p-0 relative">
                <Image src="https://placehold.co/600x250.png" data-ai-hint="game challenge" alt="Weekly Challenge" width={600} height={250} className="w-full h-auto" />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4">
                    <h2 className="text-white text-2xl font-extrabold">Weekly Challenge</h2>
                    <p className="text-white font-semibold">Daily Rewards</p>
                </div>
            </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 mb-6">
            {quickActions.map(action => (
                <div key={action.label} className="flex flex-col items-center gap-2 text-center">
                    <div className={`relative size-14 flex items-center justify-center rounded-2xl ${action.bgColor}`}>
                        <action.icon className={`size-8 ${action.color}`} />
                        {action.label === 'Activity Center' && <div className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{action.label}</p>
                </div>
            ))}
        </div>

        {/* For You Section */}
        <div>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">For You</h3>
                <Button variant="link" className="text-muted-foreground">More &gt;</Button>
            </div>
            <div className="space-y-4">
                {forYouSongs.map(song => (
                    <div key={song.title} className="flex items-center gap-4">
                        <Image src={song.imageUrl} data-ai-hint={song.dataAiHint} alt={song.title} width={64} height={64} className="rounded-lg w-16 h-16 object-cover" />
                        <div className="flex-1">
                            <h4 className="font-bold">{song.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                {song.hasPoints && <Badge className="bg-yellow-100 text-yellow-600">Points</Badge>}
                                <span>{song.artist}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Music className="size-3" />
                                <span>{song.recordings} recordings</span>
                            </div>
                        </div>
                        <Button className="rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 px-6">Sing</Button>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
