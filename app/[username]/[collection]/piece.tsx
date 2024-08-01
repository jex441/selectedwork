'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { IWork } from '@/app/interfaces/IWork';
import Modal from './Modal';

export default function piece({ data }: { data: IWork }) {
  const [modal, setModal] = useState(false);
  return (
    <>
      {modal && <Modal setModal={setModal} data={data} />}
      <section
        key={data.id}
        onClick={() => setModal(true)}
        className="border-1 relative mx-1 mb-8 grid h-auto w-full cursor-pointer justify-items-stretch gap-3 lg:mx-3 lg:h-[300px] lg:w-auto"
      >
        <Image
          width={0}
          height={0}
          alt="work"
          sizes="100vw"
          className="max-h-[620px] w-full self-center object-contain lg:max-h-[270px]"
          src={data.media[0].url ?? ''}
        />
        <div className="flex w-full self-start self-end text-xs tracking-wide lg:mt-0 lg:w-auto">
          <span className="uppercase italic text-gray-600">{data.title}</span>
          <span className="ml-3 text-gray-400">
            {data.year && `${data.year}`}
          </span>
        </div>
      </section>
    </>
  );
}
