
'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Music, Send } from 'lucide-react';
import { ChatBubble } from '@/components/chat-bubble';

const initialParticipants = [
  { name: 'Ali', micOn: true, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man singing' },
  { name: 'Niloofar', micOn: false, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman smiling' },
  { name: 'Reza', micOn: true, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man portrait' },
  { name: 'Sara', micOn: false, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman portrait' },
  { name: 'You', micOn: true, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'user icon' },
];

const initialMessages = [
    { sender: 'Ali', text: 'This is a great song!', isMe: false },
    { sender: 'You', text: 'I know, right? The vibe is amazing.', isMe: true },
    { sender: 'Reza', text: 'Let\'s do a duet next!', isMe: false },
];


export default function RoomPage() {
    const [participants, setParticipants] = React.useState(initialParticipants);
    const [messages, setMessages] = React.useState(initialMessages);
    const [newMessage, setNewMessage] = React.useState('');
    const chatContainerRef = React.useRef<HTMLDivElement>(null);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages(prev => [...prev, { sender: 'You', text: newMessage, isMe: true }]);
            setNewMessage('');
        }
    };
    
    const toggleMyMic = () => {
        setParticipants(prev => prev.map(p => p.name === 'You' ? {...p, micOn: !p.micOn} : p));
    }

    React.useEffect(() => {
        if(chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col h-[calc(100vh-10rem)]">
      <PageHeader title="Pop Lovers Room" description="Live Karaoke & Chat">
        <Button variant="outline">
            <Music className="mr-2"/>
            Playing: "Desert Rose"
        </Button>
      </PageHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow min-h-0">
        {/* Participants List */}
        <Card className="flex flex-col">
            <CardContent className="p-4 flex-grow overflow-y-auto">
                <h3 className="font-bold mb-4">Participants ({participants.length})</h3>
                <div className="space-y-3">
                    {participants.map(p => (
                        <div key={p.name} className="flex items-center gap-3">
                             <Avatar>
                                <AvatarImage src={p.avatar} data-ai-hint={p.dataAiHint} />
                                <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                             </Avatar>
                             <span className="font-medium flex-grow">{p.name}</span>
                             {p.micOn ? <Mic className="text-green-500"/> : <MicOff className="text-muted-foreground"/>}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2 flex flex-col">
            <CardContent className="p-4 flex flex-col flex-grow">
                 <h3 className="font-bold mb-4">Live Chat</h3>
                 <div ref={chatContainerRef} className="flex-grow space-y-4 overflow-y-auto pr-2">
                    {messages.map((msg, index) => (
                        <ChatBubble key={index} sender={msg.sender} text={msg.text} isMe={msg.isMe} />
                    ))}
                 </div>
                 <div className="mt-4 flex gap-2">
                    <Input 
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                        <Send />
                    </Button>
                 </div>
            </CardContent>
        </Card>
      </div>

       <Button 
            onClick={toggleMyMic}
            className="fixed bottom-24 right-8 w-16 h-16 rounded-full shadow-lg"
            variant={participants.find(p => p.name === 'You')?.micOn ? 'default' : 'secondary'}
        >
            {participants.find(p => p.name === 'You')?.micOn ? <Mic size={28}/> : <MicOff size={28}/>}
        </Button>
    </div>
  );
}
