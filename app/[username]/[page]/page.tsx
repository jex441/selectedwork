import React from 'react';
import { db } from '../../../app/db';
import { users } from '../../../app/db/schema';
import {
  getPageDataForSite,
  getContactPageData,
  getCVPageData,
  getCollection,
} from '@/app/lib/data';

export default async function page({
  params,
}: {
  params: { username: string; page: string };
}) {
  let data = await getPageDataForSite(params.username, params.page);
  return (
    <div>
      <div>{data && data.heading !== null && data.heading}</div>

      <div>{data && data.heading !== null && data.text}</div>
    </div>
  );
}
