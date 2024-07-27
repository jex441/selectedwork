import React from 'react';
import { db } from '../../../app/db';
import { users } from '../../../app/db/schema';
import About from './About';
import Contact from './Contact';
import CV from './CV';
import Work from './Work';

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
  let page = params.page;
  let username = params.username;
  let data = await getPageDataForSite(username, page);

  if (!data) {
    return 'loading';
  }
  if (page === 'about') {
    return <About data={data} />;
  }
  if (page === 'contact') {
    return <Contact data={data} />;
  }
  if (page === 'cv') {
    return <CV data={data} />;
  }
  if (page === 'work' || '') {
    return <Work data={data} />;
  }
}
