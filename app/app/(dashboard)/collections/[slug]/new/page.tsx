'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import placeholder from '../../../../assets/placeholder.png';
import { UploadButton, UploadDropzone } from '../../../../../lib/uploadthing';

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
import { createWork } from '../../../../../lib/data';
import { useFormState } from 'react-dom';
import {
  WorkState,
  addMedia,
  makeMainMedia,
  deleteWork,
  deleteMedia,
  createWorkWithMedia,
} from '@/app/lib/data';

export default function NewPieceForm({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const initialState: WorkState = { message: null, errors: {} };

  const [work, setWork] = useState<IWork>({
    id: null,
    collectionId: null,
    collectionSlug: params.slug,
    index: null,
    idx: 99,
    title: '',
    year: '',
    medium: '',
    height: '',
    width: '',
    depth: '',
    unit: '',
    description: '',
    location: '',
    price: '',
    currency: '',
    sold: '',
    hidden: '',
    displayHeight: '',
    displayWidth: '',
    media: [],
  });

  const addMediaHandler = async (url: string) => {
    const newMedia = {
      id: null,
      url: url,
      type: 'image',
      main: work.media.length ? 'false' : 'true',
    };
    // const res = await addMedia(id, newMedia, params.slug);
    setWork({
      ...work,
      media: [...work.media, newMedia],
    });
  };

  const makeMainMediaHandler = async (index: number) => {
    const newMedia = work.media.map((m, idx) => {
      if (idx === index) {
        return { ...m, main: 'true' };
      } else {
        return { ...m, main: 'false' };
      }
    });
    setWork({ ...work, media: newMedia });
  };
  // const createWorkWithMediaHandler = async (slug: string, url: string) => {
  //   const newMedia = { id: null, url: url, type: 'image', main: 'true' };
  //   // const newWork = await createWorkWithMedia(slug, newMedia);
  //   // newWork && setWork(newWork);
  //   newMedia && setWork({ ...work, media: [...work.media, newMedia] });
  // };
  const deleteWorkHandler = async (workId: number, collectionId: number) => {
    work &&
      (await deleteWork(workId, collectionId).then(() => {
        window.location.href = `/collections/${params.slug}`;
      }));
  };

  const deleteMediaHandler = async (index: number) => {
    const newMedia = work.media.filter((m, idx) => idx !== index);
    setWork({ ...work, media: newMedia });
  };

  const mainMedia = work.media.filter((m) => m.main === 'true');
  // create work without id, array of media urls
  // then update work with id, array of media objects

  const changeHandler = (value: string, name: string) => {
    setWork({ ...work, [name]: value });
  };
  const createWorkHandler = async () => {
    if (work.media.length === 0) {
      alert('Please add an image');
      return;
    }
    await createWork(work).then((res) => {
      window.location.href = `/collections/${params.slug}`;
    });
  };
  return (
    <form
      // action={createWork}
      onSubmit={createWorkHandler}
      className="grid h-full w-full items-center gap-6 px-6 md:grid-cols-2"
    >
      <div className="mx-auto flex w-5/6 flex-col items-center">
        <div className="relative flex h-[300px] w-full flex-col items-center">
          {mainMedia[0]?.url ? (
            <Image
              src={mainMedia[0]?.url}
              alt="Product Image"
              width={0}
              height={0}
              fill={true}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-fit border border-gray-200 dark:border-gray-800"
            />
          ) : (
            <UploadDropzone
              className="h-full "
              config={{ mode: 'auto' }}
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                addMediaHandler(res[0].url);
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          )}
        </div>
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
                  <DropdownMenuItem onClick={() => makeMainMediaHandler(index)}>
                    Make Main Image
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => deleteMediaHandler(media.id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
        </div>
        {work.media.map((media, idx) => (
          <input
            type="text"
            name={`media-${idx}`}
            defaultValue={media.url ?? ''}
            className="hidden"
          />
        ))}
        <UploadButton
          className="self-start"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            addMediaHandler(res[0].url);
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>

      <div className="mx-auto grid w-5/6">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2.5">
              <Label htmlFor="title">Title</Label>
              {/* <Input
                value={work.title ?? ''}
                onChange={(e) => changeHandler(e.target.value, e.target.name)}
                name="userCollection"
                defaultValue={params.slug}
                className="hidden"
              /> */}
              <Input
                value={work.title ?? ''}
                onChange={(e) => changeHandler(e.target.value, e.target.name)}
                name="title"
                placeholder="Title"
              />
            </div>
            <div className="grid w-20 gap-2.5">
              <Label htmlFor="year">Year</Label>
              <Input
                value={work.year ?? ''}
                onChange={(e) => changeHandler(e.target.value, e.target.name)}
                name="year"
                type="number"
                placeholder="Year"
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="grid gap-2.5">
              <Label htmlFor="medium">Medium</Label>
              <Input
                value={work.medium ?? ''}
                onChange={(e) => changeHandler(e.target.value, e.target.name)}
                name="medium"
                placeholder="Medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="grid w-24 gap-2.5">
              <Label htmlFor="height">Height</Label>
              <Input
                onChange={(e) => changeHandler(e.target.value, e.target.name)}
                name="height"
                type="number"
                placeholder="height"
              />
            </div>
            <div className="grid w-24 gap-2.5">
              <Label htmlFor="width">Width</Label>
              <Input
                onChange={(e) => changeHandler(e.target.value, e.target.name)}
                name="width"
                type="number"
                placeholder="width"
              />
            </div>
            <div className="grid w-24 gap-2.5">
              <Label htmlFor="depth">Depth</Label>
              <Input
                onChange={(e) => changeHandler(e.target.value, e.target.name)}
                name="depth"
                type="number"
                placeholder="depth"
              />
            </div>
            <div className="grid w-24 gap-2.5">
              <Label htmlFor="unit">Unit</Label>
              <Select
                name="unit"
                onValueChange={(value) => changeHandler(value, 'unit')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inches">inches</SelectItem>
                  <SelectItem value="feet">feet</SelectItem>
                  <SelectItem value="cm">cm</SelectItem>
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
              onChange={(e) => changeHandler(e.target.value, e.target.name)}
            />
          </div>
          <div className="grid gap-2.5">
            <Label htmlFor="location">Location</Label>
            <Input
              onChange={(e) => changeHandler(e.target.value, e.target.name)}
              name="location"
              placeholder="Artwork location or collection"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2.5">
              <Label htmlFor="price">Price</Label>
              <Input
                name="price"
                type="number"
                placeholder="Price"
                onChange={(e) => changeHandler(e.target.value, e.target.name)}
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="sold">Mark as Sold</Label>
              {/* <Checkbox
                name="sold"
                checked={work.sold}
                onChange={(e) => changeHandler(e.target.value, e.target.name)}
              /> */}
            </div>
          </div>

          <div className="my-4 flex justify-between gap-2">
            <Button type="submit">Save Changes</Button>
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
