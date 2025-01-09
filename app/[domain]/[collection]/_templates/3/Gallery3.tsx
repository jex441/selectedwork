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
    <main className="flex min-h-[80vh] flex-wrap justify-center">
      {modal && (
        <Modal
          index={index}
          works={works}
          artist={artist}
          modal={modal}
          setModal={setModal}
          data={currentWork}
        />
      )}
      <div
        style={{
          width: loaderWidth,
          transition: `width 1s ease-in-out`,
        }}
        className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-black transition-all"
      ></div>

      <div
        className=".scrollbar-hidden flex w-screen flex-row overflow-x-auto md:mt-10 lg:space-x-10"
        style={{ scrollbarWidth: 'none', scrollBehavior: 'smooth' }}
      >
        <button
          onClick={() => {
            scrollHandler('l');
          }}
          className="fixed left-0 top-[45%] z-50 hidden opacity-50 transition-all hover:opacity-100 lg:block"
        >
          <ChevronLeft size={45} color={'#ccc'} />
        </button>
        <button
          onClick={() => {
            scrollHandler('r');
          }}
          className="fixed right-0 top-[45%] z-50 hidden opacity-50 transition-all hover:opacity-100 lg:block"
        >
          <ChevronRight size={45} color={'#ccc'} />
        </button>
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
