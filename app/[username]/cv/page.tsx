import React from 'react';
import { Suspense } from 'react';
import { getCVPageDataForSite } from '../../lib/data';
import { ICVPage } from '../../interfaces/ICVPage';
import CVSection from './CVSection';

export default async function page({
  params,
}: {
  params: { username: string; page: string };
}) {
  const username = params.username;

  const res: {
    status: number;
    user: { username: string } | null;
    data: ICVPage | null;
  } = await getCVPageDataForSite(username, 'cv');

  const {
    imgCaption,
    imgSrc,
    groupExhibitions,
    education,
    soloExhibitions,
    teaching,
    press,
    awards,
    residencies,
  } = res.data || {};

  const categories = [
    'education',
    'groupExhibitions',
    'soloExhibitions',
    'press',
    'awards',
    'residencies',
    'teaching',
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="flex w-full flex-col items-center justify-center lg:flex-row">
        {/* <section className="relative m-1 flex h-[300px] w-full flex-col object-contain lg:m-10 lg:h-[490px] lg:w-1/2">
        <div className="relative h-[320px] w-full lg:h-[480px] "></div>
        <div className="w-full text-sm text-gray-700">{imgCaption}</div>
      </section> */}

        <section className="flex w-full flex-col items-center justify-center lg:mt-10 lg:w-3/4">
          {res.data !== null && res.data.education.length > 0 && (
            <CVSection
              data={res.data}
              heading="Education"
              categoryId="education"
            />
          )}
          {res.data !== null && res.data.soloExhibitions.length > 0 && (
            <CVSection
              data={res.data}
              heading="Solo Exhibitions"
              categoryId="soloExhibitions"
            />
          )}
          {res.data !== null && res.data.groupExhibitions.length > 0 && (
            <CVSection
              data={res.data}
              heading="Group Exhibitions"
              categoryId="groupExhibitions"
            />
          )}
          {res.data !== null && res.data.awards.length > 0 && (
            <CVSection data={res.data} heading="Awards" categoryId="awards" />
          )}
          {res.data !== null && res.data.press.length > 0 && (
            <CVSection data={res.data} heading="Press" categoryId="press" />
          )}
          {res.data !== null && res.data.residencies.length > 0 && (
            <CVSection
              data={res.data}
              heading="Residencies"
              categoryId="residencies"
            />
          )}
          {res.data !== null && res.data.teaching.length > 0 && (
            <CVSection
              data={res.data}
              heading="Teaching"
              categoryId="teaching"
            />
          )}
        </section>
      </main>
    </Suspense>
  );
}
