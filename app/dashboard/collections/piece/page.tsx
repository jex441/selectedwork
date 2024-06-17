'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';

export default function Component() {
  const [image, setImage] = useState({
    title: 'Sunset Reflection',
    year: 2019,
    medium: 'Oil on Canvas',
    description:
      'A serene landscape depicting the sun setting over a calm lake.',
    isSold: false,
    width: 24,
    height: 18,
    isVisible: true,
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
    <div className="mx-auto grid h-full max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
      <div className="grid gap-2">
        <img
          src="https://generated.vusercontent.net/placeholder.svg"
          alt="Product Image"
          width={600}
          height={600}
          className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
        />
        <h2 className="text-lg font-semibold">Thumbnails</h2>
        <div className="grid grid-cols-5 gap-1">
          {image.thumbnails.map((thumbnail, index) => (
            <img
              key={index}
              src="https://generated.vusercontent.net/placeholder.svg"
              alt={`Thumbnail ${index + 1}`}
              width={50}
              height={50}
              className="rounded-md"
            />
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        <div className="mx-auto grid max-w-2xl gap-6 px-2 py-8">
          <form className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="title" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="year">Year</Label>
                <Input id="year" type="number" placeholder="year" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="medium">Medium</Label>
                <Input id="medium" placeholder="medium" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" placeholder="price" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" placeholder="price" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="sold">Mark as Sold</Label>
                <Checkbox id="sold" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="height">Height</Label>
                <Input id="height" type="number" placeholder="height" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="width">Width</Label>
                <Input id="width" type="number" placeholder="width" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="depth">Depth</Label>
                <Input id="depth" type="number" placeholder="depth" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="unit">Unit</Label>
                <Select id="unit">
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
            <div className="grid grid-cols-2 gap-4"></div>
            <div className="grid gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="description" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="location" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="visible">Visible</Label>
              <Checkbox id="visible" />
            </div>
          </form>
        </div>
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
