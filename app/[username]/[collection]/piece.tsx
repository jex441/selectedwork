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
        onClick={() => setModal(true)}
        className="border-1 relative mx-1 mb-6 grid h-auto w-full cursor-pointer justify-items-stretch lg:m-3 lg:h-[290px] lg:w-[305px]"
      >
        <figure className="flex max-h-[620px] w-full items-center justify-center self-center justify-self-center bg-red-100 lg:h-[230px] lg:w-[auto]">
          <Image
            width={0}
            height={0}
            alt="work"
            sizes="100vw"
            style={{ width: 'auto', height: '100%' }}
            src={data.media[0].url ?? ''}
          />
        </figure>
        <div className="mt-4 flex w-full self-end justify-self-center text-xs tracking-wide lg:mt-0 lg:w-auto">
          <span className="uppercase italic text-gray-600">{data.title}</span>
          <span className="ml-3 text-gray-400">
            {data.year && `${data.year}`}
          </span>
        </div>
      </section>
    </>
  );
}
