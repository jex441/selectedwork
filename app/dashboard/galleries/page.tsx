import React from 'react';

export default function Invoices() {
  return  <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
  <div className="flex items-center">
    <h1 className="font-semibold text-lg md:text-2xl">Image Gallery</h1>
    <Button className="ml-auto" size="sm">
      Upload Image
    </Button>
  </div>
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <div className="relative overflow-hidden rounded-lg group">
      <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View Image</span>
      </Link>
      <img src="/placeholder.svg" alt="Image 1" width={400} height={300} className="object-cover w-full h-60" />
      <div className="p-4 bg-white dark:bg-gray-950">
        <h3 className="text-lg font-semibold md:text-xl">Sunset Landscape</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Landscape, Nature</p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">1.2 MB</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">1920x1080</div>
        </div>
      </div>
    </div>
    <div className="relative overflow-hidden rounded-lg group">
      <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View Image</span>
      </Link>
      <img src="/placeholder.svg" alt="Image 2" width={400} height={300} className="object-cover w-full h-60" />
      <div className="p-4 bg-white dark:bg-gray-950">
        <h3 className="text-lg font-semibold md:text-xl">Autumn Leaves</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Nature, Foliage</p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">2.5 MB</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">2048x1536</div>
        </div>
      </div>
    </div>
    <div className="relative overflow-hidden rounded-lg group">
      <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View Image</span>
      </Link>
      <img src="/placeholder.svg" alt="Image 3" width={400} height={300} className="object-cover w-full h-60" />
      <div className="p-4 bg-white dark:bg-gray-950">
        <h3 className="text-lg font-semibold md:text-xl">City Skyline</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Architecture, Urban</p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">3.1 MB</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">2560x1440</div>
        </div>
      </div>
    </div>
    <div className="relative overflow-hidden rounded-lg group">
      <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View Image</span>
      </Link>
      <img src="/placeholder.svg" alt="Image 4" width={400} height={300} className="object-cover w-full h-60" />
      <div className="p-4 bg-white dark:bg-gray-950">
        <h3 className="text-lg font-semibold md:text-xl">Serene Lake</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Landscape, Water</p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">1.8 MB</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">2048x1365</div>
        </div>
      </div>
    </div>
    <div className="relative overflow-hidden rounded-lg group">
      <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View Image</span>
      </Link>
      <img src="/placeholder.svg" alt="Image 5" width={400} height={300} className="object-cover w-full h-60" />
      <div className="p-4 bg-white dark:bg-gray-950">
        <h3 className="text-lg font-semibold md:text-xl">Vibrant Flowers</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Nature, Floral</p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">2.2 MB</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">2048x1365</div>
        </div>
      </div>
    </div>
    <div className="relative overflow-hidden rounded-lg group">
      <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View Image</span>
      </Link>
      <img src="/placeholder.svg" alt="Image 6" width={400} height={300} className="object-cover w-full h-60" />
      <div className="p-4 bg-white dark:bg-gray-950">
        <h3 className="text-lg font-semibold md:text-xl">Misty Mountains</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Landscape, Nature</p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">2.8 MB</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">2560x1440</div>
        </div>
      </div>
    </div>
    <div className="relative overflow-hidden rounded-lg group">
      <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View Image</span>
      </Link>
      <img src="/placeholder.svg" alt="Image 7" width={400} height={300} className="object-cover w-full h-60" />
      <div className="p-4 bg-white dark:bg-gray-950">
        <h3 className="text-lg font-semibold md:text-xl">Starry Night Sky</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Astrophotography, Nature</p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">3.5 MB</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">3840x2160</div>
        </div>
      </div>
    </div>
    <div className="relative overflow-hidden rounded-lg group">
      <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View Image</span>
      </Link>
      <img src="/placeholder.svg" alt="Image 8" width={400} height={300} className="object-cover w-full h-60" />
      <div className="p-4 bg-white dark:bg-gray-950">
        <h3 className="text-lg font-semibold md:text-xl">Colorful Cityscape</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Architecture, Urban</p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">2.9 MB</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">2560x1440</div>
        </div>
      </div>
    </div>
  </div>
</main>;
}
