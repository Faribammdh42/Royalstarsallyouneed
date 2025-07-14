'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const moments = [
  {
    id: 1,
    user: { name: 'Samirkashi', avatarUrl: 'https://placehold.co/40x40.png', dataAiHint: 'man portrait' },
    imageUrl: 'https://placehold.co/400x600.png',
    dataAiHint: 'man singing',
    status: 'failed',
    title: 'Posting Failure'
  },
  {
    id: 2,
    user: { name: 'goli...', avatarUrl: 'https://placehold.co/40x40.png', dataAiHint: 'woman portrait' },
    imageUrl: 'https://placehold.co/400x600.png',
    dataAiHint: 'album cover',
    title: 'Donya',
    subtitle: 'Habib'
  },
  {
    id: 3,
    user: { name: 'Iranian Level 2', avatarUrl: 'https://placehold.co/40x40.png', dataAiHint: 'iran flag' },
    imageUrl: 'https://placehold.co/400x600.png',
    dataAiHint: 'galaxy space',
    title: 'Unlimited Love'
  },
  {
    id: 4,
    user: { name: 'Acoustic Queen', avatarUrl: 'https://placehold.co/40x40.png', dataAiHint: 'woman musician' },
    imageUrl: 'https://placehold.co/400x600.png',
    dataAiHint: 'classic singer',
    title: 'Vintage Vibes'
  },
];

const hashtags = ['#salaraghili', '#مسابقات بزرگ رئال استار'];

export default function MomentPage() {
  const [activeTab, setActiveTab] = React.useState('follow');
  const [activeSubTab, setActiveSubTab] = React.useState('friends');

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setActiveTab('follow')} className={`text-2xl font-bold ${activeTab === 'follow' ? 'text-primary' : 'text-muted-foreground'}`}>
            Follow
            {activeTab === 'follow' && <div className="h-1 w-6 bg-accent mt-1 rounded-full"/>}
          </button>
          <button onClick={() => setActiveTab('recommend')} className={`text-2xl font-bold ${activeTab === 'recommend' ? 'text-primary' : 'text-muted-foreground'}`}>
            Recommend
            {activeTab === 'recommend' && <div className="h-1 w-6 bg-accent mt-1 rounded-full"/>}
          </button>
        </div>
        <Button variant="ghost" size="icon">
          <Search className="size-6" />
        </Button>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-2 mb-4">
        <Button onClick={() => setActiveSubTab('friends')} variant={activeSubTab === 'friends' ? 'default' : 'secondary'} className="rounded-full">Friends</Button>
        <div className="relative">
          <Button onClick={() => setActiveSubTab('family')} variant={activeSubTab === 'family' ? 'default' : 'secondary'} className="rounded-full">Family</Button>
          <div className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full -mr-1 -mt-1" />
        </div>
      </div>
      
      {/* Post Prompt */}
      <Card className="mb-4 bg-muted/50 border-0 p-3 shadow-none">
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="woman singing"/>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                      <h3 className="font-bold text-foreground"># بوب روك</h3>
                      <p className="text-sm text-muted-foreground">هتغني بوب .. هتغني رو...</p>
                  </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" className="bg-accent hover:bg-accent/80 text-white rounded-full px-6">POST</Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <X className="size-4"/>
                </Button>
              </div>
          </div>
      </Card>

      {/* Hashtag Filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {hashtags.map(tag => (
          <Button key={tag} variant="secondary" size="sm" className="rounded-full bg-secondary/70 shrink-0">{tag}</Button>
        ))}
      </div>

      {/* Moments Grid */}
      <div className="grid grid-cols-2 gap-3">
        {moments.map((moment) => (
          <Card key={moment.id} className="overflow-hidden relative rounded-xl border-0">
            <Image src={moment.imageUrl} data-ai-hint={moment.dataAiHint} alt={moment.title || 'Moment'} width={400} height={600} className="w-full h-auto object-cover" />

            {moment.status === 'failed' ? (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-white text-center">
                  <h3 className="font-bold text-xl">{moment.title}</h3>
                  <div className="my-4 space-y-2 w-full">
                    <Button className="w-full rounded-full bg-accent hover:bg-accent/80 text-white font-bold">Retry</Button>
                    <Button variant="ghost" className="w-full rounded-full text-white/80 font-bold">Give up</Button>
                  </div>
              </div>
            ) : (
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            )}

            <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                <Avatar className="size-6 border-2 border-white/50">
                    <AvatarImage src={moment.user.avatarUrl} data-ai-hint={moment.user.dataAiHint} />
                    <AvatarFallback>{moment.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-white text-xs font-medium truncate flex-1">{moment.user.name}</p>
                {moment.id === 2 && <Badge className="bg-white/80 text-accent font-bold text-xs px-2">HI</Badge>}
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}
