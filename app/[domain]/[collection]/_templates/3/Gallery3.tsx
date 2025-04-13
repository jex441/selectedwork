'use client';

import React, { useState } from 'react';
import { ICollection } from '@/app/interfaces/ICollection';
import Piece from './piece';
import { IWork } from '@/app/interfaces/IWork';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Modal from '../../_components/Modal';

export default function page({ data, user }: { data: ICollection; user: any }) {
  const { works } = data || {};

  if (!works) {
    return 'loading';
  }

  const scrollHandler = (dir = 'r') => {
    const container = document.querySelector('.overflow-x-auto');
    if (!container) return;
    const scrollAmount = 900;
    if (dir === 'r') {
      container.scrollLeft += scrollAmount;
    } else {
      container.scrollLeft -= scrollAmount;
    }
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
    <main className="flex min-h-[80vh] flex-col pt-5">
      <div
        className=".scrollbar-hidden flex w-screen flex-row overflow-x-auto lg:space-x-10"
        style={{ scrollbarWidth: 'none', scrollBehavior: 'smooth' }}
      >
        <button
          onClick={() => {
            scrollHandler('l');
          }}
          className="fixed left-0 top-[45%] z-40 hidden opacity-50 transition-all hover:opacity-100 lg:block"
        >
          <ChevronLeft size={45} color={'#ccc'} />
        </button>
        <button
          onClick={() => {
            scrollHandler('r');
          }}
          className="fixed right-0 top-[45%] z-40 hidden opacity-50 transition-all hover:opacity-100 lg:block"
        >
          <ChevronRight size={45} color={'#ccc'} />
        </button>

        {/* Description */}
        <div className="mx-12 mx-5 flex w-[700px] shrink-0 flex-col gap-2">
          <h1 className="text-xl text-mediumGray">Collection</h1>
          <h2 className="text-sm text-lightGray">New York</h2>
          <p className="max-w-[600px] text-xs leading-5 text-mediumGray">
            {data?.description}Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quos. Lorrem ipsum dolor sit
            amet consectetur adipisicing elit. Quisquam, rem. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Quisquam
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
      </div>
    </main>
  );
}
