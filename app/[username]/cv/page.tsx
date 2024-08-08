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

  const request = async () => {
    return await fetch(
      `${process.env.BASE_URL}/api/requests/getCVPageDataForSite${username !== null ? `/${username}` : ''}`,
      {
        method: 'GET',
      },
    ).then((res) => res.json());
  };

  const res = await request();

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
