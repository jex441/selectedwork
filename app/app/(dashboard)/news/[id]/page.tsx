import React from 'react';
import { INewsPost } from '../../../../interfaces/INewsPost';
import EditPostForm from './editPostForm';
import { getNewsPostData } from '../../../../lib/data';

export default async function Component({
  params,
}: {
  params: { id: number };
}) {
  const data: INewsPost | undefined = await getNewsPostData(params.id);

  return (
    <div className="container mx-auto py-4 md:px-4 md:px-6 lg:px-8">
      {data && <EditPostForm data={data} />}
    </div>
  );
}
