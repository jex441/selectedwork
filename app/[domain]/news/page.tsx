import { getNewsPageDataForSite } from '@/app/lib/requests';
import React from 'react';
import News1 from './_templates/1/News1';
import News2 from './_templates/2/News2';
import { INewsPage } from '../../interfaces/INewsPage';

export default async function About({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const res = await getNewsPageDataForSite(domain);
  console.log('res:', res);
  if (!res.data) {
    return <div>error</div>;
  }

  if (res.data.template === 'n1') {
    return <News1 data={res.data} />;
  }
  if (res.data.template === 'n2') {
    return <News2 data={res.data} />;
  }
}
