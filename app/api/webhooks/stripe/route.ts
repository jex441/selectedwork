import Stripe from 'stripe';

const SmeeClient = require('smee-client');
import { eq } from 'drizzle-orm';

import { db } from '@/app/db';
import { users } from '@/app/db/schema';

const smee = new SmeeClient({
  source: 'https://smee.io/rT3MugFodgmLiMOx',
  target: 'http://localhost:3000/api/webhooks/stripe',
  logger: console,
});
import { NextResponse } from 'next/server';
const stripe =
  process.env.STRIPE_SECRET_KEY && new Stripe(process.env.STRIPE_SECRET_KEY);

const events = process.env.NODE_ENV === 'development' && smee.start();

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  if (process.env.NODE_ENV !== 'development') {
    try {
      if (!stripe || !sig || !webhookSecret)
        return new Response('Webhook secret not found.', { status: 400 });
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
      console.log(`🔔  Webhook received: ${event.type}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);
      return NextResponse.json(
        { message: `Webhook Error: ${errorMessage}` },
        { status: 400 },
      );
    }
  } else {
    event = JSON.parse(body);
  }

  // Successfully constructed event.
  console.log('✅ Success:', event.id);

  const permittedEvents: string[] = [
    'checkout.session.completed',
    // "payment_intent.succeeded",
    // "payment_intent.payment_failed",
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.created',
  ];

  if (permittedEvents.includes(event.type)) {
    let data;
    try {
      switch (event.type) {
        case 'customer.subscription.created':
          console.log('🔔  Webhook received', event);
          typeof event.data.object.customer === 'string' &&
            (await db
              .update(users)
              .set({
                subscriptionId: event.data.object.id,
              })
              .where(eq(users.customerId, event.data.object.customer)));
          break;
        case 'customer.created':
          console.log('🔔  Webhook received', event);
          event.data.object.email &&
            (await db
              .update(users)
              .set({
                customerId: event.data.object.id,
              })
              .where(eq(users.email, event.data.object.email)));
          break;
        case 'checkout.session.completed':
          console.log('🔔  Webhook received', event);
          await db
            .update(users)
            .set({
              plan: 'premium',
            })
            .where(eq(users.customerId, event.data.object.customer as string))
            .returning({ email: users.email, plan: users.plan });
          break;
        case 'customer.subscription.updated':
          if (event.data.object.status === 'active') {
            typeof event.data.object.customer === 'string' &&
              (await db
                .update(users)
                .set({
                  plan: 'premium',
                })
                .where(eq(users.customerId, event.data.object.customer)));
          }
          if (event.data.object.status === 'canceled') {
            typeof event.data.object.customer === 'string' &&
              (await db
                .update(users)
                .set({
                  plan: 'free',
                })
                .where(eq(users.customerId, event.data.object.customer)));
          }
          break;
        default:
          console.log(`Unhandled event type ${event.type}.`);
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: 'Webhook handler failed' },
        { status: 500 },
      );
    }
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: 'Received' }, { status: 200 });
}

process.env.NODE_ENV === 'development' && events.close();
