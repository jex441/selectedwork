import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Arrow } from '@radix-ui/react-dropdown-menu';
export default function page() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#E4EDDB]">
      <header className="flex h-16 w-full items-center justify-between px-4 text-[#1F4287] lg:px-12">
        <Link href="#" className="flex items-center" prefetch={false}>
          <Image
            src="/landinglogo.png"
            alt="Selected Work"
            width={24}
            height={24}
          />
        </Link>
        <div className="flex items-center gap-6">
          <a
            href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-in`}
            className="w-20 border-2 border-[#1F4287] p-2 text-center text-sm font-medium hover:border-primary hover:text-primary"
            // prefetch={false}
          >
            Login
          </a>
          <a
            href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-up`}
            className="inline-flex w-24 items-center justify-center bg-[#1F4287] p-2 font-medium text-[#E4EDDB] shadow transition-colors hover:bg-primary"
          >
            Sign Up
          </a>
        </div>
      </header>
      <main className="flex flex-1 flex-col-reverse items-center justify-center gap-10 text-[#1F4287] lg:flex-row lg:justify-between ">
        <div className="flex flex-col items-center justify-center space-y-4 text-center lg:ml-10 lg:items-start lg:space-y-6 lg:text-left">
          <span className="flex w-full flex-row items-center justify-center text-center lg:justify-start lg:text-left">
            <Image
              src="/landinglogo.png"
              className="mr-4"
              alt="Selected Work"
              width={35}
              height={35}
            />
            <span>
              <h1 className="text-center text-3xl font-semibold tracking-tighter sm:text-5xl md:text-6xl lg:text-left">
                Selected Work
              </h1>
            </span>
          </span>
          <p className="md:text-xl">
            Create a professional portfolio website in minutes.
          </p>
          <div className="mt-4 flex w-full flex-row justify-center gap-6 sm:flex-row lg:justify-start lg:gap-10">
            <a
              href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-up`}
              className="inline-flex h-12 items-center justify-center bg-[#1F4287] px-4 text-lg font-medium text-[#E4EDDB] transition-colors hover:bg-primary lg:px-8 lg:text-xl"
            >
              Get Started
            </a>
            <a
              href={`http://camdenross.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
              className="inline-flex h-10 items-center border-b-2 border-[#1F4287] bg-transparent px-1 text-lg font-medium transition-colors hover:border-primary hover:text-primary lg:px-2 lg:text-xl"
              target="_blank"
            >
              View Demo Site <ArrowUpRight size={26} className="ml-2" />
            </a>
          </div>
        </div>
        <div className="flex justify-end lg:m-0">
          <Image
            className=""
            src="/landinglarge.png"
            alt="Selected Work"
            width={900}
            height={500}
          />
        </div>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 px-4 py-2 text-[#1F4287] sm:flex-row md:px-6">
        {/* <p className="text-sm">
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
        </nav> */}
      </footer>
    </div>
  );
}
