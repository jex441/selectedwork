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
    <main className="flex w-full flex-1 flex-col gap-2 p-4">
      <header className="flex flex-col items-center justify-between space-y-4 bg-background p-4 sm:flex-row sm:space-y-0 sm:p-6">
        <h1 className="text-3xl font-bold tracking-tight">Collections</h1>
        <CreateButton />
      </header>
      {data && <CollectionsGrid data={data} />}
    </main>
  );
}
