import { NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getCollectionDataForSite } from '@/app/lib/data';

export async function GET(req: Request, res: NextApiResponse) {
  const headers = req.headers;
  const host: string = headers.get('host') || '';
  console.log('host, api', host);
  // const response = host !== '' && (await getCollectionDataForSite(host, null));
  return NextResponse.json({
    status: 200,
    user: {
      username: 'test' + ' ' + 'user',
      displayName: 'test user',
    },
    data: { title: 'test', works: [] },
  });
}
