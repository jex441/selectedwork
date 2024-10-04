'use client';

import React from 'react';
import { ICVPage } from '../../../../interfaces/ICVPage';
import CVSection from './CVSection';
import { Divide } from 'lucide-react';

export default function CVPage({ data }: { data: ICVPage }) {
  return (
    <main className="mt-20 flex w-full flex-col items-start justify-center self-start px-2 lg:pl-[100px]">
      {data.pdf && (
        <section className="flex w-full flex-col items-end justify-center lg:w-2/3">
          <a
            href={data.pdf}
            className="fade-in-up-simple text-[12px] text-lightGray hover:text-mediumGray hover:underline"
            target="_blank"
          >
            View as PDF
          </a>
        </section>
      )}
      {data !== null && data.education.length > 0 && (
        <CVSection data={data} heading="Education" categoryId="education" />
      )}
      {data !== null && data.soloExhibitions.length > 0 && (
        <CVSection
          data={data}
          heading="Solo Exhibitions"
          categoryId="soloExhibitions"
        />
      )}
      {data !== null && data.groupExhibitions.length > 0 && (
        <CVSection
          data={data}
          heading="Group Exhibitions"
          categoryId="groupExhibitions"
        />
      )}
      {data !== null && data.awards.length > 0 && (
        <CVSection data={data} heading="Awards" categoryId="awards" />
      )}
      {data !== null && data.press.length > 0 && (
        <CVSection data={data} heading="Press" categoryId="press" />
      )}
      {data !== null && data.residencies.length > 0 && (
        <CVSection data={data} heading="Residencies" categoryId="residencies" />
      )}
      {data !== null && data.teaching.length > 0 && (
        <CVSection data={data} heading="Teaching" categoryId="teaching" />
      )}
    </main>
  );
}
