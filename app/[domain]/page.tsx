import React from 'react';
import UserSite from './[collection]/page';
import {
  getCollectionDataForSite,
  getLandingPageDataForSite,
} from '../lib/requests';
import Image from 'next/image';
export default async function SiteHomePage({
  params,
}: {
  params: { domain: string; collection: null };
}) {
  //In use?
  const domain = decodeURIComponent(params.domain);
  const res = await getCollectionDataForSite(domain, null);
  const landingData = await getLandingPageDataForSite(domain);

  if (!res.data) {
    return <div>not found</div>;
  }

  if (landingData && landingData.imgSrc) {
    return (
      <div className="flex flex-col items-center justify-center px-4 lg:w-full lg:justify-start">
        <div className="relative flex w-full justify-center lg:max-h-[600px] lg:max-w-[800px]">
          <Image
            alt="text"
            height={400}
            width={500}
            src={landingData.imgSrc}
            sizes="100vw"
            className="w-full object-contain"
          />
        </div>
        <div className="mt-6 text-center text-[24px] leading-10 text-darkGray">
          {landingData.heading}
        </div>
        <div className="text-center text-[16px] leading-10 text-darkGray">
          {landingData.subHeading}
        </div>
      </div>
    );
  }
  return <UserSite params={params} />;
}
