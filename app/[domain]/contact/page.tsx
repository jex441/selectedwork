import Image from 'next/image';
import React from 'react';

import { IContactPage } from '@/app/interfaces/IContactPage';
import { getContactPageDataForSite } from '@/app/lib/requests';
import ContactPage from './ContactPage';
import { get } from 'http';
export default async function Contact({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);

  const res = await getContactPageDataForSite(domain, 'contact');

  if (res.data === null) {
    return 'loading';
  }
  return <ContactPage data={res.data} />;
}
