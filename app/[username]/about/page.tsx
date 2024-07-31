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

  const {
    imgSrc,
    imgCaption,
    heading,
    text,
    linkSrc1,
    linkText1,
    linkSrc2,
    linkText2,
    subheading,
  } = res.data || {};

  return (
    <main className="flex flex-col items-start justify-center lg:flex-row">
      <section className="relative m-1 flex h-[300px] w-full flex-col object-contain lg:m-10 lg:h-[490px] lg:w-1/2">
        <div className="relative h-[320px] w-full lg:h-[480px] ">
          {imgSrc && (
            <Image
              fill
              src={imgSrc}
              style={{ objectFit: 'contain' }}
              alt={imgCaption ?? 'about the artist'}
            />
          )}
        </div>
        <div className="w-full text-sm text-gray-700">{imgCaption}</div>
      </section>
      <section className="m-1 w-full lg:m-10 lg:w-1/2">
        <h1 className="text-xl leading-8">{heading}</h1>
        <h3 className="text-sm leading-8">{subheading}</h3>
        <p className="my-4 text-sm text-sm leading-7 text-gray-700">{text}</p>
        {linkSrc1 && (
          <p className="my-2 text-sm leading-7 text-gray-700 underline hover:text-black">
            <a href={linkSrc1} target="_blank">
              {linkText1}
            </a>
          </p>
        )}
        {linkSrc2 && (
          <p className="my-2 text-sm leading-7 text-gray-700 underline hover:text-black">
            <a href={linkSrc2} target="_blank">
              {linkText2}
            </a>
          </p>
        )}
      </section>
    </main>
  );
}
