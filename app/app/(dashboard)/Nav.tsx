'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  File,
  Settings,
  Globe,
  SquareUser,
  ArrowUpRight,
  LayoutGrid,
  SendHorizonal,
  MenuIcon,
} from 'lucide-react';

import Image from 'next/image';
import { UserButton, SignOutButton } from '@clerk/nextjs';
import { IUser } from '@/app/interfaces/IUser';

const toggleNav = () => {
  const nav = document.querySelector('.nav');
  nav?.classList.toggle('hidden');
};

export default function Nav({ user }: { user: IUser }) {
  return (
    <>
      <div
        onClick={() => toggleNav()}
        className="absolute right-5 top-3 z-10 block h-4 w-4 md:hidden"
      >
        <MenuIcon />
      </div>
      <div className="nav fixed hidden h-screen w-5/6 flex-col items-stretch border-r bg-gray-100 dark:bg-gray-800/40 md:flex md:w-1/6 md:bg-gray-100/40">
        <div className="flex h-14 px-7">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Image
              className="opacity-60"
              src="/logo.png"
              alt="Selected Work"
              width={22}
              height={22}
            />
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-2 p-4">
            {/* <Link
          className="flex items-center gap-3 rounded-lg hover:bg-stone-200 px-3 py-2 text-gray-500 text-sm font-bold transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href="/"
        >
          <Home className="h-4 w-4" />
          Home
        </Link> */}
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-500 transition-all hover:bg-stone-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/collections"
            >
              <LayoutGrid className="h-4 w-4" />
              Collections
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-500 transition-all hover:bg-stone-200 hover:text-gray-900 active:text-stone-200 dark:text-gray-400 dark:hover:text-gray-50"
              href="/about"
            >
              <SquareUser className="h-4 w-4" />
              About
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-500 transition-all hover:bg-stone-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/contact"
            >
              <SendHorizonal className="h-4 w-4" />
              Contact
            </Link>
            <Link
              className="t font-boldransition-all flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sm font-bold text-gray-500 hover:bg-stone-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/cv"
            >
              <File className="h-4 w-4" />
              CV
            </Link>
          </nav>
        </ScrollArea>
        <div className="mt-auto p-4">
          <nav className="flex flex-col gap-2">
            <Link
              href={`http${process.env.NODE_ENV !== 'development' ? 's' : ''}://${user.username}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
              target="_blank"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-500 transition-all hover:bg-stone-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <Globe className="h-4 w-4" />
              View Your Site
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-500 transition-all hover:bg-stone-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/account"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <div className="flex items-center gap-3 rounded-lg border-t-2 px-3 py-2 pt-2 text-sm font-bold text-gray-500 transition-all hover:bg-stone-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              <UserButton />
              {user.displayName}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
