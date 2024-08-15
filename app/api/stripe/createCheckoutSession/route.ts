'use server';
import Stripe from 'stripe';
const stripe = process.env.STRIPE_SECRET_KEY && new Stripe(process.env.STRIPE_SECRET_KEY);
import type { NextApiResponse,} from 'next';
import { NextResponse } from 'next/server';


export async function POST(req: Request, res: NextApiResponse) {
  const { email } = await req.json();

  const session = stripe && await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    customer_email: email,
    success_url: `http://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/account`,
    cancel_url: `http://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/account`,
  });
  if(session)
  return Response.json(session);
else{
  return NextResponse.json({error:500})
}
}