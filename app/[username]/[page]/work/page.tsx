'use client';

import React from 'react';
import Piece from './piece';

export default function Work({ data }: {}) {
  return (
    <main className="flex w-full flex-wrap justify-center">
      {data && data.works.map((work) => <Piece data={work} />)}
    </main>
  );
}
