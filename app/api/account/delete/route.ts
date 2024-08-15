'use server';

import type { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { db } from '@/app/db';
import { users } from '@/app/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request, res: NextApiResponse) {
  const { email } = await req.json();

  const user = await db.delete(users).where(eq(users.email, email));

  return NextResponse.json(200);
}
