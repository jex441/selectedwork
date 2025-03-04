'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import {
  File,
  Settings,
  Globe,
  SquareUser,
  ArrowUpRight,
  LayoutGrid,
  SendHorizonal,
  MenuIcon,
  Eye,
  EyeOffIcon,
  HomeIcon,
  Newspaper,
} from 'lucide-react';

import { togglePageVisibility } from '@/app/lib/data';

import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { IUser } from '@/app/interfaces/IUser';

export default function Nav({ user }: { user: IUser }) {
  const [nav, setNav] = useState('-translate-x-full');
  const toggleNav = () => {
    setNav(
      nav === 'w-full translate-x-0'
        ? '-translate-x-full'
        : 'w-full translate-x-0',
    );
  };

  const togglePageVisibilityHandler = async (title: string, value: boolean) => {
    await togglePageVisibility(title, value);
  };
  return (
    <>
      <div
        onClick={() => toggleNav()}
        className="absolute right-5 top-3 z-50 block h-4 w-4 md:hidden"
      >
        <MenuIcon />
      </div>
      <div
        className={`${nav} fixed z-30 h-screen transform flex-col items-stretch border-r bg-gray-100 transition-all dark:bg-gray-800/40 md:flex md:w-1/6 md:translate-x-0 md:bg-gray-100/40`}
      >
        <div className="flex h-full flex-1 flex-col gap-2">
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
          <nav className="flex flex-col p-4">
            <div className="flex flex flex-row items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-500 transition-all hover:bg-stone-200 hover:text-gray-900 active:text-stone-200 dark:text-gray-400 dark:hover:text-gray-50">
              <span className="flex flex-row gap-3">
                <HomeIcon className="h-4 w-4" />

                <Link onClick={() => toggleNav()} href="/landing">
                  Home
                </Link>
              </span>
              <span>
                {user.home && user.home.visibility ? (
                  <Eye
                    onClick={() => togglePageVisibilityHandler('home', false)}
                    className="h-4 w-4 cursor-pointer opacity-60 transition-all hover:opacity-100"
                  />
                ) : (
                  <EyeOffIcon
                    onClick={() => togglePageVisibilityHandler('home', true)}
                    className="h-4 w-4 cursor-pointer opacity-60 transition-all hover:opacity-100"
                  />
                )}
              </span>
            </div>

            <Link
              onClick={() => toggleNav()}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-500 transition-all hover:bg-stone-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/collections"
            >
              <LayoutGrid className="h-4 w-4" />
              Collections
            </Link>

            <div className="flex flex flex-row items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-500 transition-all hover:bg-stone-200 hover:text-gray-900 active:text-stone-200 dark:text-gray-400 dark:hover:text-gray-50">
              <span className="flex flex-row gap-3">
                <SquareUser className="h-4 w-4" />

                <Link onClick={() => toggleNav()} href="/about">
                  About
                </Link>
              </span>
              <span>
                {user.about && user.about.visibility ? (
                  <Eye
                    onClick={() => togglePageVisibilityHandler('about', false)}
                    className="h-4 w-4 cursor-pointer opacity-60 transition-all hover:opacity-100"
                  />
                ) : (
                  <EyeOffIcon
                    onClick={() => togglePageVisibilityHandler('about', true)}
                    className="h-4 w-4 cursor-pointer opacity-60 transition-all hover:opacity-100"
                  />
                )}
              </span>
            </div>

            <div className="flex flex flex-row items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-500 transition-all hover:bg-stone-200 hover:text-gray-900 active:text-stone-200 dark:text-gray-400 dark:hover:text-gray-50">
              <span className="flex flex-row gap-3">
                <Newspaper className="h-4 w-4" />

                <Link onClick={() => toggleNav()} href="/classes">
                  Classes
                </Link>
              </span>
              <span>
                {user.workshops && user.workshops.visibility ? (
                  <Eye
                    onClick={() =>
                      togglePageVisibilityHandler('workshops', false)
                    }
                    className="h-4 w-4 cursor-pointer opacity-60 transition-all hover:opacity-100"
                  />
                ) : (
                  <EyeOffIcon
                    onClick={() =>
                      togglePageVisibilityHandler('workshops', true)
                    }
                    className="h-4 w-4 cursor-pointer opacity-60 transition-all hover:opacity-100"
                  />
                )}
              </span>
            </div>

            <div className="flex flex flex-row items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-500 transition-all hover:bg-stone-200 hover:text-gray-900 active:text-stone-200 dark:text-gray-400 dark:hover:text-gray-50">
              <span className="flex flex-row gap-3">
                <SendHorizonal className="h-4 w-4" />

                <Link onClick={() => toggleNav()} href="/contact">
                  Contact
                </Link>
              </span>
              <span>
                {user.contact && user.contact.visibility ? (
                  <Eye
                    onClick={() =>
                      togglePageVisibilityHandler('contact', false)
                    }
                    className="h-4 w-4 cursor-pointer opacity-60 transition-all hover:opacity-100"
                  />
                ) : (
                  <EyeOffIcon
                    onClick={() => togglePageVisibilityHandler('contact', true)}
                    className="h-4 w-4 cursor-pointer opacity-60 transition-all hover:opacity-100"
                  />
                )}
              </span>
            </div>

            <div className="flex flex flex-row items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-500 transition-all hover:bg-stone-200 hover:text-gray-900 active:text-stone-200 dark:text-gray-400 dark:hover:text-gray-50">
              <span className="flex flex-row gap-3">
                <File className="h-4 w-4" />

                <Link onClick={() => toggleNav()} href="/cv">
                  CV
                </Link>
              </span>
              <span>
                {user.cv && user.cv.visibility ? (
                  <Eye
                    onClick={() => togglePageVisibilityHandler('cv', false)}
                    className="h-4 w-4 cursor-pointer opacity-60 transition-all hover:opacity-100"
                  />
                ) : (
                  <EyeOffIcon
                    onClick={() => togglePageVisibilityHandler('cv', true)}
                    className="h-4 w-4 cursor-pointer opacity-60 transition-all hover:opacity-100"
                  />
                )}
              </span>
            </div>
          </nav>
          <div className="mt-auto p-4">
            <nav className="flex flex-col gap-2">
              <Link
                onClick={() => toggleNav()}
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
                onClick={() => toggleNav()}
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
      </div>
    </>
  );
}
