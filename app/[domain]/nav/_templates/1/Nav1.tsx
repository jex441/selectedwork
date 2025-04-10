'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';

import { ICollection } from '@/app/interfaces/ICollection';
import { IPage } from '@/app/interfaces/IPage';
import menu from '@/public/menu.png';
import React from 'react';

import instagramLogo from '/public/instagram.png';
import { set } from 'zod';

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

  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.matchMedia('(min-width: 1024px)').matches);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious();
    if (previous === undefined) return;

    if (isLargeScreen) {
      if (current > previous && current > 100) {
        setIsHidden(true);
      } else if (current < previous) {
        setIsHidden(false);
      }
      if (current <= 100) {
        setIsHidden(false);
      }
    } else {
      setIsHidden(false);
    }
  });

  const clickHandler = (slug: string | void | undefined | null) => {
    setOpen(false);
    setDropDown('hidden');
    const times: { [key: number]: number } = {
      0: 1000,
      1: 2000,
      2: 2000,
      3: 1000,
      4: 1000,
    };
    const randomNumberBetween0and4 = Math.floor(Math.random() * 5);
    const loadTime: number = times[randomNumberBetween0and4] as number;
    setLoadTime(String(loadTime / 1000));
    if (slug || slug === '') {
      setWidth('100%');
      setTimeout(() => {
        window.location.href = `/${slug}`;
      }, loadTime);
    }
  };

  const navVariants = {
    visible: { y: 0 },
    hidden: { y: '-100%' },
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
      <motion.main
        variants={navVariants}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        onMouseLeave={() => setDropDown('hidden')}
        className="fixed z-20 flex h-[70px] w-full items-center justify-between bg-white p-0 px-5 text-darkGray transition-colors duration-500 lg:px-12 lg:py-10"
      >
        <div className="flex flex-row items-center">
          <header className="mr-6 text-2xl tracking-wide">
            <span
              className="cursor-pointer"
              onMouseEnter={() => setDropDown('hidden')}
              onClick={() => clickHandler('')}
            >
              {displayName}
            </span>
          </header>

          <div
            onClick={() => setOpen(!open)}
            className="fixed right-5 top-5 z-20 h-[25px] w-[25px] lg:hidden"
          >
            <Image
              height={25}
              width={25}
              alt="menu"
              src={menu}
              priority
              loading="eager"
              quality={85}
              placeholder="empty"
            />
          </div>

          <nav
            className={`fixed left-0 top-0 z-10 h-full w-full flex-col gap-4 bg-white px-5 pl-10 pt-20 text-[32px] transition-transform duration-300 lg:static lg:z-auto lg:ml-5 lg:flex lg:h-auto lg:w-auto lg:flex-row lg:items-center lg:gap-4 lg:bg-transparent lg:p-0 lg:text-sm ${
              open
                ? 'flex translate-x-0'
                : 'flex translate-x-full lg:translate-x-0'
            }`}
          >
            {collections.length > 3 ? (
              <span onMouseEnter={() => setDropDown('flex')}>
                <span
                  className="cursor-pointer tracking-wide text-mediumGray transition-all hover:text-darkGray lg:text-xs"
                  onClick={() => clickHandler(collections[0].slug)}
                >
                  Selected Work
                </span>
              </span>
            ) : (
              collections.map((collection) => (
                <span key={collection.id}>
                  <span
                    className="cursor-pointer tracking-wide text-mediumGray transition-all hover:text-darkGray lg:text-xs"
                    onClick={() => clickHandler(collection.slug)}
                  >
                    {collection.title}
                  </span>
                </span>
              ))
            )}
            <section
              className={`${dropDown} fixed left-0 top-[70px] h-auto w-full flex-col gap-2 bg-white p-5 lg:absolute lg:left-auto lg:top-[60px] lg:h-[200px] lg:w-auto lg:pl-5`}
            >
              {collections.length > 1 &&
                collections.map((collection) => (
                  <span key={collection.id}>
                    <span
                      className="cursor-pointer"
                      onClick={() => clickHandler(collection.slug)}
                    >
                      {collection.title}
                    </span>
                  </span>
                ))}
            </section>
            {pages !== null &&
              pages.map((page) => (
                <span key={page.title}>
                  <span
                    className="cursor-pointer tracking-wide text-mediumGray transition-all hover:text-darkGray lg:text-xs"
                    onClick={() => clickHandler(page.slug)}
                  >
                    {page.title}
                  </span>
                </span>
              ))}
            <span className="block lg:hidden">
              {instagram && (
                <a href={instagram} target="_blank" rel="noreferrer">
                  <span className="flex flex-row items-center justify-start gap-4 pt-4">
                    <Image
                      className="self-center"
                      height={20}
                      width={20}
                      alt="instagram"
                      src={instagramLogo}
                      priority
                      loading="eager"
                      quality={85}
                      placeholder="empty"
                    />
                  </span>
                </a>
              )}
            </span>
          </nav>
        </div>

        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:block"
          >
            <span className="flex flex-row items-center justify-end gap-4">
              <Image
                className="self-center"
                height={20}
                width={20}
                alt="instagram"
                src={instagramLogo}
                priority
                loading="eager"
                quality={85}
                placeholder="empty"
              />
            </span>
          </a>
        )}
      </motion.main>
      <div
        className={`${dropDown} fixed inset-0 z-10 w-full overflow-hidden bg-black/30 lg:absolute`}
      ></div>
    </>
  );
}
