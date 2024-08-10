import { NextResponse } from 'next/server';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getAboutPageDataForSite } from '@/app/lib/requests';

export async function GET(
  req: NextApiRequest,
  { params }: { params: { username: string } },
  res: NextApiResponse,
) {
  const username = params.username;
  console.log('username::', username);
  const response =
    username && (await getAboutPageDataForSite(username, 'about'));
  console.log('RESPONSE', response);
  return NextResponse.json(response);
}
