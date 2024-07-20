import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import { getUserCollections, createCollection } from '../../lib/data';
import CreateButton from './createbutton';
import placeholder from '../../assets/placeholder.png';

export default async function Invoices() {
  const data = await getUserCollections();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <header className="flex h-10 w-full items-center justify-between bg-background px-4 md:px-6">
        My Collections
      </header>
      <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data &&
          data.map((collection) => {
            const thumbnail = collection.works[0]?.media[0]?.url;
            return (
              <div className="group relative overflow-hidden rounded-lg">
                <Link
                  href={`/dashboard/collections/${collection.slug}`}
                  className="absolute inset-0 z-10"
                  prefetch={false}
                >
                  <span className="sr-only">View Image</span>
                </Link>
                <Image
                  src={thumbnail ?? placeholder}
                  alt="Image 7"
                  width={400}
                  height={300}
                  className="h-60 w-full object-cover"
                />
                <div className="bg-white p-4 dark:bg-gray-950">
                  <h3 className="text-lg font-semibold md:text-xl">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    added on 09-21-2021
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      <footer className="flex h-20 w-full items-center justify-end bg-background px-4 md:px-6">
        <div className="border- flex items-center gap-4">
          <CreateButton />
        </div>
      </footer>
    </main>
  );
}
