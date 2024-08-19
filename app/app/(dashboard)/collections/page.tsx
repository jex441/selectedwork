import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import { getUserCollections, createCollection } from '../../../lib/data';
import CreateButton from './createbutton';
import placeholder from '../../../assets/placeholder.png';
import Collection from './[slug]/page';
import CollectionsGrid from './CollectionsGrid';

export default async function Invoices() {
  const data = await getUserCollections();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <header className="flex h-10 w-full items-center justify-between bg-background px-4 md:px-6">
        My Collections
      </header>
      {data && <CollectionsGrid data={data} />}

      <footer className="flex h-20 w-full items-center justify-end bg-background px-4 md:px-6">
        <div className="border- flex items-center gap-4">
          <CreateButton />
        </div>
      </footer>
    </main>
  );
}
