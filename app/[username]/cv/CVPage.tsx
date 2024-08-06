'use client';

import React from 'react';
import { getCVPageDataForSite } from '../../lib/data';
import { ICVPage } from '../../interfaces/ICVPage';
import CVSection from './CVSection';

export default function CVPage({ data }: { data: ICVPage }) {
  return (
    <main className="flex w-full flex-col items-center justify-center lg:flex-row">
      {/* <section className="relative m-1 flex h-[300px] w-full flex-col object-contain lg:m-10 lg:h-[490px] lg:w-1/2">
    <div className="relative h-[320px] w-full lg:h-[480px] "></div>
    <div className="w-full text-sm text-gray-700">{imgCaption}</div>
  </section> */}

      <section className="flex w-full flex-col items-center justify-center lg:mt-10 lg:w-3/4">
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
          <CVSection
            data={data}
            heading="Residencies"
            categoryId="residencies"
          />
        )}
        {data !== null && data.teaching.length > 0 && (
          <CVSection data={data} heading="Teaching" categoryId="teaching" />
        )}
      </section>
    </main>
  );
}
