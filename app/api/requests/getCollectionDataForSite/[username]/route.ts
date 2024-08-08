import { NextResponse } from 'next/server';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getCollectionDataForSite } from '@/app/lib/data';

export async function GET(
  req: NextApiRequest,
  { params }: { params: { id: string } },
  res: NextApiResponse,
) {
  const username = params.username;
  const response = username && (await getCollectionDataForSite(username, null));

  return NextResponse.json(response);
}
