'use client';
import Image from 'next/image';

import React from 'react';
import Piece from './piece';
export default function Work({ data }: {}) {
  console.log(data);
  return (
    <main className="flex w-full flex-wrap justify-center">
      <section className="my-10 flex w-full flex-col justify-center lg:mx-20 lg:flex-row">
        {data.imgSrc && (
          <>
            <div className="mx-1 flex h-[350px] flex-col lg:m-5 lg:mx-0 lg:h-[400px] lg:w-1/2 lg:w-[500px]">
              <div className="relative h-full w-full">
                <Image
                  fill
                  src={data.imgSrc}
                  objectFit="contain"
                  style={{ objectFit: 'contain' }}
                  alt="cover"
                />
              </div>
              <div className="mt-2">
                <span className="text-sm italic text-gray-600">
                  {data.imgCaption}
                </span>
              </div>
            </div>
          </>
        )}

        <div className="mx-1 my-5 flex-1 lg:m-5 lg:w-1/2">
          <h1 className="text-xl leading-9">{data.title}</h1>
          <h3 className="text-sm leading-7 text-gray-600">{data.subheading}</h3>
          <p className="text-sm leading-7 text-gray-600">{data.description}</p>
          <p className="my-4 text-sm text-gray-600">
            <a
              href={data.linkSrc1}
              className="underline hover:text-black"
              target="_blank"
            >
              {data.linkText1}
            </a>
          </p>
          <p className="text-sm leading-7 text-gray-600">
            <a
              href={data.linkSrc2}
              className="underline hover:text-black"
              target="_blank"
            >
              {data.linkText2}
            </a>
          </p>
        </div>
      </section>
      <section className="flex w-full flex-wrap justify-center">
        {data && data.works.map((work) => <Piece data={work} />)}
      </section>
    </main>
  );
}
