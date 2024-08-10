'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ICollection } from '@/app/interfaces/ICollection';
import { updateCollectionVisibility } from '../../../../lib/data';

// need to go around and find where selects like this are used and update form correctly with value defaultValue etc
export default function Visibility({
  collection,
}: {
  collection: ICollection;
}) {
  const visibilityHandler = async (value: string) => {
    await updateCollectionVisibility(collection.id, value);
  };
  return (
    <div className="flex items-center justify-between">
      <Tabs
        value={collection.visibility || 'private'}
        onValueChange={(val) => visibilityHandler(val)}
      >
        <TabsList className="flex items-center space-x-4">
          <TabsTrigger name="visibility" value="public">
            Public
          </TabsTrigger>
          <TabsTrigger name="visibility" value="private">
            Private
          </TabsTrigger>
          <TabsTrigger name="visibility" value="archive">
            Archive
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
