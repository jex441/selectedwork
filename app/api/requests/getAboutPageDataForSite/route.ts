import { NextResponse } from 'next/server';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getCollectionDataForSite } from '@/app/lib/data';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const host = req.headers ? req.headers.get('host') : false;
  console.log(host);
  const response = host && (await getCollectionDataForSite(host, null));
  return NextResponse.json(response);
}
