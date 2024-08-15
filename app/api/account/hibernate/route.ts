'use server';

import type { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { db } from '@/app/db';
import { users } from '@/app/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request, res: NextApiResponse) {
  const { email } = await req.json();

  const user = await db.select().from(users).where(eq(users.email, email));
  await db
    .update(users)
    .set({ hibernate: user[0].hibernate ? false : true })
    .where(eq(users.email, email));

  // Not working with the app. subdomain
  revalidatePath('/account');

  return NextResponse.json(200);
}
