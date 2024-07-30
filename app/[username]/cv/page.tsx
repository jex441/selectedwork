import Image from 'next/image';
import React from 'react';

import { ICVPage } from '@/app/interfaces/ICVPage';
import { getCVPageDataForSite } from '@/app/lib/data';

export default async function CV({
  params: { username, page },
}: {
  params: { username: string; page: string };
}) {
  const res: {
    status: number;
    user: { username: string } | null;
    data: ICVPage | null;
  } = await getCVPageDataForSite(username, 'cv');

  const { imgSrc, imgCaption } = res.data || {};

  return (
    <main className="flex flex-row items-start justify-center">
      <section className="m-10 flex w-1/2 items-center justify-center">
        CV
      </section>
    </main>
  );
}
