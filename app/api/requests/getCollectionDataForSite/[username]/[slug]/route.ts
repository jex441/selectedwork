import { NextResponse } from 'next/server';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getCollectionDataForSite } from '@/app/lib/data';

export async function GET(
  req: NextApiRequest,
  { params }: { params: { username: string; slug: string } },
  res: NextApiResponse,
) {
  const username = params.username;
  const slug = params.slug;

  const response = username && (await getCollectionDataForSite(username, slug));

  return NextResponse.json(response);
}
