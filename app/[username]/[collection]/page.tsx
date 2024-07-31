import React from 'react';
import Image from 'next/image';

import { getCollectionDataForSite } from '@/app/lib/data';
import { ICollection } from '@/app/interfaces/ICollection';
import Piece from './piece';

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
  } = await getCollectionDataForSite(username, 'work');

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
      <section className="my-5 flex w-full flex-col justify-center lg:mx-20 lg:flex-row">
        {imgSrc && (
          <>
            <div className="mx-1 flex h-[350px] flex-col lg:m-5 lg:mx-0 lg:h-[400px] lg:w-1/2 lg:w-[500px]">
              <div className="relative h-full w-full">
                <Image
                  fill
                  src={imgSrc}
                  style={{ objectFit: 'contain' }}
                  alt="cover"
                />
              </div>
              <div className="mt-2">
                <span className="text-sm italic text-gray-600">
                  {imgCaption}
                </span>
              </div>
            </div>
          </>
        )}

        <div className="mx-1 my-5 flex-1 lg:m-5 lg:w-1/2">
          <h1 className="text-2xl leading-9">{title}</h1>
          <h3 className="text-sm leading-7 text-gray-600">{subheading}</h3>
          <p className="text-sm leading-7 text-gray-600">{description}</p>
          <p className="my-4 text-sm text-gray-600">
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
          <p className="text-sm leading-7 text-gray-600">
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
      <section className="flex w-full flex-wrap justify-center">
        {works && works.map((work) => <Piece data={work} />)}
      </section>
    </main>
  );
}
