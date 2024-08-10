import { notFound } from 'next/navigation';
import { getSiteData } from '@/app/lib/fetchers';
import React from 'react';
import Image from 'next/image';
import { ICollection } from '@/app/interfaces/ICollection';
import Piece from './[collection]/piece';
import { IWork } from '@/app/interfaces/IWork';
import UserSite from './[collection]/page';

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  // const res = await getSiteData(domain);

  // if (!res.data) {
  //   return <div>not found</div>;
  //   // notFound();
  // }
  return <UserSite params={params} />;
}
