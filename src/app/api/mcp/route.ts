import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({ 
    status: 'MCP API Ready',
    endpoints: ['/health', '/connect'],
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { method, params, id } = body;

    switch (method) {
      case 'initialize':
        return NextResponse.json({
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: { tools: {}, resources: {} },
            serverInfo: { name: 'RoyalStar MCP API', version: '1.0.0' }
          }
        });

      case 'tools/list':
        return NextResponse.json({
          id,
          result: {
            tools: [{
              name: 'send_gift',
              description: 'Send virtual gift to user',
              inputSchema: {
                type: 'object',
                properties: {
                  giftId: { type: 'string' },
                  recipientId: { type: 'string' }
                }
              }
            }]
          }
        });

      case 'tools/call':
        return NextResponse.json({
          id,
          result: {
            success: true,
            message: `Tool executed: ${params.name}`
          }
        });

      default:
        return NextResponse.json({
          id,
          error: { code: -32601, message: 'Method not found' }
        }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({
      error: 'Invalid request format'
    }, { status: 400 });
  }
}