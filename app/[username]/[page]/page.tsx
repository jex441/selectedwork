import React from 'react';
import { db } from '../../../app/db';
import { users } from '../../../app/db/schema';
import { getPageData } from '@/app/lib/data';
export default async function page({
  params,
}: {
  params: { slug: string; page: string };
}) {
  const data = await getPageData('About');
  console.log('d', data);
  return <div>{JSON.stringify(data)}</div>;
}
