'use client';

import { useState } from 'react';

import { UploadButton } from '../../../lib/uploadthing';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import placeholder from '../../../assets/placeholder.png';

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

export default function Component() {
  const [imgSrc, setImgSrc] = useState<string>('');

  const [image, setImage] = useState<[]>([]);

  return (
    <div className="mx-10 my-4 text-lg">
      Upload a new image
      <form className="lg:gap-2.52 mx-auto grid h-full max-w-6xl items-center gap-6 py-6 md:grid-cols-2">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center">
            <div className="relative my-2 flex h-[300px] w-[500px] items-center justify-center bg-red-100">
              {imgSrc ? (
                <Image
                  src={imgSrc ?? ''}
                  objectFit={'contain'}
                  fill={true}
                  alt="Image"
                />
              ) : (
                <div className="block flex h-full w-full items-center justify-center rounded-md bg-gray-100 text-gray-300">
                  No image
                </div>
              )}
            </div>
          </div>
          <div className="m-10 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="group relative">
                  <Image
                    src={placeholder}
                    alt="Thumbnail"
                    width={150}
                    height={150}
                    className="aspect-square  object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Make Main Image</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
                <DropdownMenuItem>Hide</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
        </div>
        <div className="mx-auto grid w-5/6">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Title" />
              </div>
              <div className="grid w-20 gap-2.5">
                <Label htmlFor="year">Year</Label>
                <Input id="year" type="number" placeholder="Year" />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="grid gap-2.5">
                <Label htmlFor="medium">Medium</Label>
                <Input id="medium" placeholder="Medium" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div className="grid w-24 gap-2.5">
                <Label htmlFor="height">Height</Label>
                <Input id="height" type="number" placeholder="height" />
              </div>
              <div className="grid w-24 gap-2.5">
                <Label htmlFor="width">Width</Label>
                <Input id="width" type="number" placeholder="width" />
              </div>
              <div className="grid w-24 gap-2.5">
                <Label htmlFor="depth">Depth</Label>
                <Input id="depth" type="number" placeholder="depth" />
              </div>
              <div className="grid w-24 gap-2.5">
                <Label htmlFor="unit">Unit</Label>
                <Select>
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
              <Textarea id="description" placeholder="Description" />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Artwork location or collection"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2.5">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" placeholder="Price" />
              </div>
              <div className="grid gap-2.5">
                <Label htmlFor="sold">Mark as Sold</Label>
                <Checkbox id="sold" />
              </div>
            </div>

            <div className="my-4 flex gap-2">
              <Button>Add to collection</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
