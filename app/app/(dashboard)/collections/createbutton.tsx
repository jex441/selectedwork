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
      className="absolute bottom-10 right-10 rounded-2xl"
      size="lg"
      onClick={() => createCollectionHandler()}
    >
      <PlusCircle className="mr-2 h-4 w-4" />
    </Button>
  );
}
