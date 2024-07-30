import Image from 'next/image';
import React from 'react';

import { getAboutPageDataForSite } from '@/app/lib/data';
import { IAboutPage } from '@/app/interfaces/IAboutPage';

export default async function About({
  params: { username, page },
}: {
  params: { username: string; page: string };
}) {
  const res: {
    status: number;
    user: { username: string } | null;
    data: IAboutPage | null;
  } = await getAboutPageDataForSite(username, 'about');

  const { imgSrc, imgCaption, heading, text, linkText1 } = res.data || {};

  return (
    <main className="flex flex-row items-start justify-center">
      <section className="m-10 flex w-1/2 items-center justify-center">
        {imgSrc && (
          <Image
            src={imgSrc}
            width={500}
            height={500}
            objectFit="contain"
            alt={imgCaption ?? 'about the artist'}
          />
        )}
      </section>
      <section className="m-10 w-1/2">
        <h1 className="text-xl">{heading}</h1>
        <div className="">{text}</div>
        <div className="">{linkText1}</div>
      </section>
    </main>
  );
}
