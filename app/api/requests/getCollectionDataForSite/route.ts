'use server';
import { NextResponse } from 'next/server';

import type { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log('req -->', req);
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}
