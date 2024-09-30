import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ICollection } from '@/app/interfaces/ICollection';
import Piece from './piece';
import { IWork } from '@/app/interfaces/IWork';

export default function page({ data, user }: { data: ICollection; user: any }) {
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
  } = data || {};

  if (!works) {
    return 'loading';
  }

  return (
    <main className="mt-20 flex w-full flex-wrap justify-center">
      <section className="fade-in-up-simple flex flex-col justify-between lg:w-5/6 lg:flex-row lg:gap-5">
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
                <span className="text-sm italic text-mediumGray">
                  {imgCaption}
                </span>
              </div>
            </div>
          </>
        )}

        <div className="fade-in-right-simple mx-1 my-5 flex-1 bg-red-100 lg:mx-0 lg:w-auto">
          <h1 className="text-xl leading-9 text-mediumGray">
            {imgSrc || subheading || linkSrc1 || linkSrc2 || description
              ? title
              : null}
          </h1>
          <h3 className="text-sm leading-9 text-mediumGray">{subheading}</h3>
          <div className="text-xs leading-7 text-mediumGray">
            {description &&
              description
                .split('\r\n')
                .map((paragraph: string) => (
                  <p className="my-2 text-xs leading-7 text-mediumGray">
                    {paragraph}
                  </p>
                ))}
          </div>
          <p className="my-4 text-sm text-mediumGray">
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
      <section className="mg:grid-cols-2 mb-10 grid w-full grid-cols-1 gap-x-2 gap-y-16 lg:grid-cols-4 lg:px-20">
        {works &&
          works.map((work: IWork, index: number) => (
            <Piece
              index={index}
              works={works}
              artist={user.displayName}
              key={work.id}
              data={work}
            />
          ))}
      </section>
    </main>
  );
}
