import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import {
  getUserCollections,
  createCollection,
  getUserCollection,
} from '../../../lib/data';
import CreateButton from './createbutton';
import placeholder from '../../../assets/placeholder.png';
import Collection from './[slug]/page';
import CollectionsGrid from './CollectionsGrid';

export default async function Collections() {
  let data = await getUserCollections();
  return (
    <main className="flex w-full flex-1 flex-col p-4">
      <header className="flex w-full items-center justify-between space-x-4">
        <h1 className="text-lg font-bold">My Collections</h1>
      </header>
      {data && <CollectionsGrid data={data} />}
    </main>
  );
}
