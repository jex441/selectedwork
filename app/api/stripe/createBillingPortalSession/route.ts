'use server';

import Stripe from 'stripe';
const stripe =
  process.env.STRIPE_SECRET_KEY && new Stripe(process.env.STRIPE_SECRET_KEY);
import type { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: NextApiResponse) {
  const { customerId } = await req.json();
  const session =
    stripe &&
    (await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/account`,
    }));
  if (session) return Response.json(session);
  else {
    return NextResponse.json({ error: 500 });
  }
}
