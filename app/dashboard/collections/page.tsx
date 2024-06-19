import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
export default function Invoices() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <header className="flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="#" className="text-lg font-semibold" prefetch={false}>
            Collection Title
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Visible</span>
            <Switch id="visibility-toggle" />
          </div>
          <Link href="#" className="text-sm font-medium" prefetch={false}>
            Page Settings
          </Link>
          <Button className="ml-auto" size="sm">
            Upload Image
          </Button>
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
          <img
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
                19 x 23 "
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
          <img
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
                29x16"
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
          <img
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
                23x14"
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
          <img
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
                20x15"
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
          <img
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
                20x13"
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
          <img
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
                25x14"
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
          <img
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
                38x21"
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
          <img
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
                25x10"
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
function BellIcon(props) {
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

function FileIcon(props) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function FilePenIcon(props) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function CollectionThumbnailsIcon(props) {
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
      <rect width="18" height="14" x="3" y="3" rx="2" />
      <path d="M4 21h1" />
      <path d="M9 21h1" />
      <path d="M14 21h1" />
      <path d="M19 21h1" />
    </svg>
  );
}

function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ImageIcon(props) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
