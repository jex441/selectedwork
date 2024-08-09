import { NextResponse } from 'next/server';

import type { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: Request, res: NextApiResponse) {
  const headers = req.headers;
  const host: string = headers.get('host') || '';
  console.log('req::', req);
  // json error
  return res.json({ status: 200, data: { host: 'selected-work.com' } });
  // if (host) {
  //   return res.json({ status: 200, data: { host: host } });
  // } else {
  //   return res.json({ status: 400, data: { host: null } });
  // }
}
