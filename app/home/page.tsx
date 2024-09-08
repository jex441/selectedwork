import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function page() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#F3FFCE]">
      <header className="flex h-14 items-center justify-between px-4 lg:px-6">
        <Link href="#" className="flex items-center" prefetch={false}>
          <span className="ml-2 text-lg font-semibold">Selected Work</span>
        </Link>
        <div className="flex items-center gap-4">
          <a
            href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-in`}
            className="text-sm font-medium underline-offset-4 hover:underline"
            // prefetch={false}
          >
            Login
          </a>
          <a
            href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-up`}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            // prefetch={false}
          >
            Sign Up
          </a>
        </div>
      </header>
      <main className="flex flex-1 flex-row items-center justify-between text-center ">
        <div className="mx-auto flex max-w-3xl flex-col items-start justify-end space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Selected Work
          </h1>
          <p className="md:text-2xl">
            Simply the best website creator for artists.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-up`}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              // prefetch={false}
            >
              Get Started
            </a>
            <a
              href={`http://camdenross.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
              className="inline-flex h-10 items-center justify-center rounded-md border  bg-transparent px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              // prefetch={false}
              target="_blank"
            >
              View Demo Site
            </a>
          </div>
        </div>
        <div>
          <Image
            src="/landing.png"
            alt="Selected Work"
            width={640}
            height={640}
          />
        </div>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Selected Work. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link
            href="#"
            className="text-xs underline-offset-4 hover:underline"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs underline-offset-4 hover:underline"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
