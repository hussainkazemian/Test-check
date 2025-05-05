import { NextResponse } from 'next/server';
import { getApiDocs } from './swnpmagger';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const spec = getApiDocs();
    return NextResponse.json(spec);
  } catch (error) {
    console.error('API Docs Error:', error);
    return NextResponse.json(
      { 
        error: {
          code: 'DOCS_ERROR',
          message: 'Failed to generate API documentation',
          timestamp: '2025-05-05 16:30:37'
        }
      },
      { status: 500 }
    );
  }
}