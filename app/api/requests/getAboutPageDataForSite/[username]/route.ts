import { NextResponse } from 'next/server';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getAboutPageDataForSite } from '@/app/lib/data';

export async function GET(
  req: NextApiRequest,
  { params }: { params: { username: string } },
  res: NextApiResponse,
) {
  const username = params.username;
  const response =
    username && (await getAboutPageDataForSite(username, 'about'));

  return NextResponse.json(response);
}
