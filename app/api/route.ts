import { NextResponse } from 'next/server';

export function GET(request: Request) {
  // Do whatever you want
  console.log('ping');
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}
