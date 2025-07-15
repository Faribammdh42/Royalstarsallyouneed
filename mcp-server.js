const { createServer } = require('http');
const { WebSocketServer } = require('ws');

class MCPServer {
  constructor(port = 3001) {
    this.port = port;
    this.connections = new Set();
  }

  start() {
    this.server = createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
      
      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }

      if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok' }));
        return;
      }

      res.writeHead(404);
      res.end();
    });

    this.wss = new WebSocketServer({ server: this.server });
    
    this.wss.on('connection', (ws) => {
      this.connections.add(ws);
      
      ws.on('message', async (data) => {
        try {
          const msg = JSON.parse(data.toString());
          const response = await this.handleMessage(msg);
          ws.send(JSON.stringify(response));
        } catch (e) {
          ws.send(JSON.stringify({ error: 'Invalid message' }));
        }
      });

      ws.on('close', () => this.connections.delete(ws));
    });

    this.server.listen(this.port, () => {
      console.log(`MCP Server running on port ${this.port}`);
    });
  }

  async handleMessage(msg) {
    const { method, id } = msg;

    switch (method) {
      case 'initialize':
        return {
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: { tools: {} },
            serverInfo: { name: 'RoyalStar MCP', version: '1.0.0' }
          }
        };
      
      case 'tools/list':
        return {
          id,
          result: {
            tools: [{
              name: 'send_gift',
              description: 'Send gift',
              inputSchema: {
                type: 'object',
                properties: {
                  giftId: { type: 'string' },
                  userId: { type: 'string' }
                }
              }
            }]
          }
        };

      default:
        return { id, error: { code: -32601, message: 'Method not found' } };
    }
  }
}

const server = new MCPServer(3001);
server.start();