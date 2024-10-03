'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ICollection } from '@/app/interfaces/ICollection';
import menu from '@/public/menu.png';
import React from 'react';

import instagramLogo from '/public/instagram.png';

export default function Nav({
  displayName,
  collections,
  instagram,
}: {
  displayName: string;
  collections: ICollection[] | [];
  instagram: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [dropDown, setDropDown] = useState('hidden');

  const clickHandler = () => {
    setOpen(false);
    setDropDown('hidden');
  };

  return (
    <>
      <main className="fixed z-20 flex h-[70px] w-full bg-white text-darkGray lg:h-screen lg:w-[230px] lg:px-8 lg:py-10">
        <div className="max-w-inherit z-20">
          <header className="text-wrap m-5 w-full max-w-[200px] tracking-wide lg:m-5 lg:my-0 lg:text-lg">
            <Link href={'/'}>{displayName}</Link>
          </header>

          <div
            onClick={() => setOpen(!open)}
            className="fixed right-5 top-5 z-20 h-[25px] w-[25px] lg:hidden"
          >
            <Image height={25} width={25} alt="menu" src={menu} />
          </div>

          <nav
            className={`${open ? 'flex' : 'hidden'} fixed top-11 z-10 h-full w-full flex-col gap-4 bg-white px-5 pl-10 pt-14 text-[32px] lg:top-auto lg:flex lg:w-auto lg:gap-2 lg:px-0 lg:pl-5 lg:text-sm`}
          >
            <span
              className={`${collections.length > 1 ? 'mb-5' : ''} flex flex-col gap-2`}
            >
              {collections.map((collection) => (
                <span key={collection.id}>
                  <Link
                    className="tracking-wide text-mediumGray transition-all hover:text-darkGray"
                    onClick={() => clickHandler()}
                    href={`/${collection.slug}`}
                  >
                    {collection.title}
                  </Link>
                </span>
              ))}
            </span>
            <span>
              <Link
                className={`${collections.length > 1 ? 'lg:text-xs' : ''} tracking-wide text-mediumGray transition-all hover:text-darkGray`}
                onMouseEnter={() => setDropDown('hidden')}
                onClick={() => clickHandler()}
                href={`/about`}
              >
                About
              </Link>
            </span>
            <span>
              <Link
                className={`${collections.length > 1 ? 'lg:text-xs' : ''} tracking-wide text-mediumGray transition-all hover:text-darkGray`}
                onClick={() => clickHandler()}
                href={`/cv`}
              >
                CV
              </Link>
            </span>
            <span>
              <Link
                className={`${collections.length > 1 ? 'lg:text-xs' : ''} tracking-wide text-mediumGray transition-all hover:text-darkGray`}
                onClick={() => clickHandler()}
                href={`/contact`}
              >
                Contact
              </Link>
            </span>
            {instagram && (
              <span className="mt-5">
                <a href={instagram} target="_blank" rel="noreferrer">
                  <Image
                    className=""
                    height={18}
                    width={18}
                    alt="instagram"
                    src={instagramLogo}
                  />
                </a>
              </span>
            )}
          </nav>
        </div>
      </main>
      <div
        className={`${dropDown} absolute bottom-0 left-0 top-0 z-10 w-full overflow-hidden bg-black/30`}
      ></div>
    </>
  );
}
