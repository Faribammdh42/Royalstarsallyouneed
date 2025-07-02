import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, Mic, Volume2 } from 'lucide-react';
import Image from 'next/image';

export default function SingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Karaoke Session"
        description="Sing your heart out to your favorite tracks."
      />

      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="https://placehold.co/1280x720"
          alt="Karaoke background"
          layout="fill"
          objectFit="cover"
          className="z-0"
          data-ai-hint="concert crowd"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 z-20 flex items-center justify-center p-8">
          <p className="font-headline text-4xl md:text-6xl text-white text-center font-bold tracking-wider" style={{ textShadow: '2px 2px 10px hsl(var(--primary))' }}>
            When the night has come...
          </p>
        </div>
      </div>

      <Card className="mt-[-4rem] relative z-30 mx-auto max-w-4xl shadow-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-4">
              <Button size="icon" variant="ghost">
                <SkipBack className="size-6" />
              </Button>
              <Button size="icon" className="size-16 rounded-full holo-button">
                <Play className="size-8 pl-1 text-white" />
              </Button>
              <Button size="icon" variant="ghost">
                <Mic className="size-6" />
              </Button>
            </div>
            <div className="w-full flex-grow">
              <Slider defaultValue={[40]} max={100} step={1} />
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="size-5 text-muted-foreground" />
              <Slider defaultValue={[80]} max={100} step={1} className="w-24" />
            </div>
          </div>
          <div className="text-center mt-4">
            <h3 className="text-xl font-bold">Stand By Me</h3>
            <p className="text-muted-foreground">Ben E. King</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
