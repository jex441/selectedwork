'use client';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ICollection } from '@/app/interfaces/ICollection';

// Need to update based on selected visibility
// need to add states to schema
// need to go around and find where selects like this are used and update form correctly with value defaultValue etc
export default function Visibility({
  collection,
}: {
  collection: ICollection;
}) {
  const [galleryState, setGalleryState] = useState('public');
  return (
    <div className="flex items-center justify-between">
      <Tabs value={galleryState} onValueChange={setGalleryState}>
        <TabsList className="flex items-center space-x-4">
          <TabsTrigger value="public">Public</TabsTrigger>
          <TabsTrigger value="private">Private</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
