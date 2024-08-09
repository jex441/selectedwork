import { NextResponse } from 'next/server';

import type { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  /**
   * Check if there's a header with the custom domain,
   * and if not just use the host header.
   * If you're using approximated.app the default is to
   * inject the header 'apx-incoming-host' with the custom domain.
   */
  const domain =
    req.headers['apx-incoming-host'] ||
    req.headers.host ||
    process.env.NEXT_PUBLIC_APP_PRIMARY_DOMAIN;

  // do something with the "domain"

  res.status(200).json({ message: `Hello from ${domain}` });
}
