'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import menu from '/public/menu.png';
import React from 'react';

export default function Nav({
  username,
  displayName,
}: {
  username: string;
  displayName: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed z-20 flex h-[60px] w-full flex-row  bg-white lg:static lg:items-center">
      <header className="absolute z-20 m-5 lg:static lg:mr-6 lg:text-xl">
        <Link href={`/${username}/`}>{displayName}</Link>
      </header>

      <div
        onClick={() => setOpen(!open)}
        className="fixed right-5 top-5 z-20 h-[25px] w-[25px] lg:hidden"
      >
        <Image height={25} width={25} alt="menu" src={menu} />
      </div>

      <nav
        className={`${open ? 'flex' : 'hidden'} fixed z-10 h-full w-full flex-col bg-white p-20 text-[32px] font-light lg:static lg:m-5 lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-4 lg:p-0 lg:text-sm`}
      >
        <span>
          <Link onClick={() => setOpen(false)} href={`/${username}/work`}>
            Selected Work
          </Link>
        </span>
        <span>
          <Link onClick={() => setOpen(false)} href={`/${username}/about`}>
            About
          </Link>
        </span>
        <span>
          <Link onClick={() => setOpen(false)} href={`/${username}/contact`}>
            Contact
          </Link>
        </span>
        <span>
          <Link onClick={() => setOpen(false)} href={`/${username}/cv`}>
            CV
          </Link>
        </span>
      </nav>
    </div>
  );
}
