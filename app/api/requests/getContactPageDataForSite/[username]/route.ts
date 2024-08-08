import { NextResponse } from 'next/server';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getContactPageDataForSite } from '@/app/lib/data';

export async function GET(
  req: NextApiRequest,
  { params }: { params: { username: string } },
  res: NextApiResponse,
) {
  const username = params.username;
  const response =
    username && (await getContactPageDataForSite(username, 'cv'));

  return NextResponse.json(response);
}
