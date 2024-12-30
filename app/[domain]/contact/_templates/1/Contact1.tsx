'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

import { IContactPage } from '@/app/interfaces/IContactPage';
import ContactForm from './ContactForm';

export default function page({ data }: { data: IContactPage }) {
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
    instagram,
  } = data || {};
  const isLargeScreen = useMediaQuery({ query: '(min-width: 700px)' });
  const [imageWidth, setImageWidth] = useState(
    isLargeScreen ? '260px' : '100%',
  );
  return (
    <main className="mb-20 flex w-full flex-col items-start justify-center px-4 lg:flex-row lg:gap-14 lg:px-20 lg:pt-10">
      <section className="fade-in-up-simple relative flex max-h-[520px] w-full flex-col object-contain lg:h-[490px] lg:w-1/2">
        <div className="relative h-auto w-full lg:max-h-[480px] ">
          {imgSrc && (
            <Image
              height={520}
              width={600}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 500px"
              src={imgSrc}
              className="h-full w-full object-contain"
              alt={imgCaption ?? 'about the artist'}
              onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const { naturalWidth, naturalHeight } =
                  e.target as HTMLImageElement;
                console.log(naturalWidth, naturalHeight);
                if (naturalHeight >= naturalWidth && isLargeScreen) {
                  const int = Math.floor((naturalWidth * 490) / naturalHeight);
                  setImageWidth(`${int}px`);
                } else {
                  setImageWidth('100%');
                }
              }}
            />
          )}
        </div>
        <div
          style={{ width: imageWidth }}
          className="mt-4 self-center text-xs italic text-darkGray"
        >
          {imgCaption}
        </div>
      </section>
      <section className="fade-in-right-simple mt-2 w-full lg:mt-0 lg:w-1/2 lg:pr-20">
        <h1 className="text-xl text-darkGray">{heading}</h1>
        <h3 className="text-sm leading-9 text-mediumGray">{subheading}</h3>
        {text &&
          text
            .split('\r\n')
            .map((paragraph) => (
              <p className="my-2 text-xs leading-7 text-mediumGray">
                {paragraph}
              </p>
            ))}

        {linkSrc1 && (
          <p className="my-2 text-sm leading-7 text-mediumGray underline hover:text-black">
            <a href={linkSrc1} target="_blank">
              {linkText1}
            </a>
          </p>
        )}
        {linkSrc2 && (
          <p className="my-2 text-sm leading-7 text-mediumGray underline hover:text-black">
            <a href={linkSrc2} target="_blank">
              {linkText2}
            </a>
          </p>
        )}
        <ContactForm data={data} />
      </section>
    </main>
  );
}
