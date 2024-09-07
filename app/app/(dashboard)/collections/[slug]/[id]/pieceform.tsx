'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import placeholder from '../../../../../assets/placeholder.png';
import { UploadButton } from '../../../../../lib/uploadthing';

import { toast } from 'react-hot-toast';
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
import { updateWork } from '../../../../../lib/data';
import { useFormState } from 'react-dom';
import {
  WorkState,
  addMedia,
  makeMainMedia,
  deleteWork,
  deleteMedia,
} from '@/app/lib/data';

export default function PieceForm({
  slug,
  work,
}: {
  slug: string;
  work: IWork;
}) {
  const [curWork, setCurWork] = useState<IWork>(work);

  const initialState: WorkState = { message: null, errors: {} };

  const updateWorkHandler = async () => {
    await updateWork(curWork).then((res) => {
      toast.success('Work Updated!');
    });
  };

  const addMediaHandler = async (id: number, url: string) => {
    const newMedia = { url: url, type: 'image', main: 'false' };
    await addMedia(id, newMedia, slug).then((res) => {
      toast.success('Upload Complete!');
    });
  };

  const deleteWorkHandler = async (workId: number, collectionSlug: string) => {
    work &&
      (await deleteWork(workId, collectionSlug).then((res) => {
        window.location.href = `/collections/${slug}`;
      }));
  };

  const deleteMediaHandler = async (mediaId: number) => {
    work &&
      (await deleteMedia(mediaId, slug).then((res) => {
        toast.success('Media Deleted!');
      }));
  };

  const changeMainMediaHandler = async (url: string, mediaId: number) => {
    await makeMainMedia(curWork.id as number, mediaId, slug).then((res) => {
      const newMedia = curWork.media.map((m, idx) => {
        if (m.url === url) {
          return { ...m, main: 'true' };
        } else {
          return { ...m, main: 'false' };
        }
      });
      setCurWork({ ...work, media: newMedia });
      toast.success('Main Image Updated!');
    });
  };

  const changeHandler = (value: string, name: string) => {
    setCurWork({ ...curWork, [name]: value });
  };

  return (
    <form
      action={updateWorkHandler}
      className="grid h-full w-full items-center gap-6 px-6 md:grid-cols-2"
    >
      <div className="mx-auto flex w-5/6 flex-col">
        <div className="relative mb-2 flex h-[400px] w-full flex-col items-center">
          <Image
            src={curWork.media.filter((m) => m.main === 'true')[0]?.url ?? ''}
            alt="Product Image"
            width={0}
            height={0}
            fill={true}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-contain"
          />
        </div>
        {curWork.media.length ? (
          <div className="flex  w-full flex-col p-2 text-sm">
            <div className="grid h-[60px] w-full grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
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
                          changeMainMediaHandler(
                            media.url as string,
                            media.id as number,
                          )
                        }
                      >
                        Make Main Image
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteMediaHandler(media.id as number)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ))}
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="m-2 text-xs">Add more images of this piece</span>
              <span>
                <UploadButton
                  className="self-start"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    curWork.id && addMediaHandler(curWork.id, res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </span>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mx-auto grid w-5/6">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2.5">
              <Label htmlFor="title">Title</Label>
              <Input
                value={curWork.title ?? ''}
                onChange={(e) => changeHandler(e.target.value, e.target.name)}
                name="title"
                placeholder="Title"
              />
            </div>
            <div className="grid w-20 gap-2.5">
              <Label htmlFor="year">Year</Label>
              <Input
                value={curWork.year ?? ''}
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
                value={curWork.medium ?? ''}
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
              <Checkbox
                name="sold"
                defaultChecked={curWork.sold}
                onCheckedChange={(checked) =>
                  setCurWork({ ...curWork, sold: checked as boolean })
                }
              />
            </div>
          </div>

          <div className="my-4 flex justify-between gap-2">
            <Button type="submit">Submit</Button>
            <Button
              type="button"
              className="bg-red-500"
              onClick={() => deleteWorkHandler(curWork.id as number, slug)}
            >
              Delete Work
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
