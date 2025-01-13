'use client';
import { useState, useEffect } from 'react';
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
import { useToast } from '@/hooks/use-toast';

export default function NewPieceForm({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const { toast } = useToast();

  const initialState: WorkState = { message: null, errors: {} };

  const [work, setWork] = useState<IWork>({
    id: null,
    collectionId: null,
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
    sold: false,
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
    setWork({
      ...work,
      media: [...work.media, newMedia],
    });
  };

  const changeMainMediaHandler = async (url: string) => {
    const newMedia = work.media.map((m, idx) => {
      if (m.url === url) {
        return { ...m, main: 'true' };
      } else {
        return { ...m, main: 'false' };
      }
    });
    setWork({ ...work, media: newMedia });
  };

  const deleteMediaHandler = async (index: number) => {
    const newMedia = work.media.filter((m, idx) => idx !== index);
    setWork({ ...work, media: newMedia });
  };

  const changeHandler = (value: string, name: string) => {
    setWork({ ...work, [name]: value });
  };

  const createWorkHandler = async () => {
    if (work.media.length === 0) {
      alert('Please add an image');
      return;
    }

    await createWork(work, params.slug).then((res) => {
      toast({
        title: 'Success',
      });
      setTimeout(() => {
        window.location.href = `/collections/${params.slug}`;
      }, 800);
    });
  };

  return (
    <form
      action={createWorkHandler}
      className="grid h-full w-full items-center gap-6 px-6 md:grid-cols-2"
    >
      <div className="mx-auto flex w-5/6 flex-col">
        <div className="relative flex h-[400px] w-full flex-col items-center">
          {work.media.length ? (
            <Image
              src={work.media.filter((m) => m.main === 'true')[0].url ?? ''}
              alt="Product Image"
              width={0}
              height={0}
              fill={true}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="border border-gray-200 object-contain dark:border-gray-800"
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
        {work.media.length ? (
          <div className="flex  w-full flex-col p-2 text-sm dark:border-gray-800">
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
                          changeMainMediaHandler(media.url as string)
                        }
                      >
                        Make Main Image
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteMediaHandler(index)}
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
                    addMediaHandler(res[0].url);
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
              <Checkbox
                name="sold"
                defaultChecked={(work.sold as boolean) || false}
                onCheckedChange={(checked) =>
                  setWork({ ...work, sold: checked as boolean })
                }
              />
            </div>
          </div>

          <div className="my-4 flex justify-between gap-2">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
