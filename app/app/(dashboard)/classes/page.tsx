import React from 'react';
import { IWorkshopsPage } from '../../../interfaces/IWorkshopsPage';
import WorkshopsForm from './workshopsform';
import { getWorkshopsPageData } from '../../../lib/data';

export default async function Component() {
  const data: IWorkshopsPage | undefined = await getWorkshopsPageData();

  return (
    <div className="container mx-auto py-4 md:px-4 md:px-6 lg:px-8">
      {data && <WorkshopsForm data={data} />}
    </div>
  );
}
