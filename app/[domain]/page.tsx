import React from 'react';
import UserSite from './[collection]/page';
import { getCollectionDataForSite } from '../lib/requests';
import Image from 'next/image';
export default async function SiteHomePage({
  params,
}: {
  params: { domain: string; collection: null };
}) {
  //In use?
  const domain = decodeURIComponent(params.domain);
  const res = await getCollectionDataForSite(domain, null);

  if (!res.data) {
    return <div>not found</div>;
  }
  let landing = true;
  if (landing) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-red-100">
        <div className="flex flex-1">
          <Image
            alt="text"
            height={400}
            width={500}
            src="/images/landing.jpg"
          />
        </div>
        <div>{res.user.displayName}</div>
        <div>Fine Artist</div>
      </div>
    );
  }
  return <UserSite params={params} />;
}
