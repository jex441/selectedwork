'use client';

import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UploadButton } from '../../../../lib/uploadthing';
import { useFormState } from 'react-dom';
import { INewsPost } from '../../../../interfaces/INewsPost';

import { updateAbout } from '@/app/lib/data';
import Image from 'next/image';
import { State } from '@/app/lib/data';

export default function page({ data }: { data: INewsPost }) {
  const initialState: State = { message: null, errors: {} };
  const [imgSrc, setImgSrc] = useState(data.imgSrc);

  return (
    <form>
      <header className="mb-4 flex w-full items-center justify-between pb-4 md:space-x-4">
        <h1 className="text-lg font-bold">News</h1>
        <div className="flex w-full items-center justify-end space-x-4">
          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Save Changes
          </Button>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="order-2 space-y-6">
          <div>
            <Label htmlFor="heading">Title</Label>
            <Input
              id="heading"
              name="heading"
              placeholder="Enter heading"
              defaultValue={data.heading ?? ''}
            />
          </div>
          <div>
            <Label htmlFor="subheading">SubHeading</Label>
            <Input
              id="subheading"
              name="subheading"
              placeholder="Subheading"
              defaultValue={data.subHeading ?? ''}
            />
          </div>
          <div>
            <Label htmlFor="page-description">Text</Label>
            <Textarea
              id="text"
              name="text"
              placeholder="About you"
              className="min-h-[220px]"
              defaultValue={data.body ?? ''}
            />
          </div>
          <div>
            <Label>Links</Label>
            <div className="flex flex-col"></div>
          </div>
        </div>
      </div>
      <div className="order-1 space-y-6">
        <div className="flex flex-col justify-start space-y-4">
          <Label>Your photo</Label>
          <div className="relative my-4 flex h-[200px] w-[300px] items-center justify-center md:h-[300px] md:w-[500px]">
            {imgSrc ? (
              <Image
                src={imgSrc ?? ''}
                className="object-contain"
                fill={true}
                alt="Image"
              />
            ) : (
              <div className="border-1 block flex h-full w-full items-center justify-center rounded-md bg-gray-100 text-gray-300">
                {' '}
                No image
              </div>
            )}
            <Input name="imgSrc" type="hidden" value={imgSrc ?? ''} />
          </div>
          <UploadButton
            className="transform-color self-start ut-button:bg-gray-700 ut-button:text-white ut-button:hover:bg-gray-600 ut-allowed-content:hidden"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImgSrc(res[0].url);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          <div className="space-y-2"></div>
        </div>
      </div>
    </form>
  );
}
