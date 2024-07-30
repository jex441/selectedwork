import React from 'react';

import { getCVPageDataForSite } from '../lib/data';
import { ICVPage } from '../interfaces/ICVPage';

export default async function page({
  params,
}: {
  params: { username: string; page: string };
}) {
  const username = params.username;

  const res: {
    status: number;
    user: { username: string } | null;
    data: ICVPage | null;
  } = await getCVPageDataForSite(username, 'cv');

  const { imgSrc, imgCaption } = res.data || {};
  console.log(res.data);
  return (
    <main className="flex flex-col items-start justify-center lg:flex-row">
      <section className="relative m-1 flex h-[300px] w-full flex-col object-contain lg:m-10 lg:h-[490px] lg:w-1/2">
        <div className="relative h-[320px] w-full lg:h-[480px] "></div>
        <div className="w-full text-sm text-gray-700">{imgCaption}</div>
      </section>

      <section className="m-1 w-full lg:m-10 lg:w-1/2">
        {/* 
        <h2 className="text-xl leading-8">{section.category}</h2>
        <div className="flex flex-row w-full space-between">
        <span className="text-xl leading-8">{title}</span>
        <span className="text-sm leading-8">{organization}</span>
        <span className="text-sm leading-8">{location}</span>
        <span className="text-sm leading-8">{year}</span>
        </div> */}
      </section>
    </main>
  );
}
