import React from 'react';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';
export default function piece({ data }: {}) {
  return (
    <section className="border-1 relative m-5 grid h-[290px] w-[300px] justify-items-stretch">
      <figure className="relative h-[220px] w-[280px] self-center justify-self-center object-contain">
        <Image
          fill
          alt="work"
          objectFit="contain"
          style={{ objectFit: 'contain' }}
          src={data.media[0].url}
        />
      </figure>
      <div className="flex w-[280px] self-end justify-self-center text-sm tracking-wide text-gray-500">
        <span className="mr-2 italic">{data.title}</span>
        <span>{data.year && `${data.year}`}</span>
      </div>
    </section>
  );
}
