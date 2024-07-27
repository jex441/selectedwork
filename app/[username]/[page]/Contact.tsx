'use client';

import Image from 'next/image';
import React from 'react';

export default function Contact({
  data,
}: {
  data: {
    heading: string;
    text: string;
    linkSrc1: string;
    linkText1: string;
    linkSrc2: string;
    linkText2: string;
    imgSrc: string;
    imgCaption: string;
  };
}) {
  const {
    text,
    heading,
    linkSrc1,
    linkText1,
    linkSrc2,
    linkText2,
    imgSrc,
    imgCaption,
  } = data;
  console.log(imgSrc, imgCaption);
  return (
    <main className="flex flex-row items-start justify-center">
      <section className="m-10 flex w-1/2 items-center justify-center">
        <Image
          src={imgSrc}
          width={500}
          height={500}
          objectFit="contain"
          alt={imgCaption}
        />
      </section>
      <section className="m-10 w-1/2 bg-red-100">
        <h1 className="text-xl">{heading}</h1>
        <div className="">{text}</div>
        <div className="">{linkText1}</div>
      </section>
    </main>
  );
}
