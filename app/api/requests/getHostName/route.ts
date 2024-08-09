import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import type { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  /**
   * Check if there's a header with the custom domain,
   * and if not just use the host header.
   * If you're using approximated.app the default is to
   * inject the header 'apx-incoming-host' with the custom domain.
   */
  // console.log('req::', req);
  const domain =
    req.headers['apx-incoming-host'] ||
    req.headers.host ||
    process.env.NEXT_PUBLIC_APP_PRIMARY_DOMAIN;

  console.log('domain::', domain);
  // do something with the "domain"

  res.status(200).json({ status: 200, data: { host: 'test' } });
}
