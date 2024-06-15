'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { InputProps } from '@/components/ui/input'; // Add this import statement

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
      <div className="grid gap-4">
        <img
          src="https://generated.vusercontent.net/placeholder.svg"
          alt="Product Image"
          width={600}
          height={600}
          className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
        />
      </div>
      <div className="grid gap-6">
        <div className="mx-auto grid max-w-2xl gap-6 px-4 py-8">
          <div className="grid gap-4">
            <Input
              label="Title"
              value={image.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Year"
                type="number"
                value={image.year}
                onChange={(e) =>
                  handleInputChange('year', Number(e.target.value))
                }
              />
              <Input
                label="Medium"
                value={image.medium}
                onChange={(e) => handleInputChange('medium', e.target.value)}
              />
            </div>
            <Textarea
              label="Description"
              value={image.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Checkbox
                label="Sold"
                checked={image.isSold}
                onCheckedChange={(e) =>
                  handleInputChange('isSold', e.target.checked)
                }
              />
              <Checkbox
                label="Visible"
                checked={image.isVisible}
                onCheckedChange={(e) =>
                  handleInputChange('isVisible', e.target.checked)
                }
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Width"
                type="number"
                value={image.width}
                onChange={(e) =>
                  handleInputChange('width', Number(e.target.value))
                }
                suffix="in"
              />
              <Input
                label="Height"
                type="number"
                value={image.height}
                onChange={(e) =>
                  handleInputChange('height', Number(e.target.value))
                }
                suffix="in"
              />
            </div>
          </div>
          <div className="grid gap-4">
            <h2 className="text-lg font-semibold">Thumbnails</h2>
            <div className="grid grid-cols-5 gap-2">
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
