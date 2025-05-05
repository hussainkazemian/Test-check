import { NextRequest, NextResponse } from 'next/server';

export function apiDocsMiddleware(request: NextRequest) {
  // Allow access to API documentation
  if (request.nextUrl.pathname.startsWith('/api-docs') || 
      request.nextUrl.pathname.startsWith('/api/docs')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}