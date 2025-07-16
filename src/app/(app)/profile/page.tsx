
'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, Settings, MessageSquare, Music, Wallet, Star, ShieldCheck, Gamepad2, Gift } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const user = {
    name: 'Fariba.mmdh',
    handle: '@fariba123',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
    dataAiHint: 'woman portrait',
    bio: 'Singer & composer passionate about music and life. Follow for daily tunes!',
    stats: {
        followers: 421,
        following: 287,
        creations: 35,
        gifts: 949,
        rank: 208,
    },
    tags: ['Iran', 'Aquarius', 'Friendship'],
    isCurrentUser: true,
    isFollowing: false,
};

const profileActions = [
    { label: 'Daily Tasks', icon: Star, href: '#' },
    { label: 'VIP & Noble', icon: ShieldCheck, href: '#' },
    { label: 'My Songs & Drafts', icon: Music, href: '/sing' },
    { label: 'Game Zone', icon: Gamepad2, href: '#' },
    { label: 'Recharge & Wallet', icon: Wallet, href: '/gifts' },
    { label: 'Settings', icon: Settings, href: '#' },
];

export default function ProfilePage() {
    const [isFollowing, setIsFollowing] = React.useState(user.isFollowing);

    const toggleFollow = () => setIsFollowing(prev => !prev);

  return (
    <div className="container mx-auto px-4 py-8">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-6">
            <Avatar className="size-24 border-4 border-primary/50 shadow-lg">
                <AvatarImage src={user.avatarUrl} data-ai-hint={user.dataAiHint} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.handle}</p>
            </div>
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

        {/* User Stats */}
        <Card className="mb-6">
             <div className="grid grid-cols-3 gap-2 text-center p-4">
                <div>
                    <p className="text-lg font-bold">{user.stats.creations}</p>
                    <p className="text-xs text-muted-foreground">talky walky family</p>
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
        
        {/* Tags */}
        <div className="flex justify-center gap-2 mb-6">
            {user.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>


        {/* Action List */}
        <div className="space-y-2">
            {profileActions.map(action => (
                 <Card key={action.label} className="hover:bg-muted/50 transition-colors">
                    <Link href={action.href}>
                        <CardContent className="p-3 flex items-center gap-4">
                            <action.icon className="size-5 text-muted-foreground" />
                            <p className="font-semibold flex-1">{action.label}</p>
                        </CardContent>
                    </Link>
                </Card>
            ))}
        </div>
    </div>
  );
}
