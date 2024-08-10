import React from 'react';
import { Suspense } from 'react';
import { getCVPageDataForSite } from '../../lib/requests';
import { ICVPage } from '../../interfaces/ICVPage';
import CVSection from './CVSection';
import CVPage from './CVPage';

export default async function page({ params }: { params: { domain: string } }) {
  const domain = decodeURIComponent(params.domain);
  const res = await getCVPageDataForSite(domain, 'cv');

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
