import { Crown } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center justify-center size-16 bg-secondary rounded-2xl border-2 border-primary/20">
      <div className="relative font-headline font-bold text-3xl text-primary">
        RS
        <Crown className="size-5 absolute -top-2 -right-3 text-accent rotate-12" />
      </div>
    </div>
  );
}
