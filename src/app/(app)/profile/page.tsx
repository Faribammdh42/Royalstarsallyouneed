import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrackCard } from '@/components/track-card';
import { Upload } from 'lucide-react';

const userUploads = [
  { title: 'My First Beat', artist: 'User', imageUrl: 'https://placehold.co/300x300', dataAiHint: 'music production' },
  { title: 'Vocal Idea', artist: 'User', imageUrl: 'https://placehold.co/300x300', dataAiHint: 'vocal waveform' },
];

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="My Profile" />

      <Card className="mb-8">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <Avatar className="size-24 md:size-32">
            <AvatarImage src="https://placehold.co/128x128" />
            <AvatarFallback>RS</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold font-headline">Royal User</h2>
            <p className="text-muted-foreground">user@email.com</p>
            <div className="mt-4 flex gap-4 justify-center md:justify-start">
              <div className="text-center">
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Uploads</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">48</p>
                <p className="text-sm text-muted-foreground">Favorites</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Generations</p>
              </div>
            </div>
          </div>
          <Button asChild className="md:ml-auto mt-4 md:mt-0">
             <Link href="/upload"><Upload className="mr-2 size-4" /> Upload Music</Link>
          </Button>
        </CardContent>
      </Card>
      
      <div>
        <h3 className="text-2xl font-bold font-headline mb-4">My Uploads</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {userUploads.map(track => (
                <TrackCard key={track.title} {...track} />
            ))}
        </div>
        {userUploads.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
                <p>You haven't uploaded any tracks yet.</p>
            </div>
        )}
      </div>
    </div>
  );
}
