import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import { getUserCollection } from '../../../../lib/data';
import { ICollection } from '../../../../interfaces/ICollection';
import placeholder from '../../../assets/placeholder.png';
import Visibility from './visibility';
import WorkThumbnail from './WorkThumbnail';
import WorksGrid from './WorksGrid';
export default async function Collection({
  params,
}: {
  params: { slug: string };
}) {
  const collection: ICollection | undefined = await getUserCollection(
    params.slug,
  );

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <main className="flex flex-1 flex-col gap-2 p-2 md:gap-4 md:gap-8 md:p-4 md:p-6">
      <header className="flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="#" className="text-lg font-semibold" prefetch={false}>
            {collection.title}
          </Link>
          <Link
            href={`/collections/${params.slug}/settings`}
            className="text-sm font-medium"
            prefetch={false}
          >
            Settings
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Visibility collection={collection} />
          </div>
          <Link href={`/collections/${params.slug}/new`}>
            <Button className="ml-auto" size="sm">
              Upload Image
            </Button>
          </Link>
        </div>
      </header>
      <WorksGrid collection={collection} />
    </main>
  );
}
