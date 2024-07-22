'use client';

import React from 'react';
import { useState } from 'react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { deleteCollection } from '../../../../lib/data';
import Image from 'next/image';
import { UploadButton } from '../../../../lib/uploadthing';
import { useFormState } from 'react-dom';
import { ICollection } from '../../../../interfaces/ICollection';
import { updateCollection } from '@/app/lib/data';
import LinkInput from './linkinput';
import AboutTemplates from './abouttemplates';
import { CollectionState } from '@/app/lib/data';

export default function settingsform({
  collection,
}: {
  collection: ICollection;
}) {
  const initialState: CollectionState = { message: null, errors: {} };
  const updateCollectionWithId = updateCollection.bind(null, collection.id);
  const [state, formAction] = useFormState(
    updateCollectionWithId,
    initialState,
  );
  const [imgSrc, setImgSrc] = useState(collection.imgSrc);

  async function deleteCollectionHandler() {
    if (confirm('Are you sure you want to delete this collection?')) {
      await deleteCollection(collection.id);
    }
  }
  return (
    <form action={formAction}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex flex-row items-center gap-8">
          <Link
            href="/dashboard/collections"
            className="text-muted-foreground hover:text-primary"
            prefetch={false}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Back</h1>
        </div>
        <div className="flex w-full items-center justify-end space-x-4">
          {/* <Link
      href="#"
      target="_blank"
      className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      prefetch={false}
    >
      <EyeIcon className="mr-2 h-4 w-4" />
      Preview
    </Link> */}

          {/* <Button
      variant="outline"
      className="text-muted-foreground hover:bg-muted hover:text-muted-foreground"
    >
      Discard Changes
    </Button> */}
          <div className="mx-5 italic text-gray-500">
            Do not forget to save your changes before leaving this page.
          </div>
          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Save Changes
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <Label htmlFor="title">
              Collection Title
              {state.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className="mx-4 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter Title"
              defaultValue={collection.title ?? ''}
            />
          </div>
          <div>
            <Label htmlFor="slug">
              Url Path
              {state.errors?.slug &&
                state.errors.slug.map((error: string) => (
                  <span className="mx-4 text-sm text-red-500" key={error}>
                    {error}
                  </span>
                ))}
            </Label>
            <Input
              id="slug"
              name="slug"
              placeholder="url slug"
              defaultValue={collection.slug ?? ''}
            />
            <span className="my-1 text-sm text-gray-500">
              https://yourwebsite.com/
            </span>

            <span className="my-1 text-sm">{collection.slug}</span>
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
              defaultValue={collection.subheading ?? ''}
            />
          </div>

          <div>
            <Label htmlFor="page-description">Description</Label>
            <Textarea
              id="text"
              name="description"
              placeholder="Collection Description"
              className="min-h-[320px]"
              defaultValue={collection.description ?? ''}
            />
          </div>
          <div>
            <Label>Links</Label>
            <div className="flex flex-col">
              <LinkInput
                error={state.errors?.linkSrc1 ?? ''}
                linkSrc={collection.linkSrc1 ?? ''}
                linkText={collection.linkText1 ?? ''}
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
                linkSrc={collection.linkSrc2 ?? ''}
                linkText={collection.linkText2 ?? ''}
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
        <div className="space-y-6">
          <div className="flex flex-col justify-start space-y-4">
            <Label>Image</Label>
            <div className="relative my-4 flex h-[300px] w-[500px] items-center justify-center">
              {imgSrc ? (
                <Image
                  src={imgSrc ?? ''}
                  objectFit={'contain'}
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
                placeholder="Collection Image Caption"
                defaultValue={collection.imgCaption ?? ''}
                name="imgCaption"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="text-muted-foreground hover:bg-muted hover:text-muted-foreground"
            onClick={() => deleteCollectionHandler()}
          >
            Delete Collection
          </Button>
          {/* <Button
            variant="outline"
            className="text-muted-foreground hover:bg-muted hover:text-muted-foreground"
          >
            Archive Collection
          </Button> */}
        </div>
      </div>
    </form>
  );
}
interface Props {
  className?: string;
}

function ArrowLeftIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
interface Props {
  className?: string;
}

function LinkIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function UploadIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function XIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
