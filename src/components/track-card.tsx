import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Heart } from 'lucide-react';

interface TrackCardProps {
  title: string;
  artist: string;
  imageUrl: string;
  className?: string;
  dataAiHint?: string;
}

export function TrackCard({ title, artist, imageUrl, className, dataAiHint }: TrackCardProps) {
  return (
    <Card className={cn("group overflow-hidden relative border-0 shadow-lg", className)}>
      <CardContent className="p-0">
        <Image
          src={imageUrl}
          alt={`Album art for ${title}`}
          width={300}
          height={300}
          className="object-cover w-full aspect-square transition-transform duration-500 group-hover:scale-110"
          data-ai-hint={dataAiHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-bold text-white text-lg truncate">{title}</h3>
              <p className="text-sm text-white/80 truncate">{artist}</p>
            </div>
             <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10 shrink-0">
                <Heart className="size-5" />
             </Button>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <PlayCircle className="size-16 text-white drop-shadow-lg" />
        </div>
      </CardContent>
    </Card>
  );
}
