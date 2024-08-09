import Image from 'next/image';
import React from 'react';

import { IContactPage } from '@/app/interfaces/IContactPage';
import { getContactPageDataForSite } from '@/app/lib/data';
import ContactPage from './ContactPage';
export default async function Contact({
  params,
}: {
  params: { domain: string };
}) {
  const request = async () => {
    return await fetch(
      `${process.env.BASE_URL}/api/requests/getContactPageDataForSite/${params.domain}`,
      {
        method: 'GET',
      },
    ).then((res) => res.json());
  };

  const res = await request();

  if (res.data === null) {
    return 'loading';
  }
  return <ContactPage data={res.data} />;
}
