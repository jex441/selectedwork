'use client';

import Image from 'next/image';
import React from 'react';

export default function CV({
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
        CV
      </section>
    </main>
  );
}
