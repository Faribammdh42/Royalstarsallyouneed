import { Crown, Star } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center justify-center size-16 bg-secondary rounded-2xl border-2 border-primary/20">
      <div className="relative text-primary">
        <Star className="size-10 fill-current" />
        <Crown className="size-5 absolute -top-2 -right-3 text-accent rotate-12" />
      </div>
    </div>
  );
}
