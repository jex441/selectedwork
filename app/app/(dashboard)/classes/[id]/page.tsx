import React from 'react';
import { IWorkshop } from '../../../../interfaces/IWorkshop';
import EditPostForm from './editPostForm';
import { getWorkshopData } from '../../../../lib/data';

export default async function Component({
  params,
}: {
  params: { id: number };
}) {
  const data: IWorkshop | undefined = await getWorkshopData(params.id);

  return (
    <div className="container mx-auto py-4 md:px-4 md:px-6 lg:px-8">
      {data && <EditPostForm data={data} />}
    </div>
  );
}
