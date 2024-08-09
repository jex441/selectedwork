import { NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: Request, res: NextApiResponse) {
  console.log('hit');
  /**
   * Check if there's a header with the custom domain,
   * and if not just use the host header.
   * If you're using approximated.app the default is to
   * inject the header 'apx-incoming-host' with the custom domain.
   */
  console.log('req::', req);
  const domain =
    req.headers.get('apx-incoming-host') || req.headers.get('host');

  console.log('domain::', domain);
  // do something with the "domain"

  return NextResponse.json({ status: 200, data: { host: domain, req: req } });
}
