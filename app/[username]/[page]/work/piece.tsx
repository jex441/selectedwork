import React from 'react';
import Image from 'next/image';

export default function piece({ data }: {}) {
  return (
    <section className="border-1 relative m-2 grid h-auto w-full justify-items-stretch bg-green-100 lg:m-5 lg:h-[290px] lg:w-[305px]">
      <figure className="relative h-[400px] w-full self-center justify-self-center bg-red-100 object-contain lg:h-[230px] lg:w-[305px]">
        <Image
          fill
          alt="work"
          objectFit="contain"
          style={{ objectFit: 'contain' }}
          src={data.media[0].url}
        />
      </figure>
      <div className="flex w-[305px] self-end justify-self-center text-sm tracking-wide ">
        <span className="uppercase italic text-gray-600">{data.title}</span>
        <span className="ml-3 text-gray-400">
          {data.year && `${data.year}`}
        </span>
      </div>
    </section>
  );
}
