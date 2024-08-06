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
  console.log(res.data);
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
    <main className="flex w-full flex-col items-start justify-center lg:flex-row lg:gap-10 lg:pt-10">
      <section className="fade-in-up-simple relative flex h-[300px] w-full flex-col object-contain p-1 lg:h-[490px] lg:w-1/3">
        <div className="relative h-auto w-full lg:max-h-[480px]">
          {imgSrc && (
            <Image
              height={0}
              width={0}
              sizes="100vw"
              src={imgSrc}
              className="h-full w-full object-contain"
              alt={imgCaption ?? 'about the artist'}
            />
          )}
        </div>
        <div className="text-darkGray mt-2 text-sm italic">{imgCaption}</div>
      </section>
      <section className="fade-in-right-simple m-1  w-full lg:w-1/2 lg:pr-20">
        <h1 className="text-darkGray text-xl leading-9">{heading}</h1>
        <h3 className="text-mediumGray text-sm leading-9">{subheading}</h3>
        {text &&
          text
            .split('\r\n')
            .map((paragraph) => (
              <p className="text-mediumGray my-2 text-xs leading-7">
                {paragraph}
              </p>
            ))}

        {linkSrc1 && (
          <p className="text-mediumGray hover:text-darkGray my-2 text-sm leading-7 underline">
            <a href={linkSrc1} target="_blank">
              {linkText1}
            </a>
          </p>
        )}
        {linkSrc2 && (
          <p className="text-mediumGray hover:text-darkGray my-2 text-sm leading-7 underline">
            <a href={linkSrc2} target="_blank">
              {linkText2}
            </a>
          </p>
        )}
      </section>
    </main>
  );
}
