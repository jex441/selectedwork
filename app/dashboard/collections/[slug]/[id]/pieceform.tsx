'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import placeholder from '../../../../assets/placeholder.png';
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
import { IWork } from '@/app/interfaces/IWork';

export default function PieceForm({work}: {work: IWork}) {
    console.log('work', work)
    // Need to configure media's relation to work - not uploading properly, rendering thumbnails in collection view
    // main img might need to be separate from media other than first in array

    // need to add functionality to update work
  return (
    <form className="lg:gap-2.52 mx-auto grid h-full max-w-6xl items-center gap-6 py-6 md:grid-cols-2">
      <div className="flex flex-col items-center">
        <Link href="/dashboard/collections/piece/scale">
          <Image
            src={work?.media[0].url ?? placeholder}
            alt="Product Image"
            width={500}
            height={300}
            className="border border-gray-200 dark:border-gray-800"
          />
        </Link>
        <div className="m-10 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
            {work?.media.slice(1).map((media, index) => (
                <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="group relative">
                <Image
                  src={media.url}
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
            ))}
          
        </div>
      </div>

      <div className="mx-auto grid w-5/6 gap-2 px-2 py-8">
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Title" defaultValue={work.title ?? ""} />
            </div>
            <div className="grid w-20 gap-2.5">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                placeholder="Year"
                defaultValue={work.year ?? ""}
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="grid gap-2.5">
              <Label htmlFor="medium">Medium</Label>
              <Input id="medium" placeholder="Medium" defaultValue={work.medium ?? ""} />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="grid w-24 gap-2.5">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                type="number"
                placeholder="height"
                defaultValue={work.height ?? ""}
              />
            </div>
            <div className="grid w-24 gap-2.5">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                type="number"
                placeholder="width"
                defaultValue={work.width ?? ""}
              />
            </div>
            <div className="grid w-24 gap-2.5">
              <Label htmlFor="depth">Depth</Label>
              <Input
                id="depth"
                type="number"
                placeholder="depth"
                defaultValue={work.depth ?? ""}
              />
            </div>
            <div className="grid w-24 gap-2.5">
              <Label htmlFor="unit">Unit</Label>
              <Select defaultValue={work.unit ?? ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inches">Inches</SelectItem>
                  <SelectItem value="meters">Feet</SelectItem>
                  <SelectItem value="centimeters">Centimeters</SelectItem>
                  <SelectItem value="meters">Meters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2"></div>
          <div className="grid gap-2.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description"
              defaultValue={work.description ?? ""}
            />
          </div>
          <div className="grid gap-2.5">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Artwork location or collection"
              defaultValue={work.location ?? ""}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2.5">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Price"
                defaultValue={work.price ?? ""}
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="sold">Mark as Sold</Label>
              <Checkbox id="sold"  />
            </div>
          </div>

          <div className="my-4 flex gap-2">
            <Button>Save Changes</Button>
            <Button variant="outline">Discard Changes</Button>
            <Button variant="outline">Delete Work</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
