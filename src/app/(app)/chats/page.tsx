import { PageHeader } from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const chatRooms = [
  { name: 'Pop Lovers', members: 128, imageUrl: 'https://placehold.co/40x40', dataAiHint: 'microphone pop' },
  { name: 'Rock & Roll Hall', members: 89, imageUrl: 'https://placehold.co/40x40', dataAiHint: 'electric guitar' },
  { name: 'Hip-Hop Heads', members: 231, imageUrl: 'https://placehold.co/40x40', dataAiHint: 'dj turntable' },
  { name: 'Synthwave Central', members: 56, imageUrl: 'https://placehold.co/40x40', dataAiHint: 'synthesizer keyboard' },
  { name: 'Karaoke Kings & Queens', members: 42, imageUrl: 'https://placehold.co/40x40', dataAiHint: 'singing microphone' },
  { name: 'AI Music Creators', members: 77, imageUrl: 'https://placehold.co/40x40', dataAiHint: 'robot music' },
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
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="size-12">
                  <AvatarImage src={room.imageUrl} data-ai-hint={room.dataAiHint} />
                  <AvatarFallback>{room.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">{room.name}</h3>
                  <p className="text-sm text-muted-foreground">{room.members} members</p>
                </div>
              </div>
              <Button>Join</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
