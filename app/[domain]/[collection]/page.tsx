import React from 'react';
import { notFound } from 'next/navigation';

import { getCollectionDataForSite } from '@/app/lib/requests';
import Collection1 from './_templates/1/Gallery1';
import Collection2 from './_templates/2/Gallery2';
import Collection3 from './_templates/3/Gallery3';

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string; collection: string | null };
}) {
  const domain = decodeURIComponent(params.domain);

  const res = await getCollectionDataForSite(domain, params.collection);

  if (!res.data) {
    return <div>not found</div>;
    // notFound();
  }

  if (!res.data) {
    return 'loading';
  }
  return <Collection3 data={res.data} user={res.user} />;

  // if (res.data.template === 'g1') {
  //   return <Collection1 data={res.data} user={res.user} />;
  // }
  // if (res.data.template === 'g2') {
  //   return <Collection2 data={res.data} user={res.user} />;
  // }
  // if (res.data.template === 'g3') {
  //   return <Collection3 data={res.data} user={res.user} />;
  // }
}
