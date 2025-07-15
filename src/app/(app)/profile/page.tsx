
'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, Settings, MessageSquare, Music } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const user = {
    name: 'Fariba M.',
    handle: '@fariba123',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
    dataAiHint: 'woman portrait',
    bio: 'Singer & composer passionate about music and life. Follow for daily tunes!',
    stats: {
        followers: 1200,
        following: 180,
        creations: 35,
    },
    isCurrentUser: false,
    isFollowing: false,
};

const creations = [
  { id: 1, title: 'Desert Rose Cover', imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'desert landscape' },
  { id: 2, title: 'Ocean Eyes (AI Mix)', imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'ocean wave' },
  { id: 3, title: 'City Lights Ballad', imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'city skyline' },
];

const followers = [
    { name: 'Alice', avatarUrl: 'https://i.pravatar.cc/150?img=1', dataAiHint: 'woman smiling' },
    { name: 'Bob', avatarUrl: 'https://i.pravatar.cc/150?img=2', dataAiHint: 'man glasses' },
    { name: 'Charlie', avatarUrl: 'https://i.pravatar.cc/150?img=3', dataAiHint: 'man beanie' },
];

const following = [
    { name: 'David', avatarUrl: 'https://i.pravatar.cc/150?img=4', dataAiHint: 'man portrait' },
    { name: 'Eva', avatarUrl: 'https://i.pravatar.cc/150?img=5', dataAiHint: 'woman singing' },
];

export default function ProfilePage() {
    const [isFollowing, setIsFollowing] = React.useState(user.isFollowing);

    const toggleFollow = () => setIsFollowing(prev => !prev);

  return (
    <div className="container mx-auto px-4 py-8">
        
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <Avatar className="size-24 sm:size-32 border-4 border-primary/50 shadow-lg">
                <AvatarImage src={user.avatarUrl} data-ai-hint={user.dataAiHint} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <Button variant="ghost" size="icon">
                        <Settings />
                    </Button>
                </div>
                <p className="text-muted-foreground mb-4">{user.handle}</p>
                
                {user.isCurrentUser ? (
                    <Button variant="outline">Edit Profile</Button>
                ) : (
                    <div className="flex gap-2">
                         <Button onClick={toggleFollow}>
                            <UserPlus className="mr-2" />
                            {isFollowing ? 'Following' : 'Follow'}
                        </Button>
                        <Button variant="secondary">
                            <MessageSquare className="mr-2" />
                            Message
                        </Button>
                    </div>
                )}
            </div>
        </div>

        {/* User Stats */}
        <Card className="mb-6">
             <div className="grid grid-cols-3 gap-2 text-center p-4">
                <div>
                    <p className="text-lg font-bold">{user.stats.creations}</p>
                    <p className="text-xs text-muted-foreground">Creations</p>
                </div>
                <div>
                    <p className="text-lg font-bold">{user.stats.followers}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div>
                    <p className="text-lg font-bold">{user.stats.following}</p>
                    <p className="text-xs text-muted-foreground">Following</p>
                </div>
            </div>
        </Card>

        {/* Bio */}
        <div className="mb-6">
            <h3 className="font-bold mb-1">Bio</h3>
            <p className="text-muted-foreground">{user.bio}</p>
        </div>

        {/* Tabbed Section */}
        <Tabs defaultValue="creations" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="creations">Creations</TabsTrigger>
                <TabsTrigger value="followers">Followers</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            
            <TabsContent value="creations" className="mt-4 space-y-4">
                {creations.map(creation => (
                    <Card key={creation.id} className="hover:bg-muted/50">
                        <CardContent className="p-3 flex items-center gap-4">
                            <Avatar className="size-12 rounded-md">
                                <AvatarImage src={creation.imageUrl} data-ai-hint={creation.dataAiHint} />
                                <AvatarFallback><Music/></AvatarFallback>
                            </Avatar>
                            <p className="font-semibold flex-1">{creation.title}</p>
                            <Button variant="ghost" size="icon"><Music /></Button>
                        </CardContent>
                    </Card>
                ))}
            </TabsContent>

            <TabsContent value="followers" className="mt-4 space-y-3">
                {followers.map(f => (
                     <Card key={f.name} className="hover:bg-muted/50">
                        <CardContent className="p-3 flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={f.avatarUrl} data-ai-hint={f.dataAiHint} />
                                <AvatarFallback>{f.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="font-semibold flex-1">{f.name}</p>
                            <Button variant="outline" size="sm">Follow</Button>
                        </CardContent>
                    </Card>
                ))}
            </TabsContent>

            <TabsContent value="following" className="mt-4 space-y-3">
                {following.map(f => (
                     <Card key={f.name} className="hover:bg-muted/50">
                        <CardContent className="p-3 flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={f.avatarUrl} data-ai-hint={f.dataAiHint} />
                                <AvatarFallback>{f.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="font-semibold flex-1">{f.name}</p>
                            <Button variant="secondary" size="sm">Following</Button>
                        </CardContent>
                    </Card>
                ))}
            </TabsContent>
        </Tabs>
    </div>
  );
}
