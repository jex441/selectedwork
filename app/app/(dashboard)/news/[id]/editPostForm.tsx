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
import { Trash } from 'lucide-react';

import { updateNewsPost } from '@/app/lib/data';
import Image from 'next/image';
import { State } from '@/app/lib/data';
import { Link } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Visibility from './visibility';

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

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateNewsPost(state).then((res) => {
      toast.success('Changes Saved!');
    });
  };

  const removeImageHandler = async () => {
    await updateNewsPost({ ...state, imgSrc: null }).then(() => {
      setState((prev) => ({ ...prev, imgSrc: null }));
      toast.success('Image removed');
    });
  };

  return (
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)}>
      <header className="mb-4 flex w-full items-center justify-between pb-4 md:space-x-4">
        <h1 className="text-lg font-bold">News</h1>
        <div className="flex w-full items-center justify-end space-x-4">
          <Visibility state={state} setState={setState} />
          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Save Changes
          </Button>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="order-1 space-y-6">
          <div className="flex flex-col justify-start space-y-4">
            <Label>Photo</Label>
            <div className="relative my-4 flex h-[100px] w-[200px] items-center justify-center self-center md:h-[200px] md:w-[300px]">
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
            <div className="flex w-full flex-row justify-between">
              <UploadButton
                className="transform-color self-start ut-button:bg-gray-700 ut-button:text-white ut-button:hover:bg-gray-600 ut-allowed-content:hidden"
                endpoint="imageUploader"
                onClientUploadComplete={async (res) => {
                  await updateNewsPost({ ...state, imgSrc: res[0].url }).then(
                    () => toast.success('Image uploaded'),
                  );
                  setState((prev) => ({ ...prev, imgSrc: res[0].url }));
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
              <span onClick={() => removeImageHandler()}>
                <Trash
                  size={20}
                  className="mx-2 cursor-pointer opacity-60 transition-all hover:opacity-100"
                />
              </span>
            </div>
          </div>
        </div>
        <div className="order-2 col-span-3 space-y-6 md:ml-20">
          <div className="grid w-full grid-cols-4 flex-row gap-6">
            <div className="col-span-3">
              <Label htmlFor="heading">Title</Label>
              <Input
                onChange={(e) => changeHandler(e)}
                id="heading"
                name="heading"
                placeholder="Enter heading"
                defaultValue={state.heading ?? ''}
              />
            </div>
            <div className="col-span-1">
              <Label htmlFor="date">Date</Label>
              <Input
                onChange={(e) => changeHandler(e)}
                id="date"
                name="date"
                placeholder=""
                defaultValue={state.date ?? ''}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="subheading">Line 2</Label>
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
      </div>
    </form>
  );
}
