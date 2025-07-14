'use client';

import * as React from 'react';
import { Search, Calendar, Users, Music, Gamepad2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const topRooms = [
  { name: 'My Room', imageUrl: '', dataAiHint: 'home icon', isIcon: true },
  { name: 'EHSAN...', type: 'KARAOKE', status: 'Mutual', imageUrl: 'https://placehold.co/80x80.png', dataAiHint: 'man singing' },
  { name: 'omar', type: 'LIVE', status: 'Hot', imageUrl: 'https://placehold.co/80x80.png', dataAiHint: 'dj mixing' },
  { name: 'JA...', type: 'KARAOKE', status: 'Mutual', imageUrl: 'https://placehold.co/80x80.png', dataAiHint: 'rockstar guitar' },
];

const actionCards = [
  { label: 'Family', count: '41K', color: 'from-orange-300 to-yellow-300', icon: '👨‍👩‍👧‍👦' },
  { label: 'Sing', count: '51.7K', color: 'from-pink-300 to-fuchsia-300', icon: '🎤' },
  { label: 'Chat', count: '42.9K', color: 'from-yellow-200 to-orange-200', icon: '💬' },
  { label: 'Play Ludo', count: '33.5K', color: 'from-blue-300 to-cyan-300', icon: '🎲' },
  { label: 'Play Billiards', count: '28.2K', color: 'from-green-300 to-teal-300', icon: '🎱' },
  { label: 'Play Games', count: '51.8K', color: 'from-sky-300 to-indigo-300', icon: '🎮' },
];

const recommendedContent = [
    { type: 'Live', location: 'Saudi Arabia', userImage: 'https://placehold.co/400x600.png', dataAiHint: 'woman streaming', pk: true, icons: ['star', 'guitar', 't', 'n', 't'], viewers: 31 },
    { type: 'Sing Together', title: 'Queeeen', subtitle: 'کدابین', userImage: 'https://placehold.co/80x80.png', dataAiHint: 'woman portrait', viewers: 12, large: true },
    { type: 'Chat', title: 'ملوك المغنى', badgeCount: 5 },
    { type: 'Sing Together', title: 'ملتقى الفائزين', star: true },
];

export default function SingPage() {
  const [activeTab, setActiveTab] = React.useState('recommend');
  const [activeSubTab, setActiveSubTab] = React.useState('recommend');

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('recommend')} className={`text-2xl font-bold transition-colors ${activeTab === 'recommend' ? 'text-primary' : 'text-muted-foreground'}`}>
              Recommend
              {activeTab === 'recommend' && <div className="h-1 w-8 bg-accent mt-1 rounded-full mx-auto" />}
            </button>
            <button onClick={() => setActiveTab('live')} className={`text-2xl font-bold transition-colors ${activeTab === 'live' ? 'text-primary' : 'text-muted-foreground'}`}>
              Live
              {activeTab === 'live' && <div className="h-1 w-8 bg-accent mt-1 rounded-full mx-auto" />}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Search className="size-6 text-foreground" />
            <div className="relative">
              <Calendar className="size-6 text-foreground" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </div>
          </div>
        </header>

        {/* Top Rooms */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-4">
          {topRooms.map((room, index) => (
            <div key={index} className="flex flex-col items-center gap-2 shrink-0 w-20">
              <div className="relative size-20">
                <Avatar className="size-20 border-2 border-pink-400">
                  {room.isIcon ? (
                     <div className="flex items-center justify-center h-full w-full bg-purple-200/20">
                         <Home className="size-10 text-primary"/>
                     </div>
                  ) : (
                    <AvatarImage src={room.imageUrl} data-ai-hint={room.dataAiHint} />
                  )}
                  <AvatarFallback>{room.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {room.type && (
                    <Badge className={`absolute bottom-0 left-1/2 -translate-x-1/2 text-xs ${room.type === 'LIVE' ? 'bg-red-500' : 'bg-pink-500'} text-white`}>
                        {room.type}
                    </Badge>
                )}
              </div>
              <p className="text-sm font-bold truncate w-full text-center">{room.name}</p>
              {room.status && <p className="text-xs text-muted-foreground">{room.status}</p>}
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-3 gap-2 mb-6">
            {actionCards.map(card => (
                <Card key={card.label} className={`border-0 text-white rounded-xl p-3 bg-gradient-to-br ${card.color}`}>
                    <CardContent className="p-0">
                        <div className="flex justify-between items-start">
                            <p className="font-bold">{card.label}</p>
                            <span className="text-3xl">{card.icon}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                            <Users className="size-3"/>
                            <span>{card.count}</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Sub-navigation */}
        <div className="flex items-center gap-6 mb-4">
            <button onClick={() => setActiveSubTab('recommend')} className={`text-lg font-bold ${activeSubTab === 'recommend' ? 'text-primary' : 'text-muted-foreground'}`}>Recommend</button>
            <button onClick={() => setActiveSubTab('fun')} className={`text-lg font-bold ${activeSubTab === 'fun' ? 'text-primary' : 'text-muted-foreground'}`}>Fun Hub</button>
            <button onClick={() => setActiveSubTab('karaoke')} className={`text-lg font-bold ${activeSubTab === 'karaoke' ? 'text-primary' : 'text-muted-foreground'}`}>Karaoke</button>
        </div>
        
        {/* Recommended Content Grid */}
        <div className="grid grid-cols-2 gap-3">
            {recommendedContent.map((item, index) => (
                <Card key={index} className={`relative overflow-hidden rounded-xl border-0 ${item.large ? 'row-span-2 bg-gradient-to-br from-orange-300 to-yellow-300' : 'bg-card'}`}>
                    {item.type === 'Live' && (
                        <Image src={item.userImage!} data-ai-hint={item.dataAiHint} alt={item.location!} width={400} height={600} className="w-full h-auto object-cover"/>
                    )}
                     <div className={`absolute inset-0 ${!item.large && 'bg-gradient-to-t from-black/60 to-transparent'}`} />
                     <CardContent className="relative z-10 p-3 flex flex-col justify-between h-full">
                        {item.type === 'Live' ? (
                            <>
                                <div className="flex justify-between items-start">
                                    <Badge className="bg-red-500 text-white">Live</Badge>
                                    {item.pk && <Badge className="bg-blue-500 text-white">PK</Badge>}
                                </div>
                                <div className="text-white">
                                    <p className="font-bold">📍 {item.location}</p>
                                    <div className="flex items-center gap-1 text-xs">
                                        <span>{item.viewers}</span>
                                    </div>
                                </div>
                            </>
                        ) : item.type === 'Sing Together' && item.large ? (
                            <div className="text-center text-white p-2">
                                <Badge className="bg-white/30 text-white mb-2">Sing Together</Badge>
                                <h3 className="text-2xl font-bold">{item.title}</h3>
                                <p>{item.subtitle}</p>
                                <div className="my-4">
                                    <div className="w-24 h-24 mx-auto rounded-full border-4 border-yellow-400 bg-gray-200" style={{backgroundImage: 'url(https://placehold.co/400x400.png)', backgroundSize: 'cover' }}>
                                        <Image src="https://placehold.co/400x400.png" data-ai-hint="gold shield" alt="shield" width={100} height={100} className="w-full h-full object-contain" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Avatar className="size-8">
                                        <AvatarImage src={item.userImage} data-ai-hint={item.dataAiHint} />
                                    </Avatar>
                                    <div className="flex items-center gap-1">
                                        <Users className="size-4"/> {item.viewers}
                                    </div>
                                </div>
                            </div>
                        ) : (
                           <div className="flex flex-col justify-between h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
                                <div className="p-3">
                                    <div className="flex justify-between items-center text-white">
                                        <Badge className="bg-pink-500 text-white">{item.type}</Badge>
                                        {item.badgeCount && <Badge variant="secondary" className="bg-blue-600 text-white">{item.badgeCount}</Badge>}
                                        {item.star && <span className="text-yellow-400">⭐</span>}
                                    </div>
                                </div>
                                <div className="p-3 text-white">
                                     <h3 className="font-bold text-lg text-right">{item.title}</h3>
                                </div>
                           </div>
                        )}
                     </CardContent>
                </Card>
            ))}
        </div>

      </div>
    </div>
  );
}
