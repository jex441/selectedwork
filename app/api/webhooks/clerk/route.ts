'use server';

import { Webhook } from "svix";
const SmeeClient = require('smee-client')
import { eq } from "drizzle-orm";

import { db } from "../../../db"
import { users, NewUser, pages, InsertPage} from "../../../db/schema";
import { Event } from "./types"

const smee = new SmeeClient({
  source: process.env.WEBHOOK_PROXY_URL!,
  target: process.env.BASE_URL! + 'api/webhooks/clerk',
  logger: console
})

const events = smee.start()

export async function POST(req: Request) {
  const webhookSecret: string = process.env.CLERK_WEBHOOK_SECRET!

  const svix_id = req.headers.get("svix-id") ?? "";
  const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
  const svix_signature = req.headers.get("svix-signature") ?? "";

  const body = await req.text();
  const sivx = new Webhook(webhookSecret);

  let msg;

  try {
    msg = sivx.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as Event; // Add type assertion here
  } catch (err) {
    return new Response("Bad Request", { status: 400 });
  }

  if(msg.type === "user.created") { 
    
    const insertUser = async (user: NewUser) => {
      let userId: number;
      let res = await db.insert(users).values(user).returning({id: users.id})
      userId = res[0].id;

      let defaultPages = [
        {template: "a1", title: "About", userId: userId}, 
        {template: "c1", title: "Contact", userId: userId},
        {template: "h1", title: "Home", userId: userId},
        {template: "g1", title: "Selected Work", userId: userId}, 
        {template: "r1", title: "CV", userId: userId}, 
      ]

      const insertPages = async (defaultPages: InsertPage[]) => {
        await db.insert(pages).values(defaultPages)
      }

      await insertPages(defaultPages)
    }

    const newUser: NewUser = {
      authId: msg.data.id,
      username: msg.data.first_name + msg.data.last_name,
      email: msg.data.email_addresses[0].email_address,
      firstName: msg.data.first_name,
      lastName: msg.data.last_name,
      plan: "free",
      flagged: false,
      student: false,
    };

    await insertUser(newUser);
  }

  if(msg.type === "user.deleted") { 
    await db.delete(users).where(eq(users.authId, msg.data.id))
  }

  if(msg.type === "user.updated") { 
    await db.update(users).set({email: msg.data.email_addresses[0].email_address}).where(eq(users.authId, msg.data.id))
  }

  return new Response("OK", { status: 200 });
}
events.close()
