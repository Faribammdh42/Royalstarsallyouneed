import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';

export default function WelcomePage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-zinc-950 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]">
        <div className="absolute right-0 top-0 h-full w-full bg-[radial-gradient(circle_800px_at_100%_200px,hsl(var(--primary)/0.2),transparent)]"></div>
      </div>
      <Card className="w-full max-w-md shadow-2xl backdrop-blur-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="font-headline text-4xl font-bold tracking-tighter">
            Welcome to RoyalStars
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Your universe of music awaits.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/home">
              <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-69.2 69.2c-20.3-19.5-48.4-31.4-79.7-31.4-62.3 0-113.5 51.6-113.5 114.9s51.2 114.9 113.5 114.9c71.2 0 98.2-49.4 102.3-73.4h-102.3v-85.1h194.4z"></path>
              </svg>
              Sign In with Google
            </Link>
          </Button>
          <Button variant="secondary" asChild size="lg" className="w-full">
            <Link href="/home">Continue as Guest</Link>
          </Button>
        </CardContent>
      </Card>
      <footer className="absolute bottom-4 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} RoyalStars. All rights reserved.</p>
      </footer>
    </main>
  );
}
