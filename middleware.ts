import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  try {
    // Log the request details to the console
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // Continue to the next middleware or route handler
  } catch (error) {
    // Log the error to the console
    console.error(`Error occurred while processing ${req.method} ${req.url}:`, error);
  }

  return NextResponse.next();
}
