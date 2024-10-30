import React from 'react';
import { Suspense } from 'react';
import { getCVPageDataForSite } from '../../lib/requests';
import CVPage1 from './_templates/1/CV1';
import CVPage2 from './_templates/2/CV2';

export default async function page({ params }: { params: { domain: string } }) {
  const domain = decodeURIComponent(params.domain);
  const res = await getCVPageDataForSite(domain, 'cv');

  if (res.data === null) {
    return 'loading';
  }
  if (res.data.template === 'r1') {
    return (
      <Suspense
        fallback={<div className="flex h-full w-full justify-center">...</div>}
      >
        <CVPage1 data={res.data} />
      </Suspense>
    );
  }
  if (res.data.template === 'r2') {
    return (
      <Suspense
        fallback={<div className="flex h-full w-full justify-center">...</div>}
      >
        <CVPage2 data={res.data} />
      </Suspense>
    );
  }
  if (res.data.template === 'r3') {
    return (
      <Suspense
        fallback={<div className="flex h-full w-full justify-center">...</div>}
      >
        <CVPage1 data={res.data} />
      </Suspense>
    );
  }
}
