import { NextResponse } from 'next/server';
import { DatabaseConnection } from '@/lib/db-connection';

export async function GET() {
  try {
    const connectionTest = await DatabaseConnection.testConnection();
    
    if (!connectionTest.success) {
      return NextResponse.json({ 
        error: 'Database connection failed',
        details: connectionTest.error 
      }, { status: 500 });
    }

    const initResult = await DatabaseConnection.initializeDatabase();
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection established',
      connection: connectionTest,
      initialization: initResult,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json({ 
      error: 'Database operation failed',
      details: error.message 
    }, { status: 500 });
  }
}