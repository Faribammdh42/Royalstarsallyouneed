
'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Crown, Award, Users, Waves, Heart, Music, MessageSquare, UserPlus, Settings, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const user = {
    name: 'Royal User',
    handle: '@royaluser',
    avatarUrl: 'https://placehold.co/128x128.png',
    dataAiHint: 'portrait user',
    stats: {
        followers: 421,
        following: 287,
        rank: 208,
        gifts: 949,
    },
    family: {
        name: 'ROYAL STAR',
        rank: 83,
        imageUrl: 'https://placehold.co/40x40.png',
        dataAiHint: 'royal crest'
    }
};

const quickActions = [
    { label: 'Likes', icon: Heart, href:'#' },
    { label: 'My Songs', icon: Music, href:'#' },
    { label: 'Comments', icon: MessageSquare, href:'#' },
    { label: 'Following', icon: UserPlus, href:'#' },
]

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Me</h1>
            <Button variant="ghost" size="icon">
                <Settings />
            </Button>
        </div>

        {/* User Card */}
        <Card className="bg-card border-0 shadow-none mb-6">
            <CardContent className="flex items-center gap-4 p-0">
                <Avatar className="size-20">
                    <AvatarImage src={user.avatarUrl} data-ai-hint={user.dataAiHint} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">{user.handle}</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-full">Edit Profile</Button>
            </CardContent>
        </Card>

        {/* User Stats */}
        <Card className="mb-6">
             <div className="grid grid-cols-4 gap-2 text-center p-4">
                <div>
                    <p className="text-lg font-bold">{user.stats.followers}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div>
                    <p className="text-lg font-bold">{user.stats.following}</p>
                    <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <div>
                    <p className="text-lg font-bold">{user.stats.rank}</p>
                    <p className="text-xs text-muted-foreground">Rank</p>
                </div>
                <div>
                    <p className="text-lg font-bold">{user.stats.gifts}</p>
                    <p className="text-xs text-muted-foreground">Gifts</p>
                </div>
            </div>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-4 gap-4 text-center mb-6">
            {quickActions.map(action => (
                <Link href={action.href} key={action.label} className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <div className="p-3 bg-muted rounded-full">
                        <action.icon className="size-6" />
                    </div>
                    <span className="text-xs">{action.label}</span>
                </Link>
            ))}
        </div>

        {/* Family Card */}
        <Card className="mb-6">
            <CardContent className="p-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="size-10 border-2 border-yellow-400">
                            <AvatarImage src={user.family.imageUrl} data-ai-hint={user.family.dataAiHint}/>
                        </Avatar>
                        <div>
                            <h3 className="font-bold flex items-center gap-1">
                                {user.family.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">Family Rankings: No.{user.family.rank}</p>
                        </div>
                    </div>
                     <Button variant="secondary" size="sm" className="rounded-full">View</Button>
                </div>
            </CardContent>
        </Card>

        {/* Tabbed Section */}
        <div className="text-center text-muted-foreground py-8">
            <p>More content sections (e.g., Posts, Creations) can go here.</p>
        </div>
    </div>
  );
}
