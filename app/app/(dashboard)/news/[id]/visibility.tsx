'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { INewsPost } from '@/app/interfaces/INewsPost';
import { updateNewsPost } from '../../../../lib/data';
import { toast } from 'react-hot-toast';

export default function Visibility({
  state,
  setState,
}: {
  state: INewsPost;
  setState: (newState: INewsPost) => void;
}) {
  const visibilityHandler = async (value: boolean) => {
    await updateNewsPost({ ...state, visibility: value }).then(() => {
      setState(
        (prev: INewsPost) => ({ ...prev, visibility: value }) as INewsPost,
      ); // Change the type of the parameter to INewsPost
      toast.success('Visibility updated');
    });
  };
  return (
    <div className="flex items-center justify-between">
      <Tabs
        value={state.visibility ? 'true' : 'false'}
        onValueChange={(val) => visibilityHandler(val === 'true')}
      >
        <TabsList className="flex items-center space-x-4">
          <TabsTrigger name="visibility" value="true">
            Public
          </TabsTrigger>
          <TabsTrigger name="visibility" value="false">
            Private
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
