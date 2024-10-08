'use client';

import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UploadButton } from '../../../lib/uploadthing';
import { ILandingPage } from '../../../interfaces/ILandingPage';
import { Trash } from 'lucide-react';
import { updateLanding } from '@/app/lib/data';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

export default function AboutForm({
  data,
}: {
  data: ILandingPage | undefined;
}) {
  if (!data) return null;
  const [imgSrc, setImgSrc] = useState(data.imgSrc);
  const [state, setState] = useState(data);

  const removeLandingPageImageHandler = async () => {
    const res = await updateLanding({ ...data, imgSrc: '' });
    if (res) {
      setImgSrc('');
    }
  };

  const updateLandingHandler = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.currentTarget;
    setState({ ...state, [name]: value });
  };

  const submitHandler = async () => {
    const res = await updateLanding(state);
    if (!res) return;
    if (res.status === 200) {
      toast.success('Experience deleted successfully');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <header className="mb-4 flex w-full items-center justify-between pb-4 md:space-x-4">
        <h1 className="w-full text-lg font-bold">Cover Page</h1>
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
            <Label htmlFor="heading">Heading</Label>
            <Input
              onChange={(e) => updateLandingHandler(e)}
              id="heading"
              name="heading"
              placeholder="Enter heading"
              defaultValue={data?.heading || ''}
            />
          </div>
          <div>
            <Label htmlFor="subheading">Text</Label>
            <Input
              onChange={(e) => updateLandingHandler(e)}
              id="subheading"
              name="subHeading"
              placeholder="Subheading"
              defaultValue={data?.subHeading ?? ''}
            />
          </div>
        </div>
        <div className="order-1 space-y-6">
          <div className="flex flex-col justify-start space-y-4">
            <Label>Your photo</Label>
            <div className="relative my-4 flex h-[200px] w-[300px] items-center justify-center md:h-[300px] md:w-[500px]">
              {imgSrc ? (
                <Image
                  src={imgSrc}
                  className="object-contain"
                  fill={true}
                  alt="Image"
                />
              ) : (
                <div className="border-1 block flex h-full w-full items-center justify-center rounded-md bg-gray-100 text-gray-300">
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
                setState({ ...state, imgSrc: res[0].url });
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
            <span onClick={() => removeLandingPageImageHandler()}>
              <Trash
                size={20}
                className="mx-2 cursor-pointer opacity-60 transition-all hover:opacity-100"
              />
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
