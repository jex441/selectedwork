import React from 'react';
import Link from 'next/link';
import Onboard from './OnBoard';
export default function page() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="flex h-14 items-center justify-between px-4 lg:px-6">
        <Link href="#" className="flex items-center" prefetch={false}>
          <span className="ml-2 text-lg font-semibold">Selected Work</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-sm font-medium underline-offset-4 hover:underline"
            prefetch={false}
          >
            Login
          </Link>
          <Link
            href="/sign-up"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Sign Up
          </Link>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center bg-gray-100/50 px-4 text-center md:px-6 ">
        {/* <div className="max-w-3xl space-y-4">
          <h1 className="text-2xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Selected Work
          </h1>
          <p className="text-muted-foreground md:text-xl">
            A platform for showcasing your best work.
          </p>
        </div> */}
        <Onboard />
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
