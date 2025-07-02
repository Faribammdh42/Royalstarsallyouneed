import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud } from 'lucide-react';

export default function UploadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Upload Your Music"
        description="Share your creations with the RoyalStars community."
      />

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Track Details</CardTitle>
          <CardDescription>
            Fill out the information below to upload your track.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Track Title</Label>
            <Input id="title" placeholder="e.g., Neon Dreams" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="artist">Artist Name</Label>
            <Input id="artist" placeholder="e.g., Synthwave Surfer" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="artwork">Album Artwork</Label>
            <Input id="artwork" type="file" accept="image/*" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="audio">Audio File</Label>
            <Input id="audio" type="file" accept="audio/*" />
          </div>
          <Button type="submit" className="w-full" size="lg">
            <UploadCloud className="mr-2 h-5 w-5" />
            Upload Track
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
