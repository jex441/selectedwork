'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { IWork } from '@/app/interfaces/IWork';
import Modal from './Modal';

export default function piece({ data }: { data: IWork }) {
  const [modal, setModal] = useState(false);
  const [isVisible, setVisible] = useState(true);
  const domRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    if (domRef.current) observer.observe(domRef.current);
    // return () => observer.unobserve(domRef.current);
  }, []);

  return (
    <>
      {modal && <Modal modal={modal} setModal={setModal} data={data} />}
      <section
        ref={domRef}
        key={data.id}
        onClick={() => setModal(true)}
        className={`fade-in-section ${isVisible ? 'is-visible' : ''} border-1 relative mx-1 mb-8 grid h-auto w-full cursor-pointer justify-items-stretch gap-3 lg:mx-3 lg:h-[340px] lg:w-auto`}
      >
        <Image
          width={0}
          height={0}
          alt="work"
          sizes="100vw"
          className={`max-h-[620px] w-full self-center object-contain lg:h-[310px]`}
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
