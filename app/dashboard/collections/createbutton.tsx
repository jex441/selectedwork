'use client';
import React from 'react';
import { getUserCollections, createCollection } from '../../lib/data';
import { Button } from '@/components/ui/button';

export default function createbutton() {
  const createCollectionHandler = async () => {
    await createCollection();
  };
  return (
    <Button className="m-8" size="lg" onClick={() => createCollectionHandler()}>
      + Create New Collection
    </Button>
  );
}
