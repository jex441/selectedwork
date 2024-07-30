import Image from 'next/image';
import React from 'react';

import { IContactPage } from '@/app/interfaces/IContactPage';
import { getContactPageDataForSite } from '@/app/lib/data';

export default async function Contact({
  params: { username, page },
}: {
  params: { username: string; page: string };
}) {
  const res: {
    status: number;
    user: { username: string } | null;
    data: IContactPage | null;
  } = await getContactPageDataForSite(username, 'contact');

  const { imgSrc, imgCaption, heading, text, linkText1 } = res.data || {};

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
