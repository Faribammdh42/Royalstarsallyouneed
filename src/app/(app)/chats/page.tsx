import { PageHeader } from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Mic, Users, Music, Gift } from 'lucide-react';

const chatRooms = [
  { name: 'Pop Lovers', members: 128, online: 45, type: 'voice', gifts: 234, imageUrl: 'https://placehold.co/40x40', dataAiHint: 'microphone pop' },
  { name: 'Rock & Roll Hall', members: 89, online: 23, type: 'live', gifts: 156, imageUrl: 'https://placehold.co/40x40', dataAiHint: 'electric guitar' },
  { name: 'Hip-Hop Heads', members: 231, online: 67, type: 'voice', gifts: 445, imageUrl: 'https://placehold.co/40x40', dataAiHint: 'dj turntable' },
  { name: 'Synthwave Central', members: 56, online: 12, type: 'chat', gifts: 89, imageUrl: 'https://placehold.co/40x40', dataAiHint: 'synthesizer keyboard' },
  { name: 'Karaoke Kings & Queens', members: 42, online: 18, type: 'live', gifts: 167, imageUrl: 'https://placehold.co/40x40', dataAiHint: 'singing microphone' },
  { name: 'AI Music Creators', members: 77, online: 34, type: 'voice', gifts: 298, imageUrl: 'https://placehold.co/40x40', dataAiHint: 'robot music' },
];

export default function ChatsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Chat Rooms" description="Join a room and sing live with others.">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search rooms..." className="pl-10" />
        </div>
      </PageHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chatRooms.map(room => (
          <Card key={room.name} className="hover:shadow-primary/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 mb-3">
                <Avatar className="size-12 relative">
                  <AvatarImage src={room.imageUrl} data-ai-hint={room.dataAiHint} />
                  <AvatarFallback>{room.name.charAt(0)}</AvatarFallback>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
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
                  <Badge variant={room.type === 'live' ? 'destructive' : room.type === 'voice' ? 'default' : 'secondary'}>
                    {room.type === 'live' && <Mic className="w-3 h-3 mr-1" />}
                    {room.type === 'voice' && <Music className="w-3 h-3 mr-1" />}
                    {room.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Gift className="w-3 h-3" />
                  <span>{room.gifts}</span>
                </div>
              </div>
              
              <Button className="w-full">Join Room</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
