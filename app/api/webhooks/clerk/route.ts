'use server';

import { Webhook } from "svix";
const SmeeClient = require('smee-client')
import { eq } from "drizzle-orm";

import { db } from "../../../db"
import { users, NewUser, pages, InsertPage} from "../../../db/schema";
import { Event } from "./types"
import {insertSections, insertSectionAttributes} from "../../../lib/data"

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
    console.log('CREATED')
    const insertUser = async (user: NewUser) => {
      let userId: number;
      let res = await db.insert(users).values(user).returning({id: users.id})
      userId = res[0].id;

      let defaultPages = [
        {template: "a1", slug: "about", title: "About", userId: userId}, 
        {template: "c1", slug: "contact", title: "Contact", userId: userId},
        {template: "h1", slug: "home", title: "Home", userId: userId},
        {template: "g1", slug: "work", title: "Selected Work", userId: userId}, 
        {template: "r1", slug: "cv", title: "CV", userId: userId}, 
      ]

      const insertPages = async (defaultPages: InsertPage[]) => {
        return await db.insert(pages).values(defaultPages).returning({id: pages.id, title: pages.title})
      }

     const newPages = await insertPages(defaultPages)
console.log(newPages)
      let defaultSections = [
        {pageId: newPages[0].id, type: "content", order: 0}, 
      ]
console.log(defaultSections)
     const newSections = await insertSections(defaultSections)

      let defaultSectionAttributes = [
        {sectionId: newSections[0].id, tag: "about-image", value: "", order: 0}, 
        {sectionId: newSections[0].id, tag: "about-text", value: "", order: 1}, 
        {sectionId: newSections[0].id, tag: "about-heading", value: "", order: 2}, 
      ]

    const newSectionAttributes = await insertSectionAttributes(defaultSectionAttributes);
console.log(newSectionAttributes)
    }


    const newUser: NewUser = {
      authId: msg.data.id,
      username: msg.data.first_name + msg.data.last_name,
      email: msg.data.email_addresses[0].email_address,
      firstName: msg.data.first_name,
      lastName: msg.data.last_name,
      plan: "free",
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
