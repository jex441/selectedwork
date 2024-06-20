import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
export default function Invoices() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <header className="flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="#" className="text-lg font-semibold" prefetch={false}>
            Collection Title
          </Link>
          <Link
            href="/dashboard/collections/settings"
            className="text-sm font-medium"
            prefetch={false}
          >
            Settings
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Visible</span>
            <Switch id="visibility-toggle" />
          </div>
          <Link href="/dashboard/collections/new">
            <Button className="ml-auto" size="sm">
              Upload Image
            </Button>
          </Link>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="group relative overflow-hidden rounded-lg">
          <Link
            href="/dashboard/collections/piece"
            className="absolute inset-0 z-10"
            prefetch={false}
          >
            <span className="sr-only">View Image</span>
          </Link>
          <Image
            src="https://generated.vusercontent.net/placeholder.svg"
            alt="Image 1"
            width={400}
            height={300}
            className="h-60 w-full object-cover"
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="text-lg font-semibold md:text-xl">
              Sunset Landscape
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Oil on Canvas
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                2023
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                19 x 23
              </div>
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg">
          <Link
            href="/dashboard/collections/piece"
            className="absolute inset-0 z-10"
            prefetch={false}
          >
            <span className="sr-only">View Image</span>
          </Link>
          <Image
            src="https://generated.vusercontent.net/placeholder.svg"
            alt="Image 2"
            width={400}
            height={300}
            className="h-60 w-full object-cover"
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="text-lg font-semibold md:text-xl">Autumn Leaves</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Oil on Canvas
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                2023
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                29x16
              </div>
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg">
          <Link
            href="/dashboard/collections/piece"
            className="absolute inset-0 z-10"
            prefetch={false}
          >
            <span className="sr-only">View Image</span>
          </Link>
          <Image
            src="https://generated.vusercontent.net/placeholder.svg"
            alt="Image 3"
            width={400}
            height={300}
            className="h-60 w-full object-cover"
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="text-lg font-semibold md:text-xl">City Skyline</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Oil on Canvas
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                2023
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                23x14
              </div>
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg">
          <Link
            href="/dashboard/collections/piece"
            className="absolute inset-0 z-10"
            prefetch={false}
          >
            <span className="sr-only">View Image</span>
          </Link>
          <Image
            src="https://generated.vusercontent.net/placeholder.svg"
            alt="Image 4"
            width={400}
            height={300}
            className="h-60 w-full object-cover"
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="text-lg font-semibold md:text-xl">Serene Lake</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Oil on Canvas
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                2023
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                20x15
              </div>
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg">
          <Link
            href="/dashboard/collections/piece"
            className="absolute inset-0 z-10"
            prefetch={false}
          >
            <span className="sr-only">View Image</span>
          </Link>
          <Image
            src="https://generated.vusercontent.net/placeholder.svg"
            alt="Image 5"
            width={400}
            height={300}
            className="h-60 w-full object-cover"
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="text-lg font-semibold md:text-xl">
              Vibrant Flowers
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Oil on Canvas
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                2023
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                20x13
              </div>
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg">
          <Link
            href="/dashboard/collections/piece"
            className="absolute inset-0 z-10"
            prefetch={false}
          >
            <span className="sr-only">View Image</span>
          </Link>
          <Image
            src="https://generated.vusercontent.net/placeholder.svg"
            alt="Image 6"
            width={400}
            height={300}
            className="h-60 w-full object-cover"
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="text-lg font-semibold md:text-xl">
              Misty Mountains
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Oil on Canvas
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                2023
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                25x14
              </div>
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg">
          <Link
            href="/dashboard/collections/piece"
            className="absolute inset-0 z-10"
            prefetch={false}
          >
            <span className="sr-only">View Image</span>
          </Link>
          <Image
            src="https://generated.vusercontent.net/placeholder.svg"
            alt="Image 7"
            width={400}
            height={300}
            className="h-60 w-full object-cover"
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="text-lg font-semibold md:text-xl">
              Starry Night Sky
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Oil on Canvas
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                2023
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                38x21
              </div>
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg">
          <Link
            href="/dashboard/collections/piece"
            className="absolute inset-0 z-10"
            prefetch={false}
          >
            <span className="sr-only">View Image</span>
          </Link>
          <Image
            src="https://generated.vusercontent.net/placeholder.svg"
            alt="Image 8"
            width={400}
            height={300}
            className="h-60 w-full object-cover"
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="text-lg font-semibold md:text-xl">
              Colorful Cityscape
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Oil on Canvas
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                2023
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                25x10
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
interface Props {
  className?: string;
}

function BellIcon(props: Props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
