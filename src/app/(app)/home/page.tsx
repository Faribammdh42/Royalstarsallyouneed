
'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Music, Users, Gift } from 'lucide-react';

const featuredRoom = {
  roomName: 'کلبه صمیمیت',
  songName: 'دوست داشتم | Dooset Dashtam',
  participants: [
    { name: 'Sara', imageUrl: 'https://placehold.co/40x40.png', dataAiHint: 'woman portrait' },
    { name: 'Ali', imageUrl: 'https://placehold.co/40x40.png', dataAiHint: 'man portrait' },
    { name: 'Nazanin', imageUrl: 'https://placehold.co/40x40.png', dataAiHint: 'woman singing' },
    { name: 'Reza', imageUrl: 'https://placehold.co/40x40.png', dataAiHint: 'man smiling' },
  ],
  viewerCount: 10,
};

const liveRooms = [
  { name: 'Pop Lovers', members: 128, online: 45, type: 'voice', gifts: 234, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'microphone pop' },
  { name: 'Rock & Roll Hall', members: 89, online: 23, type: 'live', gifts: 156, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'electric guitar' },
  { name: 'Hip-Hop Heads', members: 231, online: 67, type: 'voice', gifts: 445, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'dj turntable' },
  { name: 'Farsi Karaoke Night', members: 150, online: 55, type: 'live', gifts: 310, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'persian music' },
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Room */}
      <Card className="mb-8 w-full bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800 text-white shadow-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-full">
                <Mic className="size-5" />
              </div>
              <h2 className="text-xl font-bold">Sing Together</h2>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <Users className="size-4" />
                <span>{featuredRoom.viewerCount}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex -space-x-4">
              {featuredRoom.participants.map((p, i) => (
                <Avatar key={i} className="border-2 border-primary/50">
                  <AvatarImage src={p.imageUrl} data-ai-hint={p.dataAiHint} />
                  <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="font-semibold text-lg">{featuredRoom.roomName}</p>
          </div>

          <div className="pl-4 border-l-4 border-primary/50 mb-6">
            <p className="text-sm">Now Playing:</p>
            <p className="font-bold text-xl">{featuredRoom.songName}</p>
          </div>
          
          <Button size="lg" className="w-full text-lg font-bold bg-white/90 text-purple-700 hover:bg-white">
            Join Room (3s)
          </Button>
        </CardContent>
      </Card>
      
      {/* Live Rooms Section */}
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Live Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveRooms.map(room => (
            <Card key={room.name} className="hover:shadow-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-4 mb-3">
                  <Avatar className="size-12">
                    <AvatarImage src={room.imageUrl} data-ai-hint={room.dataAiHint} />
                    <AvatarFallback>{room.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-bold">{room.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{room.members}</span>
                      <span className="text-green-500">• {room.online} online</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-2">
                    <div className={`flex items-center gap-1 text-sm px-2 py-0.5 rounded-full ${room.type === 'live' ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
                      {room.type === 'live' ? <Mic className="w-3 h-3" /> : <Music className="w-3 h-3" />}
                      <span>{room.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Gift className="w-3 h-3" />
                    <span>{room.gifts}</span>
                  </div>
                </div>
                
                <Button className="w-full">Join</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
