import React from 'react';
import { ILandingPage } from '../../../interfaces/ILandingPage';
import LandingForm from './landingForm';
import { getLandingPageData } from '../../../lib/data';

export default async function Component() {
  const data: ILandingPage | undefined = await getLandingPageData();

  return (
    <div className="container mx-auto py-4 md:px-4 md:px-6 lg:px-8">
      {data && <LandingForm data={data} />}
    </div>
  );
}
