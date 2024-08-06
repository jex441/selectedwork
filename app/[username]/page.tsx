import React from 'react';
import Image from 'next/image';

import { getCollectionDataForSite } from '@/app/lib/data';
import { ICollection } from '@/app/interfaces/ICollection';
import Piece from './[collection]/piece';

export default async function Work({
  params,
}: {
  params: { username: string; page: string };
}) {
  let username = params.username;

  type user = { username: string };

  const res: {
    status: number;
    user: user | null;
    data: ICollection | null;
  } = await getCollectionDataForSite(username, null);

  const {
    imgSrc,
    imgCaption,
    title,
    subheading,
    description,
    linkText1,
    linkSrc1,
    linkText2,
    linkSrc2,
    works,
  } = res.data || {};

  if (!res) {
    return 'loading';
  }

  return (
    <main className="flex w-full flex-wrap justify-center">
      <section className="flex w-4/5 flex-col justify-center lg:flex-row lg:gap-10">
        {imgSrc && (
          <>
            <div className="mx-1 flex flex-col lg:m-5 lg:mx-0 lg:h-[400px] lg:w-1/2 lg:w-[500px]">
              <div className="relative w-full">
                <Image
                  height={0}
                  width={0}
                  src={imgSrc}
                  sizes="100vw"
                  className="w-full object-contain"
                  alt="cover"
                />
              </div>
              <div className="mt-2">
                <span className="text-sm italic text-primary">
                  {imgCaption}
                </span>
              </div>
            </div>
          </>
        )}

        <div className="mx-1 my-5 flex-1 lg:m-5 lg:w-1/2">
          <h1 className="text-xl leading-9 text-primary">{title}</h1>
          <h3 className="text-sm leading-9 text-primary">{subheading}</h3>
          <p className="text-xs leading-7 text-primary">{description}</p>
          <p className="my-4 text-sm text-primary">
            {linkSrc1 && (
              <a
                href={linkSrc1}
                className="underline hover:text-black"
                target="_blank"
              >
                {linkText1}
              </a>
            )}
          </p>
          <p className="text-sm leading-7 text-primary">
            {linkSrc2 && (
              <a
                href={linkSrc2}
                className="underline hover:text-black"
                target="_blank"
              >
                {linkText2}
              </a>
            )}
          </p>
        </div>
      </section>
      <section className="flex w-full flex-wrap justify-around gap-y-10 lg:px-20">
        {works && works.map((work) => <Piece key={work.id} data={work} />)}
      </section>
    </main>
  );
}
