'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { IWork } from '@/app/interfaces/IWork';
import Modal from './Modal';

export default function Piece({
  data,
  artist,
  works,
  index,
}: {
  data: IWork;
  works: IWork[];
  index: number;
  artist: string;
}) {
  const [modal, setModal] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const domRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setVisible(true);
            setHasAnimated(true);
            domRef.current?.classList.add('fade-in-from-bottom', 'is-visible');
          } else if (!entry.isIntersecting && !hasAnimated) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.1 },
    ); // Adjust threshold as needed

    if (domRef.current) observer.observe(domRef.current);

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, [hasAnimated]);

  return (
    <>
      {modal && (
        <Modal
          index={index}
          works={works}
          artist={artist}
          modal={modal}
          setModal={setModal}
          data={data}
        />
      )}
      <section
        ref={domRef}
        key={data.id}
        onClick={() => setModal(true)}
        className={`${data.id !== null && data.id % 4 === 0 && 'animDelay'} fade-in-from-bottom border-1 relative mx-1 mb-8 grid h-auto w-full cursor-pointer justify-items-stretch gap-3 lg:mx-3 lg:h-[340px] lg:w-auto`}
      >
        <Image
          width={0}
          height={0}
          alt="work"
          sizes="100vw"
          className="max-h-[620px] w-full self-center object-contain lg:h-[310px]"
          src={data.media[0].url ?? ''}
        />
        <div className="flex w-full self-start self-end text-xs tracking-wide lg:mt-0 lg:w-auto">
          <span className="text-mediumGray uppercase italic">{data.title}</span>
          <span className="text-lightGray ml-3">
            {data.year && `${data.year}`}
          </span>
        </div>
      </section>
    </>
  );
}
