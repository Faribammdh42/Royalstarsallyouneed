'use client';

import { PageHeader } from '@/components/page-header';

export default function MomentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Moments"
        description="Share your favorite moments with the community."
      />
      <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">Moment Page - Coming Soon!</p>
      </div>
    </div>
  );
}
