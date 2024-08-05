import Image from 'next/image';
import React from 'react';

import { IContactPage } from '@/app/interfaces/IContactPage';
import { getContactPageDataForSite } from '@/app/lib/data';
import ContactPage from './ContactPage';
export default async function Contact({
  params: { username, page },
}: {
  params: { username: string; page: string };
}) {
  const res: {
    status: number;
    user: { username: string } | null;
    data: IContactPage | null;
  } = await getContactPageDataForSite(username, 'contact');

  if (res.data === null) {
    return 'loading';
  }
  return <ContactPage data={res.data} />;
}
