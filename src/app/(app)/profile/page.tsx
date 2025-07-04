
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrackCard } from '@/components/track-card';
import { Upload, Crown, Award, Users, Waves } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const userUploads = [
  { title: 'My First Beat', artist: 'User', imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'music production' },
  { title: 'Vocal Idea', artist: 'User', imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'vocal waveform' },
];

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="My Profile" />

      <Card className="mb-8 overflow-hidden shadow-lg">
        <div className="bg-primary/10 h-24 md:h-32" />
        <CardContent className="p-6 pt-0 flex flex-col items-center gap-6 -mt-16 md:-mt-20">
          <Avatar className="size-24 md:size-32 border-4 border-background shadow-md">
            <AvatarImage src="https://placehold.co/128x128.png" data-ai-hint="portrait user" />
            <AvatarFallback>RS</AvatarFallback>
          </Avatar>
          <div className="flex-grow text-center">
            <h2 className="text-3xl font-bold font-headline">Royal User</h2>
            <p className="text-muted-foreground">user@email.com</p>
            
            <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
               <Badge variant="outline" className="flex items-center gap-1">
                 IRAN
               </Badge>
               <Badge variant="outline" className="flex items-center gap-1">
                 <Waves className="size-3 text-primary"/>
                 Aquarius
               </Badge>
               <Badge variant="outline" className="flex items-center gap-1">
                 <Users className="size-3 text-primary"/>
                 Friendship Lvl. 5
               </Badge>
            </div>
          </div>
        </CardContent>
        <Separator />
        <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
                <p className="text-2xl font-bold">421</p>
                <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div>
                <p className="text-2xl font-bold">287</p>
                <p className="text-sm text-muted-foreground">Following</p>
            </div>
            <div>
                <p className="text-2xl font-bold">208</p>
                <p className="text-sm text-muted-foreground">Rank</p>
            </div>
            <div>
                <p className="text-2xl font-bold">949</p>
                <p className="text-sm text-muted-foreground">Gifts</p>
            </div>
        </div>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <h3 className="text-2xl font-bold font-headline mb-4">My Uploads</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userUploads.map(track => (
                    <TrackCard key={track.title} {...track} />
                ))}
                {userUploads.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground col-span-full">
                        <p>You haven't uploaded any tracks yet.</p>
                        <Button asChild className="mt-4">
                            <Link href="/upload"><Upload className="mr-2 size-4" /> Upload Music</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
        
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl"><Crown className="text-primary"/> Family</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-semibold">ROYAL STAR</p>
                    <p className="text-sm text-muted-foreground">Family Ranking: No.83</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl"><Award className="text-primary"/> Badges</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                   <Badge variant="default" className="text-base p-2">Rank 100</Badge>
                   <Badge variant="secondary" className="text-base p-2">Rank 20</Badge>
                   <Badge variant="outline" className="text-base p-2">Rank 10</Badge>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
