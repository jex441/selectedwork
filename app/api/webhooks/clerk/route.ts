'use server';

import { Webhook } from 'svix';
const SmeeClient = require('smee-client');
import { eq } from 'drizzle-orm';

import { db } from '../../../db';
import {
  users,
  NewUser,
  pages,
  InsertPage,
  about,
  contact,
  cv,
  collection,
} from '../../../db/schema';
import { Event } from './types';
import Visibility from '@/app/app/(dashboard)/collections/[slug]/visibility';

const smee = new SmeeClient({
  source: process.env.WEBHOOK_PROXY_URL!,
  target: process.env.BASE_URL! + 'api/webhooks/clerk',
  logger: console,
});

const events = process.env.NODE_ENV === 'development' && smee.start();

export async function POST(req: Request) {
  const webhookSecret: string = process.env.CLERK_WEBHOOK_SECRET!;

  const svix_id = req.headers.get('svix-id') ?? '';
  const svix_timestamp = req.headers.get('svix-timestamp') ?? '';
  const svix_signature = req.headers.get('svix-signature') ?? '';

  const body = await req.text();
  const sivx = new Webhook(webhookSecret);

  let msg;

  try {
    msg = sivx.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as Event; // Add type assertion here
  } catch (err) {
    return new Response('Bad Request', { status: 400 });
  }

  if (msg.type === 'user.created') {
    const insertUser = async (user: NewUser) => {
      let userId: number;
      let res = await db.insert(users).values(user).returning({ id: users.id });
      userId = res[0].id;

      let defaultPages = [
        { template: 'a1', slug: 'about', title: 'About', userId: userId },
        { template: 'c1', slug: 'contact', title: 'Contact', userId: userId },
        { template: 'r1', slug: 'cv', title: 'CV', userId: userId },
        {
          template: 'g1',
          slug: 'work',
          title: 'Selected Work',
          userId: userId,
          Visibility: 'public',
        },
        { template: 'h1', slug: 'home', title: 'Home', userId: userId },
      ];

      const insertAboutPage = async () => {
        return await db
          .insert(about)
          .values(defaultPages[0])
          .returning({ id: pages.id, title: pages.title });
      };
      const insertContactPage = async () => {
        return await db
          .insert(contact)
          .values(defaultPages[1])
          .returning({ id: pages.id, title: pages.title });
      };
      const insertCVPage = async () => {
        return await db
          .insert(cv)
          .values(defaultPages[2])
          .returning({ id: pages.id, title: pages.title });
      };
      const insertCollection = async () => {
        return await db
          .insert(collection)
          .values(defaultPages[3])
          .returning({ id: pages.id, title: pages.title });
      };
      const aboutPage = await insertAboutPage();
      const contactPage = await insertContactPage();
      const cvPage = await insertCVPage();
      const collectionPage = await insertCollection();
    };
    const id = Date.now();
    const username =
      msg.data.email_addresses[0].email_address.split('@')[0] + String(id);
    const displayName = msg.data.first_name + ' ' + msg.data.last_name;

    const newUser: NewUser = {
      authId: msg.data.id,
      username: username,
      email: msg.data.email_addresses[0].email_address,
      firstName: msg.data.first_name || 'User',
      lastName: msg.data.first_name || 'User',
      displayName: msg.data.first_name ? displayName : username,
      plan: 'free',
    };

    await insertUser(newUser);
  }

  if (msg.type === 'user.deleted') {
    await db.delete(users).where(eq(users.authId, msg.data.id));
  }

  if (msg.type === 'user.updated') {
    await db
      .update(users)
      .set({ email: msg.data.email_addresses[0].email_address })
      .where(eq(users.authId, msg.data.id));
  }

  return new Response('OK', { status: 200 });
}
process.env.NODE_ENV === 'development' && events.close();
