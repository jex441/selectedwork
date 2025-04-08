'use client';

import React, { useState } from 'react';
import { IAboutPage } from '../../../../interfaces/IAboutPage';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

export default function About1({ data }: { data: IAboutPage }) {
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
    template,
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
              height={490}
              width={490}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 490px, 490px"
              src={imgSrc}
              priority
              loading="eager"
              quality={85}
              placeholder="empty"
              className="h-full w-full object-contain"
              alt={imgCaption ?? 'about the artist'}
              onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const { naturalWidth, naturalHeight } =
                  e.target as HTMLImageElement;
                if (naturalHeight > naturalWidth && isLargeScreen) {
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
      <section className="fade-in-right-simple mt-2 w-full lg:mt-0 lg:w-1/2">
        <h1 className="text-xl leading-9 text-darkGray">{heading}</h1>
        <h3 className="text-sm leading-9 text-mediumGray">{subheading}</h3>
        {text &&
          text
            .split('\r\n')
            .map((paragraph: string) => (
              <p className="my-2 text-xs leading-7 text-mediumGray">
                {paragraph}
              </p>
            ))}

        {linkSrc1 && (
          <p className="my-2 text-sm leading-7 text-mediumGray underline hover:text-darkGray">
            <a href={linkSrc1} target="_blank">
              {linkText1}
            </a>
          </p>
        )}
        {linkSrc2 && (
          <p className="my-2 text-sm leading-7 text-mediumGray underline hover:text-darkGray">
            <a href={linkSrc2} target="_blank">
              {linkText2}
            </a>
          </p>
        )}
      </section>
    </main>
  );
}
