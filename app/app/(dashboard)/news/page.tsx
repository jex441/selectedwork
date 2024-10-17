import React from 'react';
import { INewsPage } from '../../../interfaces/INewsPage';
import NewsForm from './newsform';
import { getNewsPageData } from '../../../lib/data';

export default async function Component() {
  const data: INewsPage | undefined = await getNewsPageData();

  return (
    <div className="container mx-auto py-4 md:px-4 md:px-6 lg:px-8">
      {data && <NewsForm data={data} />}
    </div>
  );
}
