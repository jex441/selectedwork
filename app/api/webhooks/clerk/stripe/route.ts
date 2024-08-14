// This is your test secret API key.
import Stripe from 'stripe';

import { users } from '../../../../db/schema';

// Endpoint secret only in production:
const { STRIPE_SECRET_KEY, STRIPE_ENDPOINT_SECRET } = process.env;

const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  if (STRIPE_ENDPOINT_SECRET) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        STRIPE_ENDPOINT_SECRET,
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  switch (event.type) {
    case 'customer.subscription.created':
      await User.update(
        {
          subscriptionID: event.data.object.id,
        },
        { where: { customerID: event.data.object.customer } },
      );
      break;
    case 'customer.created':
      await User.update(
        {
          customerID: event.data.object.id,
        },
        { where: { email: event.data.object.email } },
      );
      break;
    case 'customer.subscription.updated':
      console.log(event);
      // await User.update(
      // 	{
      // 		customerID: event.data.object.id,
      // 	},
      // 	{ where: { email: event.data.object.email } }
      // );
      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }
}
