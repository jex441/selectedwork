import { NextResponse } from 'next/server';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getContactPageDataForSite } from '@/app/lib/data';

export async function GET(req: Request, res: NextApiResponse) {
  const headers = req.headers;
  const host: string = headers.get('host') || '';

  const response = host && (await getContactPageDataForSite(host, 'contact'));
  return NextResponse.json(response);
}
