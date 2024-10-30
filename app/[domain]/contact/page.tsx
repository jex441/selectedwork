import React from 'react';

import { getContactPageDataForSite } from '@/app/lib/requests';
import ContactPage1 from './_templates/1/Contact1';
import ContactPage2 from './_templates/2/Contact1';

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
  if (res.data.template === 'c1') {
    return <ContactPage1 data={res.data} />;
  }
  if (res.data.template === 'c2') {
    return <ContactPage2 data={res.data} />;
  }
  if (res.data.template === 'c3') {
    return <ContactPage1 data={res.data} />;
  }
}
