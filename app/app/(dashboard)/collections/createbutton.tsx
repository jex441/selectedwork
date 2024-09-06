'use client';
import React from 'react';
import { getUserCollections, createCollection } from '../../../lib/data';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function createbutton() {
  const createCollectionHandler = async () => {
    await createCollection();
  };
  return (
    <Button className="m-8" size="lg" onClick={() => createCollectionHandler()}>
      <PlusCircle className="mr-2 h-4 w-4" />
      Create New Collection
    </Button>
  );
}
