import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';

import placeholder from '../../../assets/placeholder.png';

export default function Invoices({ params }: { params: { slug: string } }) {
  console.log(params.slug)
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
            src={placeholder}
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
      </div>
    </main>
  );
}
