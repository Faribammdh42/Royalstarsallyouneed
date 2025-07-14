export function Logo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 
        className="font-headline font-bold text-6xl tracking-widest text-primary"
        style={{
            textShadow: '0 0 5px hsl(var(--primary)/0.8), 0 0 15px hsl(var(--primary)/0.6), 0 0 30px hsl(var(--primary)/0.4)'
        }}
      >
        ROYALSTAR
      </h1>
      <div 
        className="w-full h-px bg-primary"
        style={{
            boxShadow: '0 0 5px hsl(var(--primary)/0.8)'
        }}
      />
      <h2 
        className="mt-2 font-headline font-semibold text-2xl tracking-[0.3em] text-primary-foreground"
        style={{
            textShadow: '0 0 5px hsl(var(--primary-foreground)/0.7)'
        }}
      >
        ALL YOU NEED
      </h2>
    </div>
  );
}
