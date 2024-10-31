'use client';

import { useState } from 'react';
import span from 'next/span';
import Image from 'next/image';

import { ICollection } from '@/app/interfaces/ICollection';
import menu from '@/public/menu.png';
import React from 'react';
import { IPage } from '@/app/interfaces/IPage';

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
  const [width, setWidth] = useState('0%');
  const [loadTime, setLoadTime] = useState('0');
  const clickHandler = (slug: string | void) => {
    setOpen(false);
    setDropDown('hidden');
    const times = { 0: 1000, 1: 2000, 2: 2000, 3: 1000, 4: 1000 };
    const randomNumberBetween0and4 = Math.floor(Math.random() * 5);
    const loadTime = times[randomNumberBetween0and4];
    setLoadTime(String(loadTime / 1000));
    if (slug || slug === '') {
      setWidth('100%');
      setTimeout(() => {
        window.location.href = `/${slug}`;
      }, loadTime);
    }
  };

  return (
    <>
      <div
        style={{
          width: width,
          transition: `width ${loadTime}s ease-in-out`,
        }}
        className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-mediumGray transition-all"
      ></div>
      <main className="fixed z-20 flex h-[70px] w-full bg-white text-darkGray lg:h-screen lg:w-[230px] lg:px-8 lg:py-10">
        <div className="max-w-inherit z-20">
          <header className="text-wrap m-5 w-full max-w-[200px] cursor-pointer tracking-wide lg:m-5 lg:my-0 lg:text-lg">
            <span onClick={() => clickHandler('')}>{displayName}</span>
          </header>

          <div
            onClick={() => setOpen(!open)}
            className="fixed right-5 top-5 z-20 h-[25px] w-[25px] lg:hidden"
          >
            <Image height={25} width={25} alt="menu" src={menu} />
          </div>

          <nav
            className={`${open ? 'flex' : 'hidden'} fixed top-11 z-10 h-full w-full flex-col gap-4 bg-white px-5 pl-10 pt-14 text-[32px] lg:top-auto lg:flex lg:w-auto lg:gap-1 lg:px-0 lg:pl-5 lg:text-sm`}
          >
            <span
              className={`${collections.length > 1 ? 'mb-5' : ''} flex flex-col gap-1`}
            >
              {collections.map((collection) => (
                <span key={collection.id}>
                  <span
                    className="cursor-pointer tracking-wide text-mediumGray transition-all hover:text-darkGray"
                    onClick={() => clickHandler(collection.slug)}
                  >
                    {collection.title}
                  </span>
                </span>
              ))}
            </span>
            {pages !== null &&
              pages.map((page) => (
                <span key={page.title}>
                  <span
                    className={`${collections.length > 1 ? 'lg:text-xs' : ''} cursor-pointer tracking-wide text-mediumGray transition-all hover:text-darkGray`}
                    onClick={() => clickHandler(page.slug)}
                  >
                    {page.title}
                  </span>
                </span>
              ))}
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
