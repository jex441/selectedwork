import { getWorkshopsPageDataForSite } from '@/app/lib/requests';
import React from 'react';
import Workshops1 from './_templates/1/Workshops1';
import Workshops2 from './_templates/2/Workshops2';
import { IWorkshopsPage } from '../../interfaces/IWorkshopsPage';

export default async function Classes({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const res = await getWorkshopsPageDataForSite(domain);

  if (!res.data) {
    return <div>error</div>;
  }

  if (res.data.template === 'w1') {
    return <Workshops1 data={res.data} />;
  }
  if (res.data.template === 'w2') {
    return <Workshops1 data={res.data} />;
  }
  if (res.data.template === 'w3') {
    return <Workshops1 data={res.data} />;
  }
}
