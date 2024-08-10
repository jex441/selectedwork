import { unstable_cache } from 'next/cache';
import { db } from '../db';
import { users } from '../db/schema';

import { eq, or } from 'drizzle-orm';
import { getCollectionDataForSite } from './data';

export async function getSiteData(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.split('.')[0]
    : false;
  const data = await getCollectionDataForSite(
    subdomain ? subdomain : domain,
    null,
  );

  return data;
}
