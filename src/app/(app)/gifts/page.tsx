'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coins, Gift, Crown, Star, Heart, Trophy } from 'lucide-react';

export default function GiftsPage() {
  const [coins, setCoins] = React.useState(1250);

  const giftCategories = {
    basic: [
      { id: 1, name: 'Heart', icon: '❤️', price: 10, description: 'A token of affection' },
      { id: 2, name: 'Rose', icon: '🌹', price: 25, description: 'For a beautiful performance' },
      { id: 3, name: 'Applause', icon: '👏', price: 15, description: 'Well done!' },
      { id: 4, name: 'Star', icon: '⭐', price: 30, description: 'A stellar performance' }
    ],
    premium: [
      { id: 5, name: 'Golden Crown', icon: '👑', price: 100, description: 'King of Singing' },
      { id: 6, name: 'Golden Mic', icon: '🎤', price: 150, description: 'Golden Voice' },
      { id: 7, name: 'Trophy', icon: '🏆', price: 200, description: 'Champion Performance' },
      { id: 8, name: 'Fireworks', icon: '🎆', price: 300, description: 'An amazing performance' }
    ],
    vip: [
      { id: 9, name: 'Golden Dragon', icon: '🐉', price: 500, description: 'Legendary Power' },
      { id: 10, name: 'Galaxy', icon: '🌌', price: 1000, description: 'A cosmic performance' },
      { id: 11, name: 'Dream Castle', icon: '🏰', price: 1500, description: 'Sovereign of Music' }
    ]
  };

  const coinPackages = [
    { coins: 100, price: '$0.99', bonus: 0, popular: false },
    { coins: 500, price: '$4.99', bonus: 50, popular: false },
    { coins: 1200, price: '$9.99', bonus: 200, popular: true },
    { coins: 2500, price: '$19.99', bonus: 500, popular: false },
    { coins: 6000, price: '$49.99', bonus: 1500, popular: false }
  ];

  const leaderboard = [
    { rank: 1, name: 'John Doe', gifts: 15420, avatar: 'https://placehold.co/40x40' },
    { rank: 2, name: 'Jane Smith', gifts: 12350, avatar: 'https://placehold.co/40x40' },
    { rank: 3, name: 'Peter Jones', gifts: 9870, avatar: 'https://placehold.co/40x40' },
    { rank: 4, name: 'Mary Williams', gifts: 8450, avatar: 'https://placehold.co/40x40' },
    { rank: 5, name: 'David Brown', gifts: 7230, avatar: 'https://placehold.co/40x40' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Gift Shop"
        description="Send virtual gifts to encourage singers"
      >
        <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full">
          <Coins className="w-5 h-5" />
          <span className="font-bold">{coins.toLocaleString()}</span>
        </div>
      </PageHeader>

      <Tabs defaultValue="gifts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gifts">Gifts</TabsTrigger>
          <TabsTrigger value="coins">Buy Coins</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="gifts" className="space-y-6">
          {Object.entries(giftCategories).map(([category, gifts]) => (
            <div key={category}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                {category === 'basic' && <Heart className="w-5 h-5 text-pink-500" />}
                {category === 'premium' && <Crown className="w-5 h-5 text-yellow-500" />}
                {category === 'vip' && <Star className="w-5 h-5 text-purple-500" />}
                {category.charAt(0).toUpperCase() + category.slice(1)} Gifts
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gifts.map((gift) => (
                  <Card key={gift.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 text-center">
                      <div className="text-4xl mb-2">{gift.icon}</div>
                      <h4 className="font-bold mb-1">{gift.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{gift.description}</p>
                      <div className="flex items-center justify-center gap-1 mb-3">
                        <Coins className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold">{gift.price}</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full"
                        disabled={coins < gift.price}
                        onClick={() => setCoins(prev => prev - gift.price)}
                      >
                        Buy
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="coins" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {coinPackages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'ring-2 ring-purple-500' : ''}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-purple-500">
                    Popular
                  </Badge>
                )}
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">💰</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <span className="text-2xl font-bold">{pkg.coins.toLocaleString()}</span>
                  </div>
                  {pkg.bonus > 0 && (
                    <div className="text-sm text-green-600 mb-2">
                      + {pkg.bonus} Bonus
                    </div>
                  )}
                  <div className="text-lg font-bold text-purple-600 mb-4">{pkg.price}</div>
                  <Button className="w-full">Buy</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Top Gifters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user) => (
                  <div key={user.rank} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      user.rank === 1 ? 'bg-yellow-500 text-white' :
                      user.rank === 2 ? 'bg-gray-400 text-white' :
                      user.rank === 3 ? 'bg-orange-600 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {user.rank}
                    </div>
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.gifts.toLocaleString()} gifts sent
                      </div>
                    </div>
                    {user.rank <= 3 && (
                      <div className="text-2xl">
                        {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
