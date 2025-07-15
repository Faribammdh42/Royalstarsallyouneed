'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coins, Gift, Crown, Star, Heart, Trophy, Rocket, Gem, Ticket } from 'lucide-react';
import { Input } from '@/components/ui/input';
// @ts-ignore
import { doc, getDoc, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export default function GiftsPage() {
  const [coins, setCoins] = React.useState(1250);
  const [code, setCode] = React.useState('');
  const [resultMessage, setResultMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const redeemCode = async () => {
    const user = auth.currentUser;
    if (!user) {
      setResultMessage('❌ You must be logged in to redeem a code.');
      return;
    }

    if (!code.trim()) {
      setResultMessage('⚠️ Please enter a code.');
      return;
    }

    setIsLoading(true);
    setResultMessage('');

    const codeId = code.trim().toUpperCase();
    const giftCodeRef = doc(db, 'giftcodes', codeId);

    try {
      const giftCodeSnap = await getDoc(giftCodeRef);

      if (!giftCodeSnap.exists()) {
        setResultMessage('❌ Invalid code!');
        setIsLoading(false);
        return;
      }

      const giftCodeData = giftCodeSnap.data();
      const usedBy = (giftCodeData.usedBy || []) as string[];

      if (usedBy.includes(user.uid)) {
        setResultMessage('⚠️ You have already used this code.');
        setIsLoading(false);
        return;
      }

      const userRef = doc(db, 'users', user.uid);
      const value = giftCodeData.value || 0;
      const type = giftCodeData.type || 'credit';

      if (type === 'credit') {
        await updateDoc(userRef, {
          balance: increment(value)
        });
      } else if (type === 'vip') {
        await updateDoc(userRef, {
          vip: true
        });
      }

      await updateDoc(giftCodeRef, {
        usedBy: arrayUnion(user.uid)
      });

      setResultMessage(`✅ Code applied! You received ${value} ${type}.`);
      // Optionally, refresh user's coin balance if it's stored in state
      if (type === 'credit') {
        setCoins(prev => prev + value);
      }

    } catch (error) {
      console.error("Error redeeming code:", error);
      setResultMessage('🔥 An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const giftCategories = {
    basic: [
      { id: 1, name: 'Heart', icon: <Heart className="text-pink-500" />, price: 10, description: 'A token of affection' },
      { id: 3, name: 'Applause', icon: <span className="text-2xl">👏</span>, price: 15, description: 'Well done!' },
      { id: 4, name: 'Star', icon: <Star className="text-yellow-400" />, price: 30, description: 'A stellar performance' }
    ],
    premium: [
      { id: 5, name: 'Crown', icon: <Crown className="text-yellow-500" />, price: 100, description: 'King of Singing' },
      { id: 6, name: 'Gem', icon: <Gem className="text-purple-500" />, price: 150, description: 'A precious voice' },
      { id: 7, name: 'Trophy', icon: <Trophy className="text-amber-600" />, price: 200, description: 'Champion Performance' }
    ],
    vip: [
      { id: 9, name: 'Rocket', icon: <Rocket className="text-red-500" />, price: 500, description: 'To the moon!' },
      { id: 10, name: 'Galaxy', icon: <span className="text-2xl">🌌</span>, price: 1000, description: 'A cosmic performance' },
      { id: 11, name: 'Castle', icon: <span className="text-2xl">🏰</span>, price: 1500, description: 'Sovereign of Music' }
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
    { rank: 1, name: 'John Doe', gifts: 15420, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man smiling' },
    { rank: 2, name: 'Jane Smith', gifts: 12350, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman portrait' },
    { rank: 3, name: 'Peter Jones', gifts: 9870, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man portrait' },
    { rank: 4, name: 'Mary Williams', gifts: 8450, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman glasses' },
    { rank: 5, name: 'David Brown', gifts: 7230, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man beanie' }
  ];

  const handleBuyGift = (price: number) => {
    if (coins >= price) {
        setCoins(prev => prev - price);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Gift Shop"
        description="Send virtual gifts to encourage singers"
      >
        <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg">
          <Coins className="w-5 h-5" />
          <span className="font-bold text-lg">{coins.toLocaleString()}</span>
        </div>
      </PageHeader>

      <Tabs defaultValue="gifts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="gifts"><Gift className="mr-2" />Gifts</TabsTrigger>
          <TabsTrigger value="coins"><Coins className="mr-2" />Buy Coins</TabsTrigger>
          <TabsTrigger value="leaderboard"><Trophy className="mr-2" />Leaderboard</TabsTrigger>
          <TabsTrigger value="redeem"><Ticket className="mr-2" />Redeem Code</TabsTrigger>
        </TabsList>

        <TabsContent value="gifts" className="mt-6 space-y-8">
          {Object.entries(giftCategories).map(([category, gifts]) => (
            <div key={category}>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 capitalize">
                {category === 'basic' && <Heart className="w-6 h-6 text-pink-500" />}
                {category === 'premium' && <Crown className="w-6 h-6 text-yellow-500" />}
                {category === 'vip' && <Star className="w-6 h-6 text-purple-500" />}
                {category} Gifts
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gifts.map((gift) => (
                  <Card key={gift.id} className="hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    <CardContent className="p-4 text-center flex flex-col flex-grow items-center">
                      <div className="text-4xl mb-2 h-10 w-10 flex items-center justify-center">{gift.icon}</div>
                      <h4 className="font-bold text-lg mb-1">{gift.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3 flex-grow">{gift.description}</p>
                      <div className="flex items-center justify-center gap-1 mb-4">
                        <Coins className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold text-base">{gift.price}</span>
                      </div>
                      <Button
                        size="sm"
                        className="w-full mt-auto"
                        disabled={coins < gift.price}
                        onClick={() => handleBuyGift(gift.price)}
                      >
                        Send Gift
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="coins" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {coinPackages.map((pkg, index) => (
              <Card key={index} className={`relative hover:shadow-xl transition-shadow duration-300 ${pkg.popular ? 'ring-2 ring-purple-500 shadow-lg' : ''}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 px-3 py-1 text-sm">
                    Popular
                  </Badge>
                )}
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3"><span role="img" aria-label="coin bag">💰</span></div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Coins className="w-6 h-6 text-yellow-500" />
                    <span className="text-3xl font-bold">{pkg.coins.toLocaleString()}</span>
                  </div>
                  {pkg.bonus > 0 && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      + {pkg.bonus.toLocaleString()} Bonus
                    </Badge>
                  )}
                  <div className="text-xl font-bold text-primary my-4">{pkg.price}</div>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Buy Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Trophy className="w-7 h-7 text-yellow-500" />
                Top Gifters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div key={user.rank} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                      user.rank === 1 ? 'bg-yellow-400 text-white' :
                      user.rank === 2 ? 'bg-slate-400 text-white' :
                      user.rank === 3 ? 'bg-orange-400 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {user.rank}
                    </div>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-primary/50"
                      data-ai-hint={user.dataAiHint}
                    />
                    <div className="flex-1">
                      <div className="font-bold text-base">{user.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Gift className="w-4 h-4 text-pink-400" />
                        {user.gifts.toLocaleString()} gifts sent
                      </div>
                    </div>
                    {user.rank <= 3 && (
                      <div className="text-3xl">
                        {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="redeem" className="mt-6">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Ticket className="w-7 h-7 text-green-500" />
                Redeem a Gift Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Enter your gift code below to claim your reward.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Enter your code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={redeemCode} disabled={isLoading} className="sm:w-auto">
                  {isLoading ? 'Redeeming...' : 'Redeem'}
                </Button>
              </div>
              {resultMessage && (
                <p className="text-center font-semibold text-lg mt-4">
                  {resultMessage}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
