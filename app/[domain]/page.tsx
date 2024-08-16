import React from 'react';
import UserSite from './[collection]/page';
import { getCollectionDataForSite } from '../lib/requests';

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string; collection: null };
}) {
  //In use?
  const domain = decodeURIComponent(params.domain);
  const res = await getCollectionDataForSite(domain, null);
  console.log('res in page', res);

  if (!res.data) {
    return <div>not found</div>;
  }
  return <UserSite params={params} />;
}
