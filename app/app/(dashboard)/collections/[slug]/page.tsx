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
import { Settings } from 'lucide-react';
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
      <header className="flex h-auto w-full flex-col items-start justify-start border-b bg-background md:px-6 lg:h-16 lg:flex-row lg:items-center lg:justify-between lg:px-4">
        <div className="flex items-center gap-4 ">
          <Link href="#" className="text-lg font-semibold" prefetch={false}>
            {collection.title}
          </Link>
          <Link
            href={`/collections/${params.slug}/settings`}
            className="mx-2 text-sm font-medium"
            prefetch={false}
          >
            <Settings />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="my-2 flex items-center gap-2 lg:my-0">
            <Visibility collection={collection} />
          </div>
        </div>
      </header>
      <WorksGrid collection={collection} />
      <Link href={`/collections/${params.slug}/new`}>
        <Button className="fixed bottom-10 right-5 h-12 w-12 rounded-full text-lg lg:right-10">
          +
        </Button>
      </Link>
    </main>
  );
}
