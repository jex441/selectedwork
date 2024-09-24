'use client';

import React from 'react';
import { getUserCollections, createCollection } from '../../../lib/data';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ICollection } from '@/app/interfaces/ICollection';
export default function createbutton({
  collections,
  setCollections,
}: {
  collections: any;
  setCollections: (cols: ICollection[]) => void;
}) {
  const createCollectionHandler = async () => {
    let res = await createCollection();
    let newCollection = res;
    if (newCollection) newCollection.works = [];
    newCollection && setCollections([...collections, newCollection]);
  };
  return (
    <Button
      className="fixed bottom-10 right-5 h-12 w-12 rounded-full text-lg lg:right-10"
      onClick={() => createCollectionHandler()}
    >
      +
    </Button>
  );
}
