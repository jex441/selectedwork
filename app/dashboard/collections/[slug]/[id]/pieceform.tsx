'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import placeholder from '../../../../assets/placeholder.png';
import { UploadButton } from '../../../../lib/uploadthing';

import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { IWork, IMedia } from '@/app/interfaces/IWork';
import { createWork } from '../../../../lib/data';
import { useFormState } from 'react-dom';
import { WorkState, addMedia, makeMainMedia, deleteWork } from '@/app/lib/data';

export default function PieceForm({
  work,
  slug,
}: {
  work: IWork;
  slug: string;
}) {
  const initialState: WorkState = { message: null, errors: {} };
  const createWorkWithId = work.id && createWork.bind(null, work.id);
  const [state, formAction] = useFormState(createWorkWithId, initialState);

  const addMediaHandler = async (id: number, url: string) => {
    const newMedia = { url: url, type: 'image', main: 'false' };
    await addMedia(id, newMedia);
  };
  const makeMainMediaHandler = async (workId: number, mediaId: number) => {
    work.collectionId &&
      (await makeMainMedia(workId, mediaId, work.collectionId));
  };

  const deleteWorkHandler = async (workId: number, collectionId: number) => {
    work && (await deleteWork(workId, collectionId));
  };

  const mainMedia = work.media.filter((m) => m.main === 'true');

  // UPDATE WORK NOT WORKING
  // update collection not working

  return (
    <form
      action={formAction}
      className="lg:gap-2.52 mx-auto grid h-full max-w-6xl items-center gap-6 py-6 md:grid-cols-2"
    >
      <div className="flex flex-col items-center">
        <Link href="/dashboard/collections/piece/scale">
          <Image
            src={mainMedia[0]?.url ?? placeholder}
            alt="Product Image"
            width={500}
            height={300}
            className="border border-gray-200 dark:border-gray-800"
          />
        </Link>
        <div className="m-10 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
          {work?.media
            .filter((w) => w.main === 'false')
            .map((media, index) => (
              <DropdownMenu key={media.url}>
                <DropdownMenuTrigger asChild>
                  <div className="group relative">
                    <Image
                      src={media.url ?? ''}
                      alt="Thumbnail"
                      width={150}
                      height={150}
                      className="aspect-square  object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      work.id && makeMainMediaHandler(work.id, media.id)
                    }
                  >
                    Make Main Image
                  </DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
        </div>
        <UploadButton
          className="self-start"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            work.id && addMediaHandler(work.id, res[0].url);
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>

      <div className="mx-auto grid w-5/6 gap-2 px-2 py-8">
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2.5">
              <Label htmlFor="title">Title</Label>
              <Input
                name="userCollection"
                defaultValue={slug}
                className="hidden"
              />
              <Input
                name="title"
                placeholder="Title"
                defaultValue={work.title ?? ''}
              />
            </div>
            <div className="grid w-20 gap-2.5">
              <Label htmlFor="year">Year</Label>
              <Input
                name="year"
                type="number"
                placeholder="Year"
                defaultValue={work.year ?? ''}
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="grid gap-2.5">
              <Label htmlFor="medium">Medium</Label>
              <Input
                name="medium"
                placeholder="Medium"
                defaultValue={work.medium ?? ''}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="grid w-24 gap-2.5">
              <Label htmlFor="height">Height</Label>
              <Input
                name="height"
                type="number"
                placeholder="height"
                defaultValue={work.height ?? ''}
              />
            </div>
            <div className="grid w-24 gap-2.5">
              <Label htmlFor="width">Width</Label>
              <Input
                name="width"
                type="number"
                placeholder="width"
                defaultValue={work.width ?? ''}
              />
            </div>
            <div className="grid w-24 gap-2.5">
              <Label htmlFor="depth">Depth</Label>
              <Input
                name="depth"
                type="number"
                placeholder="depth"
                defaultValue={work.depth ?? ''}
              />
            </div>
            <div className="grid w-24 gap-2.5">
              <Label htmlFor="unit">Unit</Label>
              <Select defaultValue={work.unit ?? ''}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inches">inches</SelectItem>
                  <SelectItem value="feet">feet</SelectItem>
                  <SelectItem value="centimeters">cm</SelectItem>
                  <SelectItem value="meters">meters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2"></div>
          <div className="grid gap-2.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              placeholder="Description"
              defaultValue={work.description ?? ''}
            />
          </div>
          <div className="grid gap-2.5">
            <Label htmlFor="location">Location</Label>
            <Input
              name="location"
              placeholder="Artwork location or collection"
              defaultValue={work.location ?? ''}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2.5">
              <Label htmlFor="price">Price</Label>
              <Input
                name="price"
                type="number"
                placeholder="Price"
                defaultValue={work.price ?? ''}
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="sold">Mark as Sold</Label>
              <Checkbox name="sold" />
            </div>
          </div>

          <div className="my-4 flex justify-between gap-2">
            <Button>Save Changes</Button>
            {/* <Button variant="outline">Discard Changes</Button> */}
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => {
                work &&
                  work.id !== null &&
                  work.collectionId !== null &&
                  deleteWorkHandler(work.id, work.collectionId);
              }}
            >
              Delete Work
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
