'use client';

import React from 'react';
import { ICollection } from '@/app/interfaces/ICollection';
import Piece from './piece';
import { IWork } from '@/app/interfaces/IWork';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  return (
    <main className="flex min-h-[80vh] flex-wrap justify-center bg-green-100">
      <div
        className=".scrollbar-hidden flex w-screen flex-row overflow-x-auto bg-red-100 md:mt-10 lg:space-x-10"
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
