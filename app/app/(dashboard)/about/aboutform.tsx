'use client';

import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UploadButton } from '../../../lib/uploadthing';
import { useFormState } from 'react-dom';
import { IAboutPage } from '../../../interfaces/IAboutPage';

import { updateAbout } from '@/app/lib/data';
import LinkInput from './linkinput';
import Image from 'next/image';
import { State } from '@/app/lib/data';
import { toast } from 'react-hot-toast';

export default function AboutForm({ data }: { data: IAboutPage }) {
  const updateAboutWithId = updateAbout.bind(null, data.id);
  const [state, formAction] = useFormState(updateAboutWithId, {
    message: '',
    errors: {},
  });
  const [imgSrc, setImgSrc] = useState(data.imgSrc);
  state.message === 'Success' && toast.success('Updated!');
  return (
    <form action={formAction}>
      <header className="mb-4 flex w-full items-center justify-between pb-4 md:space-x-4">
        <h1 className="text-lg font-bold">About</h1>
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
            <Label htmlFor="heading">
              Heading
              {state.errors?.heading &&
                state.errors.heading.map((error: string) => (
                  <p className="mx-4 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </Label>
            <Input
              id="heading"
              name="heading"
              placeholder="Enter heading"
              defaultValue={data.heading ?? ''}
            />
          </div>
          <div>
            <Label htmlFor="subheading">
              Subhead
              {state.errors?.subheading &&
                state.errors.subheading.map((error: string) => (
                  <span className="mx-4 text-sm text-red-500" key={error}>
                    {error}
                  </span>
                ))}
            </Label>
            <Input
              id="subheading"
              name="subheading"
              placeholder="Subheading"
              defaultValue={data.subheading ?? ''}
            />
          </div>
          <div>
            <Label htmlFor="page-description">Text</Label>
            <Textarea
              id="text"
              name="text"
              placeholder="About you"
              className="min-h-[220px]"
              defaultValue={data.text ?? ''}
            />
          </div>
          <div>
            <Label>Links</Label>
            <div className="flex flex-col">
              <LinkInput
                error={state.errors?.linkSrc1 ?? ''}
                linkSrc={data.linkSrc1 ?? ''}
                linkText={data.linkText1 ?? ''}
                textName={'linkText1'}
                urlName={'linkSrc1'}
              />
              <div className="my-2 block h-5 w-1/2 self-end">
                {state.errors?.linkSrc1 &&
                  state.errors.linkSrc1.map((error: string) => (
                    <p className="text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
              <LinkInput
                error={state.errors?.linkSrc2 ?? ''}
                linkSrc={data.linkSrc2 ?? ''}
                linkText={data.linkText2 ?? ''}
                textName={'linkText2'}
                urlName={'linkSrc2'}
              />
              <div className="my-2 block h-5 w-1/2 self-end">
                {state.errors?.linkSrc2 &&
                  state.errors.linkSrc2.map((error: string) => (
                    <p className="text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
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
            <div className="space-y-2">
              <Label htmlFor="image-caption">Caption</Label>
              <Input
                type="text"
                placeholder="The artist in her studio, 2024."
                defaultValue={data.imgCaption ?? ''}
                name="imgCaption"
              />
            </div>
          </div>

          {/* <div className="space-y-2">
      <AboutTemplates />
    </div> */}
        </div>
      </div>
    </form>
  );
}
