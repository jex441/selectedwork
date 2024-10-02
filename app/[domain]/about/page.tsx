import { getAboutPageDataForSite } from '@/app/lib/requests';
import React from 'react';
import About1 from './_templates/1/About1';
import About2 from './_templates/2/About2';
import { IAboutPage } from '../../interfaces/IAboutPage';

export default async function About({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const res = await getAboutPageDataForSite(domain, 'about');

  if (!res.data) {
    return <div>error</div>;
  }

  if (res.data.template === 'a1') {
    return <About1 data={res.data} />;
  }
  if (res.data.template === 'a2') {
    return <About2 data={res.data} />;
  }
}
