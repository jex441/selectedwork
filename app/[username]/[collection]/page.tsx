import React from 'react';
import Image from 'next/image';

import { getCollectionDataForSite } from '@/app/lib/data';
import { ICollection } from '@/app/interfaces/ICollection';
import Piece from './piece';

export default async function Work({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const username = params.username;
  const collection = params.collection;
  type user = { username: string; displayName: string };

  const res: {
    status: number;
    user: user | null;
    data: ICollection | null;
  } = await getCollectionDataForSite(username, collection);

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

  if (!res || !res.user || !res.user?.displayName || !res.data) {
    return 'loading';
  }

  return (
    <main className="flex w-full flex-wrap justify-center">
      <section className="fade-in-up-simple flex flex-col justify-center lg:w-4/5 lg:flex-row lg:gap-10">
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
                <span className="text-mediumGray text-sm italic">
                  {imgCaption}
                </span>
              </div>
            </div>
          </>
        )}

        <div className="fade-in-right-simple mx-1 my-5 flex-1 lg:m-5 lg:w-1/2">
          <h1 className="text-mediumGray text-xl leading-9">{title}</h1>
          <h3 className="text-mediumGray text-sm leading-9">{subheading}</h3>
          <p className="text-mediumGray text-xs leading-7">{description}</p>
          <p className="text-mediumGray my-4 text-sm">
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

     <section className="mg:grid-cols-2 mb-10 grid w-full grid-cols-1 gap-1 gap-y-10 lg:grid-cols-4 lg:px-20">
        {works &&
          res.user !== null &&
          works.map((work, index) => (
            <Piece
              index={index}
              works={works}
              artist={res.user ? res.user.displayName : ''}
              key={work.id}
              data={work}
            />
          ))}
      </section>
    </main>
  );
}
