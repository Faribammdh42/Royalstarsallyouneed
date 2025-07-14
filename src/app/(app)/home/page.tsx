'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Music, Users, BarChart2, X, Plus } from 'lucide-react';

const featuredRoom = {
  roomName: 'کلبه صمیمیت',
  songName: 'Dooset Dashtam | دوست داشتم',
  participants: [
    { name: 'Sara', imageUrl: 'https://placehold.co/40x40.png', dataAiHint: 'woman portrait' },
    { name: 'Ali', imageUrl: 'https://placehold.co/40x40.png', dataAiHint: 'man portrait' },
    { name: 'Nazanin', imageUrl: 'https://placehold.co/40x40.png', dataAiHint: 'woman singing' },
    { name: 'Reza', imageUrl: 'https://placehold.co/40x40.png', dataAiHint: 'man smiling' },
  ],
  viewerCount: 10,
};

const giftIcons = [
  { imageUrl: 'https://placehold.co/64x64.png', dataAiHint: 'gift box', count: 100 },
  { imageUrl: 'https://placehold.co/64x64.png', dataAiHint: 'diamond', count: 20 },
  { imageUrl: 'https://placehold.co/64x64.png', dataAiHint: 'gold coin' },
  { imageUrl: 'https://placehold.co/64x64.png', dataAiHint: 'trophy' },
]

const userTags = ['iran', 'Aquarius'];
const friendIcons = [
  'https://placehold.co/24x24.png',
  'https://placehold.co/24x24.png',
  'https://placehold.co/24x24.png',
  'https://placehold.co/24x24.png',
]

const stats = [
    {value: 421, label: 'Followers'},
    {value: 287, label: 'Following'},
    {value: 208, label: 'Rank'},
    {value: 949, label: 'Gifts'},
]

export default function RoomPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-purple-800 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        
        {/* Sing Together Card */}
        <Card className="mb-4 bg-primary/80 backdrop-blur-sm border-0 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-black/20 rounded-full">
                  <Mic className="size-5 text-white" />
                </div>
                <h2 className="font-bold">Sing Together</h2>
              </div>
              <Button variant="ghost" size="icon" className="text-white">
                <X className="size-5" />
              </Button>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="flex justify-between items-center mb-3">
                <div className="flex -space-x-3">
                    {featuredRoom.participants.map((p, i) => (
                        <Avatar key={i} className="border-2 border-white/50">
                        <AvatarImage src={p.imageUrl} data-ai-hint={p.dataAiHint} />
                        <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    ))}
                </div>
                <div className="flex items-center gap-1 text-xs">
                    <BarChart2 className="size-4" />
                    <span>{featuredRoom.viewerCount}</span>
                </div>
            </div>
            <p className="font-semibold text-lg mb-2 text-right">{featuredRoom.roomName}</p>
            <div className="flex items-center gap-2 mb-4 p-2 bg-black/20 rounded-lg">
                <Music className="size-5 text-accent"/>
                <p className="font-bold">{featuredRoom.songName}</p>
            </div>
            <Button size="lg" className="w-full text-lg font-bold bg-white/90 text-primary hover:bg-white rounded-full">
                Join Room (3s)
            </Button>
          </CardContent>
        </Card>

        {/* RoyalStar Branding & Gifts */}
        <div className="text-center my-8 relative">
            <h1 className="text-6xl font-extrabold tracking-tighter text-white/50 opacity-50">RoyalStar</h1>
            <p className="text-sm text-white/70 -mt-2">all you need from music</p>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-end gap-4">
                {giftIcons.map((gift, i) => (
                    <div key={i} className="relative">
                        <img src={gift.imageUrl} alt="Gift" className="size-16" data-ai-hint={gift.dataAiHint} />
                        {gift.count && <div className="absolute -bottom-1 -right-1 text-xs bg-green-500 text-white rounded-full px-1.5 py-0.5">{gift.count}</div>}
                    </div>
                ))}
            </div>
        </div>

        {/* User Tags and Friendship */}
        <div className="flex items-center justify-center gap-2 mb-6">
            {userTags.map(tag => (
                 <div key={tag} className="bg-black/30 text-white/80 text-sm px-3 py-1 rounded-full">{tag}</div>
            ))}
            <div className="bg-black/30 text-white/80 text-sm px-3 py-1 rounded-full flex items-center justify-center size-8">
                <Plus className="size-4"/>
            </div>
            <div className="flex items-center gap-2 bg-black/30 rounded-full p-1 pr-3">
                <div className="flex -space-x-2">
                    {friendIcons.map((icon, i) => <Avatar key={i} className="size-5"><AvatarImage src={icon} /></Avatar>)}
                </div>
                <span className="text-sm">Friendship</span>
            </div>
        </div>

        {/* Stats */}
        <Card className="bg-card/90 backdrop-blur-sm border-0 rounded-2xl p-4">
             <div className="grid grid-cols-4 gap-2 text-center text-foreground">
                {stats.map(stat => (
                    <div key={stat.label}>
                        <p className="text-xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                ))}
            </div>
        </Card>

        {/* Family Ranking */}
        <Card className="mt-4 bg-pink-100/10 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="size-10 border-2 border-yellow-400">
                        <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="royal crest" />
                    </Avatar>
                    <div>
                        <h3 className="font-bold text-white flex items-center gap-1">
                            <span className="bg-green-500 text-white text-xs px-1 rounded-sm">3</span>
                            <span>🦅 ROYAL⭐STAR 🕊️</span>
                        </h3>
                        <p className="text-xs text-white/70">Family Rankings: No.83</p>
                    </div>
                </div>
                <Button size="icon" className="rounded-full bg-accent hover:bg-accent/80 size-10">
                    <Plus className="size-6 text-white"/>
                </Button>
            </div>
        </Card>

      </div>
    </div>
  );
}
