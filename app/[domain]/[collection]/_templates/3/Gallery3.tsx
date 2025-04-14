'use client';

import React, { useState } from 'react';
import { ICollection } from '@/app/interfaces/ICollection';
import Piece from './piece';
import { IWork } from '@/app/interfaces/IWork';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Modal from '../../_components/Modal';

export default function page({ data, user }: { data: ICollection; user: any }) {
  const { works } = data || {};
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (!works) {
    return 'loading';
  }

  const scrollHandler = (dir = 'r') => {
    const container = document.querySelector('.overflow-x-auto');
    if (!container) return;
    const scrollAmount = 1200;
    if (dir === 'r') {
      container.scrollLeft += scrollAmount;
    } else {
      container.scrollLeft -= scrollAmount;
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth,
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
        className=".scrollbar-hidden flex w-screen flex-row overflow-x-auto lg:space-x-10"
        style={{ scrollbarWidth: 'none', scrollBehavior: 'smooth' }}
        onScroll={handleScroll}
      >
        {canScrollLeft && (
          <button
            onClick={() => {
              scrollHandler('l');
            }}
            className="fixed left-5 top-[45%] z-40 rounded-full p-2 opacity-80 transition-all before:absolute before:inset-0
            before:rounded-full before:bg-white before:opacity-0 before:transition-opacity before:content-[''] hover:opacity-100 group-hover:before:opacity-80"
          >
            <ChevronLeft size={45} color={'black'} className="relative z-10" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => {
              scrollHandler('r');
            }}
            className="fixed right-5 top-[45%] z-40 rounded-full p-2 opacity-80 transition-all before:absolute before:inset-0
            before:rounded-full before:bg-white before:opacity-0 before:transition-opacity before:content-[''] hover:opacity-100 group-hover:before:opacity-80"
          >
            <ChevronRight size={45} color={'black'} className="relative z-10" />
          </button>
        )}

        {/* Description */}
        <div className="flex w-[700px] shrink-0 flex-col gap-2 px-14">
          <h1 className="text-xl text-mediumGray">Collection</h1>
          <h2 className="text-sm text-lightGray">New York</h2>
          <p className="w-full text-xs leading-5 text-mediumGray">
            {data?.description}Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quos. Lorrem ipsum dolor sit
            amet consectetur adipisicing elit. Quisquam, rem. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Quisquam
            <br /> quos. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, quos. Lorrem ipsum dolor sit amet consectetur
            adipisicing elit.
          </p>
          <p className="w-full text-xs leading-5 text-mediumGray">
            {data?.description}Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quos. Lorrem ipsum dolor sit
            amet consectetur adipisicing elit. Quisquam, rem. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Quisquam
            <br /> quos. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, quos. Lorrem ipsum dolor sit amet consectetur
            adipisicing elit.
          </p>
        </div>
        {/* End of Description */}

        {/* Gallery */}
        {works &&
          data.works.map((work: IWork, index: number) => (
            <Piece
              modal={modal}
              setModal={setModal}
              clickHandler={clickHandler}
              index={index}
              works={works}
              artist={user ? user.displayName : ''}
              key={work.id}
              data={work}
            />
          ))}
        <div className="h-[100px] w-full bg-red-500"></div>
      </div>
    </main>
  );
}
