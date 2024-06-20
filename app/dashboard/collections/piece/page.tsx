'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

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

export default function Component() {
  const [image, setImage] = useState({
    title: 'Sunset Reflection',
    year: 2019,
    medium: 'Oil on Canvas',
    description:
      'A serene landscape depicting the sun setting over a calm lake.',
    isSold: false,
    price: {
      currency: 'USD',
      amount: 1500,
    },
    dimensions: {
      unit: 'inches',
      width: 24,
      height: 18,
      depth: 0,
    },
    isVisible: true,
    location: 'The Whitney Museum of American Art',
    thumbnails: [
      'https://generated.vusercontent.net/placeholder.svg?height=50&width=50',
      'https://generated.vusercontent.net/placeholder.svg?height=50&width=50',
      'https://generated.vusercontent.net/placeholder.svg?height=50&width=50',
      'https://generated.vusercontent.net/placeholder.svg?height=50&width=50',
      'https://generated.vusercontent.net/placeholder.svg?height=50&width=50',
    ],
  });
  const handleInputChange = (field, value) => {
    setImage((prevImage) => ({
      ...prevImage,
      [field]: value,
    }));
  };
  return (
    <div className="lg:gap-2.52 mx-auto grid h-full max-w-6xl items-center gap-6 py-6 md:grid-cols-2">
      <div className="flex flex-col items-center">
        <Link href="/dashboard/collections/piece/scale">
          <img
            src="https://generated.vusercontent.net/placeholder.svg"
            alt="Product Image"
            width={500}
            height={300}
            className="border border-gray-200 dark:border-gray-800"
          />
        </Link>
        <div className="m-10 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="group relative">
                <img
                  src="https://generated.vusercontent.net/placeholder.svg?height=50&width=50"
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
      </div>

      <div className="mx-auto grid w-5/6 gap-2 px-2 py-8">
        <form className="grid gap-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Title" value={image.title} />
            </div>
            <div className="grid w-20 gap-2.5">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                placeholder="Year"
                value={image.year}
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="grid gap-2.5">
              <Label htmlFor="medium">Medium</Label>
              <Input id="medium" placeholder="Medium" value={image.medium} />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="grid w-24 gap-2.5">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                type="number"
                placeholder="height"
                value={image.dimensions.height}
              />
            </div>
            <div className="grid w-24 gap-2.5">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                type="number"
                placeholder="width"
                value={image.dimensions.width}
              />
            </div>
            <div className="grid w-24 gap-2.5">
              <Label htmlFor="depth">Depth</Label>
              <Input
                id="depth"
                type="number"
                placeholder="depth"
                value={image.dimensions.depth}
              />
            </div>
            <div className="grid w-24 gap-2.5">
              <Label htmlFor="unit">Unit</Label>
              <Select id="unit" value={image.dimensions.unit}>
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
              value={image.description}
            />
          </div>
          <div className="grid gap-2.5">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Artwork location or collection"
              value={image.location}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2.5">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Price"
                value={image.price.amount}
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="sold">Mark as Sold</Label>
              <Checkbox id="sold" checked={image.isSold} />
            </div>
          </div>

          <div className="my-4 flex gap-2">
            <Button>Save Changes</Button>
            <Button variant="outline">Discard Changes</Button>
            <Button variant="outline">Delete Work</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function HeartIcon(props) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function ArrowLeftIcon(props) {
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
