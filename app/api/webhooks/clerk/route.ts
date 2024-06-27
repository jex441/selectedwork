import { Inter } from "next/font/google";
import { Webhook } from "svix";
import { db } from "../../../db"
import{ users } from "../../../db/schema";

const SmeeClient = require('smee-client')


const smee = new SmeeClient({
  source: 'https://smee.io/72aEQqXl2xc78nBQ',
  target: 'http://localhost:3000/api/webhooks/clerk',
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

  // Flexible type for unknown structures
type UnknownRecord = Record<string, any>;

interface EmailAddress {
  // Example properties
  id: string;
  email: string;
  verified: boolean;
}

interface ExternalAccount {
  // Example properties
  id: string;
  provider: string;
  accountId: string;
}

interface Metadata {
  [key: string]: any;
}

interface User {
  birthday: string;
  created_at: number;
  email_addresses: EmailAddress[];
  external_accounts: ExternalAccount[];
  external_id: string;
  first_name: string;
  gender: string;
  id: string;
  image_url: string;
  last_name: string;
  last_sign_in_at: number;
  object: string;
  password_enabled: boolean;
  phone_numbers: string[];
  primary_email_address_id: string;
  primary_phone_number_id: string | null;
  primary_web3_wallet_id: string | null;
  private_metadata: Metadata;
  profile_image_url: string;
  public_metadata: Metadata;
  two_factor_enabled: boolean;
  unsafe_metadata: UnknownRecord; // Flexible type for unknown structure
  updated_at: number;
  username: string | null;
  web3_wallets: string[];
}

interface Event {
  data: User;
  object: string;
  type: string;
}

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

  console.log(msg);

  if(msg.type === "user.created") { 
 await db.insert(users).values({
  username: msg.data.first_name + msg.data.last_name,
  email: msg.data.email_addresses[0].email,
  firstName: msg.data.first_name,
  lastName: msg.data.last_name,
  flagged: false,
  student: false,
 })

  }
  return new Response("OK", { status: 200 });

}
events.close()
