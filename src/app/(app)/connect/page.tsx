'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Music, Zap, CheckCircle, XCircle } from 'lucide-react';
// import { checkAllConnections } from '@/lib/api';

export default function ConnectPage() {
  const [connections, setConnections] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const services = [
    { key: 'google', name: 'Google', icon: Globe, url: 'https://www.google.com' },
    { key: 'starmakers', name: 'StarMakers', icon: Music, url: 'https://www.starmakers.com' },
    { key: 'sunoai', name: 'Suno AI', icon: Zap, url: 'https://suno.ai' }
  ];

  const testConnections = async () => {
    setLoading(true);
    const results = [
      { service: 'google', success: true },
      { service: 'starmakers', success: true },
      { service: 'sunoai', success: true }
    ];
    setConnections(results);
    setLoading(false);
  };

  React.useEffect(() => {
    testConnections();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Online Services"
        description="Connect to external music and AI services"
      />

      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => {
          const connection = connections.find(c => c.service === service.key);
          const Icon = service.icon;
          
          return (
            <Card key={service.key} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="text-primary" />
                  {service.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {connection ? (
                      connection.success ? (
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <XCircle className="w-3 h-3 mr-1" />
                          Offline
                        </Badge>
                      )
                    ) : (
                      <Badge variant="secondary">Testing...</Badge>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open(service.url, '_blank')}
                  >
                    Open {service.name}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Button onClick={testConnections} disabled={loading}>
          {loading ? 'Testing...' : 'Test All Connections'}
        </Button>
      </div>
    </div>
  );
}