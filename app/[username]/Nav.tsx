'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ICollection } from '@/app/interfaces/ICollection';
import menu from '/public/menu.png';
import React from 'react';

export default function Nav({
  username,
  displayName,
  collections,
}: {
  username: string;
  displayName: string;
  collections: ICollection[] | [];
}) {
  const [open, setOpen] = useState(false);
  const [dropDown, setDropDown] = useState('hidden');

  const clickHandler = () => {
    setOpen(false);
    setDropDown('hidden');
  };
  return (
    <>
      <div
        onMouseLeave={() => setDropDown('hidden')}
        className="fixed z-20 flex h-[70px] w-full flex-row bg-white lg:static lg:items-center lg:p-10"
      >
        <header className="absolute z-10 m-5 tracking-wide lg:static lg:mr-6 lg:text-xl">
          <Link
            onMouseEnter={() => setDropDown('hidden')}
            onClick={() => clickHandler()}
            href={`/${username}/`}
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
          className={`${open ? 'flex' : 'hidden'} fixed z-10 h-full w-full flex-col gap-4 bg-white px-5 pl-10 pt-20 text-[32px] font-light lg:static lg:m-5 lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-4 lg:p-0 lg:text-sm`}
        >
          {collections.length > 1 ? (
            <span
              onClick={() => clickHandler()}
              onMouseEnter={() => setDropDown('flex')}
            >
              <Link href={`/${username}/${collections[0].slug}`}>
                Selected Work
              </Link>
            </span>
          ) : (
            <span onMouseEnter={() => clickHandler()}>
              <Link href={`/${username}/${collections[0].slug}`}>
                {collections[0].title}
              </Link>
            </span>
          )}

          <section
            className={`${dropDown} left-0 top-[60px] h-[200px] w-full flex-col gap-2 bg-white lg:absolute lg:p-5 lg:pl-60`}
          >
            {collections.length > 1 &&
              collections.map((collection) => (
                <span>
                  <Link
                    onClick={() => clickHandler()}
                    key={collection.id}
                    href={`/${username}/${collection.slug}`}
                  >
                    {collection.title}
                  </Link>
                </span>
              ))}
          </section>

          <span>
            <Link
              onMouseEnter={() => setDropDown('hidden')}
              onClick={() => clickHandler()}
              href={`/${username}/about`}
            >
              About
            </Link>
          </span>
          <span>
            <Link onClick={() => clickHandler()} href={`/${username}/cv`}>
              CV
            </Link>
          </span>
          <span>
            <Link onClick={() => clickHandler()} href={`/${username}/contact`}>
              Contact
            </Link>
          </span>
        </nav>
      </div>
      <div
        className={`${dropDown} absolute bottom-0 left-0 top-0 z-10 w-full overflow-hidden bg-black/30`}
      ></div>
    </>
  );
}
