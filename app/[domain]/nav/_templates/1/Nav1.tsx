'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ICollection } from '@/app/interfaces/ICollection';
import { IPage } from '@/app/interfaces/IPage';
import menu from '@/public/menu.png';
import React from 'react';

import instagramLogo from '/public/instagram.png';

export default function Nav({
  displayName,
  collections,
  instagram,
  pages,
}: {
  displayName: string;
  collections: ICollection[] | [];
  instagram: string | null;
  pages: IPage[] | null;
}) {
  const [open, setOpen] = useState(false);
  const [dropDown, setDropDown] = useState('hidden');

  const clickHandler = () => {
    setOpen(false);
    setDropDown('hidden');
  };

  return (
    <>
      <main
        onMouseLeave={() => setDropDown('hidden')}
        className="fixed z-20 flex h-[70px] w-full bg-white text-darkGray lg:static  lg:flex-row lg:items-center lg:justify-between lg:p-12 lg:px-12"
      >
        <div className="fixed z-20 flex lg:static lg:flex-row lg:items-center">
          <header className="m-5 tracking-wide lg:m-0 lg:my-0 lg:mr-6 lg:text-2xl">
            <Link
              onMouseEnter={() => setDropDown('hidden')}
              onClick={() => clickHandler()}
              href={'/'}
            >
              {displayName}
            </Link>
          </header>

          <div
            onClick={() => setOpen(!open)}
            className="fixed right-5 top-5 z-20 h-[25px] w-[25px] lg:hidden"
          >
            <Image height={25} width={25} alt="menu" src={menu} />
          </div>

          <nav
            className={`${open ? 'flex' : 'hidden'} fixed z-10 h-full w-full flex-col gap-4 bg-white px-5 pl-10 pt-20 text-[32px] lg:static lg:mx-5 lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-4 lg:p-0 lg:text-sm`}
          >
            {collections.length > 3 ? (
              <span
                onClick={() => clickHandler()}
                onMouseEnter={() => setDropDown('flex')}
              >
                <Link
                  className="tracking-wide text-mediumGray transition-all hover:text-darkGray"
                  href={`/${collections[0].slug}`}
                >
                  Selected Work
                </Link>
              </span>
            ) : (
              collections.map((collection) => (
                <span key={collection.id}>
                  <Link
                    className="tracking-wide text-mediumGray transition-all hover:text-darkGray"
                    onClick={() => clickHandler()}
                    href={`/${collection.slug}`}
                  >
                    {collection.title}
                  </Link>
                </span>
              ))
            )}
            <section
              className={`${dropDown} left-0 top-[60px] h-[200px] w-full flex-col gap-2 bg-white lg:absolute lg:p-5 lg:pl-60`}
            >
              {collections.length > 1 &&
                collections.map((collection) => (
                  <span key={collection.id}>
                    <Link
                      onClick={() => clickHandler()}
                      href={`/${collection.slug}`}
                    >
                      {collection.title}
                    </Link>
                  </span>
                ))}
            </section>
            {pages.map((page) => (
              <span key={page.title}>
                <Link
                  className="tracking-wide text-mediumGray transition-all hover:text-darkGray"
                  onClick={() => clickHandler()}
                  href={`/${page.slug}`}
                >
                  {page.title}
                </Link>
              </span>
            ))}
            <span className="block lg:hidden">
              {instagram && (
                <a href={instagram} target="_blank" rel="noreferrer">
                  <span className="hidden lg:flex lg:flex-row lg:items-center lg:justify-end lg:gap-4">
                    <Image
                      className="self-end"
                      height={20}
                      width={20}
                      alt="instagram"
                      src={instagramLogo}
                    />
                  </span>
                </a>
              )}
            </span>
          </nav>
        </div>
        {instagram && (
          <a href={instagram} target="_blank" rel="noreferrer">
            <span className="mx-5 hidden lg:flex lg:flex-row lg:items-center lg:justify-end lg:gap-4">
              <Image
                className="self-end"
                height={20}
                width={20}
                alt="instagram"
                src={instagramLogo}
              />
            </span>
          </a>
        )}
      </main>
      <div
        className={`${dropDown} absolute bottom-0 left-0 top-0 z-10 w-full overflow-hidden bg-black/30`}
      ></div>
    </>
  );
}
