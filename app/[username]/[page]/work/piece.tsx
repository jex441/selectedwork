import React from 'react';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';
export default function piece({ data }: {}) {
  return (
    <section className="m-5 flex h-[420px] w-[420px] flex-col justify-center">
      <figure className="relative flex h-[380px] w-[400px] flex-1 items-center justify-center object-contain">
        <Image
          fill
          alt="work"
          objectFit="contain"
          sizes="(max-height: 400px)"
          style={{ objectFit: 'contain' }}
          src={data.media[0].url}
        />
      </figure>
      <span className="mt-2 block">{data.title}</span>
    </section>
  );
}
