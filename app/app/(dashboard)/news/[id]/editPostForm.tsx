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

import { updateNewsPost } from '@/app/lib/data';
import Image from 'next/image';
import { State } from '@/app/lib/data';
import { Link } from 'lucide-react';

export default function page({ data }: { data: INewsPost }) {
  const [state, setState] = useState(data);

  const changeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    await updateNewsPost(state);
  };
  console.log(state);
  return (
    <form onSubmit={(e) => submitHandler(e)}>
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="order-2 col-span-2 space-y-6">
          <div>
            <Label htmlFor="heading">Title</Label>
            <Input
              onChange={(e) => changeHandler(e)}
              id="heading"
              name="heading"
              placeholder="Enter heading"
              defaultValue={state.heading ?? ''}
            />
          </div>
          <div>
            <Label htmlFor="subheading">Subheading</Label>
            <Input
              onChange={(e) => changeHandler(e)}
              id="subheading"
              name="subHeading"
              placeholder=""
              defaultValue={state.subHeading ?? ''}
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              onChange={(e) => changeHandler(e)}
              id="location"
              name="location"
              placeholder=""
              defaultValue={state.location ?? ''}
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              onChange={(e) => changeHandler(e)}
              id="date"
              name="date"
              placeholder=""
              defaultValue={state.date ?? ''}
            />
          </div>
          <div>
            <Label htmlFor="page-description">Body</Label>
            <Textarea
              onChange={(e) => changeHandler(e)}
              id="text"
              name="body"
              placeholder=""
              className="min-h-[220px]"
              defaultValue={state.body ?? ''}
            />
          </div>
          <div className="grid gap-4">
            <Label>Link</Label>
            <Input
              id="linkSrc1"
              onChange={(e) => changeHandler(e)}
              defaultValue={state.linkSrc1 ?? ''}
              placeholder="https://..."
              name="linkSrc1"
            />
            <div className="flex flex-col"></div>
          </div>
        </div>
        <div className="order-1 space-y-6">
          <div className="flex flex-col justify-start space-y-4">
            <Label>Photo</Label>
            <div className="relative my-4 flex h-[100px] w-[200px] items-center justify-center md:h-[200px] md:w-[400px]">
              {state.imgSrc ? (
                <Image
                  src={state.imgSrc ?? ''}
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
            </div>
            <UploadButton
              className="transform-color self-start ut-button:bg-gray-700 ut-button:text-white ut-button:hover:bg-gray-600 ut-allowed-content:hidden"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setState((prev) => ({ ...prev, imgSrc: res[0].url }));
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
            <div className="space-y-2"></div>
          </div>
        </div>
      </div>
    </form>
  );
}
