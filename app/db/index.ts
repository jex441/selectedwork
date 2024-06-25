import { drizzle } from 'drizzle-orm/vercel-postgres';
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

config({ path: '.env.local' });

const sql = neon(process.env.POSTGRES_URL!)
export const db = drizzle(sql);