'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ICollection } from '@/app/interfaces/ICollection';
import Piece from './piece';
import { IWork } from '@/app/interfaces/IWork';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Modal from '../../_components/Modal';
import Image from 'next/image';
export default function page({ data, user }: { data: ICollection; user: any }) {
  const { works } = data || {};
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScrollButtons = () => {
      const container = containerRef.current;
      if (container) {
        const isScrollable = container.scrollWidth > container.clientWidth;
        const threshold = 1;
        setCanScrollLeft(container.scrollLeft > threshold);
        setCanScrollRight(
          isScrollable &&
            container.scrollLeft <
              container.scrollWidth - container.clientWidth - threshold,
        );
      }
    };

    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);

    let observer: MutationObserver | null = null;
    if (containerRef.current) {
      observer = new MutationObserver(updateScrollButtons);
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.removeEventListener('resize', updateScrollButtons);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [works]);

  if (!works) {
    return 'loading';
  }

  const scrollHandler = (dir = 'r') => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.9;
    if (dir === 'r') {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const threshold = 1;
    setCanScrollLeft(container.scrollLeft > threshold);
    setCanScrollRight(
      container.scrollLeft <
        container.scrollWidth - container.clientWidth - threshold,
    );
  };

  const [modal, setModal] = useState(false);
  const [loaderWidth, setLoaderWidth] = useState('0vw');
  const [currentWork, setCurrentWork] = useState<IWork>(works[0]);
  const [index, setIndex] = useState<number>(0);
  const artist = user ? user.displayName : '';

  const clickHandler = (currentWork: IWork, index: number) => {
    setLoaderWidth('100vw');
    setCurrentWork(currentWork);
    setIndex(index);
    setTimeout(() => {
      setModal(true);
      setLoaderWidth('0vw');
    }, 1000);
  };

  return (
    <main className="group flex min-h-[80vh] flex-col pt-5">
      <div
        ref={containerRef}
        className=".scrollbar-hidden flex w-screen snap-x snap-mandatory flex-row overflow-x-auto lg:snap-none lg:space-x-10"
        style={{ scrollbarWidth: 'none' }}
        onScroll={handleScroll}
      >
        {/* Collection meta data - Conditionally rendered */}
        {(data?.subheading ||
          data?.description ||
          data?.linkSrc1 ||
          data?.linkSrc2) && (
          <div className="flex w-[90vw] shrink-0 snap-start flex-col gap-2 px-4 lg:w-[700px] lg:px-14">
            <h1 className="text-xl text-mediumGray">{data?.title}</h1>
            <h2 className="text-sm text-lightGray">{data?.subheading}</h2>
            <p className="w-full text-xs leading-5 text-mediumGray">
              {data?.description}
            </p>
            <p className="w-full text-xs leading-5 text-mediumGray">
              {data?.linkSrc1}
            </p>
            <p className="w-full text-xs leading-5 text-mediumGray">
              {data?.linkSrc2}
            </p>
          </div>
        )}

        {/* Collection works */}
        {works &&
          data.works.map((work: IWork, index: number) => (
            <div key={work.id} className="shrink-0 snap-start">
              <Piece
                modal={modal}
                setModal={setModal}
                clickHandler={clickHandler}
                index={index}
                works={works}
                artist={user ? user.displayName : ''}
                data={work}
              />
            </div>
          ))}
      </div>
      {canScrollLeft && (
        <button
          onClick={() => {
            scrollHandler('l');
          }}
          className="fixed bottom-[5%] left-5 z-40 block rounded-full p-2 opacity-80 transition-all before:absolute before:inset-0
            before:rounded-full before:bg-white before:opacity-0 before:transition-opacity before:content-[''] hover:opacity-100 group-hover:before:opacity-80 lg:bottom-auto lg:top-[45%]"
        >
          <ChevronLeft size={45} color={'black'} className="relative z-10" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => {
            scrollHandler('r');
          }}
          className="fixed bottom-[5%] right-5 z-40 block rounded-full p-2 opacity-80 transition-all before:absolute before:inset-0
            before:rounded-full before:bg-white before:opacity-0 before:transition-opacity before:content-[''] hover:opacity-100 group-hover:before:opacity-80 lg:bottom-auto lg:top-[45%]"
        >
          <ChevronRight size={45} color={'black'} className="relative z-10" />
        </button>
      )}
    </main>
  );
}
