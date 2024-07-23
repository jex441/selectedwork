import React from 'react';
import { db } from '../../../app/db';
import { users } from '../../../app/db/schema';
import {
  getPageData,
  getContactPageData,
  getCVPageData,
  getCollection,
} from '@/app/lib/data';

export default async function page({
  params,
}: {
  params: { username: string; page: string };
}) {
  let data;
  if (params.page === 'about') {
    data = await getPageData('About');
  }
  if (params.page === 'contact') {
    data = await getContactPageData('Contact');
  }
  if (params.page === 'cv') {
    data = await getCVPageData('CV');
  } else {
    data = await getCollection(params.username, params.page);
  }
  console.log(data);
  return <div>{JSON.stringify(data)}</div>;
}
