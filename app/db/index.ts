import { drizzle } from 'drizzle-orm/neon-http';
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

config({ path: '.env.local' });

const sql = neon(process.env.POSTGRES_URL!)
export const db = drizzle(sql, { schema } );

