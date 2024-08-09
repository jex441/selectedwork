import { NextResponse } from 'next/server';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getCollectionDataForSite } from '@/app/lib/data';

export async function GET(req: Request, res: NextApiResponse) {
  const headers = req.headers;
  const host: string = headers.get('host') || '';
  console.log('headers::', headers);
  return NextResponse.json({ status: 200, data: { host: host, other: req } });
}
