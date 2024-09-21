'use client';

import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UploadButton } from '../../../lib/uploadthing';
import { useFormState } from 'react-dom';
import { IContactPage } from '../../../interfaces/IContactPage';
import Link from 'next/link';
import SocialLinkInputs from './sociallinkinputs';
import { updateContactPage } from '@/app/lib/data';
import LinkInput from './linkinput';
// import contactTemplates from './contacttemplates';
import Image from 'next/image';
import { ContactState } from '@/app/lib/data';
import { ArrowLeftIcon } from '../../../assets/svgs';

export default function ContactForm({ data }: { data: IContactPage }) {
  const initialState: ContactState = { message: null, errors: {} };
  const updateContactWithId = updateContactPage.bind(null, data.id);
  const [state, formAction] = useFormState(updateContactWithId, initialState);
  const [imgSrc, setImgSrc] = useState(data.imgSrc);

  return (
    <form action={formAction}>
      <div className="mb-4 flex items-center justify-between">
        <header className="mb-2 flex w-full items-center justify-between space-x-4 pb-4">
          <h1 className="text-lg font-bold">Contact</h1>
          <div className="flex w-full items-center justify-end space-x-4">
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save Changes
            </Button>
          </div>
        </header>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-6">
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
              placeholder="Enter text here."
              className="min-h-[180px]"
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
            <SocialLinkInputs data={data} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col justify-start space-y-4">
            <Label>Image</Label>
            <div className="relative my-4 flex h-[300px] w-[500px] items-center justify-center">
              {imgSrc ? (
                <Image
                  src={imgSrc ?? ''}
                  style={{ objectFit: 'contain' }}
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
              className="self-start"
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
      <contactTemplates />
    </div> */}
        </div>
      </div>
    </form>
  );
}
