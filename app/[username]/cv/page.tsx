import React from 'react';
import { Suspense } from 'react';
import { getCVPageDataForSite } from '../../lib/requests';
import { ICVPage } from '../../interfaces/ICVPage';
import CVSection from './CVSection';
import CVPage from './CVPage';

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

  if (res.data === null) {
    return 'loading';
  }
  return (
    <Suspense
      fallback={<div className="flex h-full w-full justify-center">...</div>}
    >
      <CVPage data={res.data} />
    </Suspense>
  );
}
