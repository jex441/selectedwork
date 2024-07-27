'use client';

import React from 'react';
import Piece from './piece';

export default function Work({ data }: {}) {
  return (
    <main className="flex w-full flex-row items-start justify-start">
      {data && data.works.map((work) => <Piece data={work} />)}
    </main>
  );
}
