'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { IWork } from '@/app/interfaces/IWork';
import Modal from '../../_components/Modal';

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
  const [hasAnimated, setHasAnimated] = useState(false);
  const domRef = useRef<HTMLElement | null>(null);
  const [width, setWidth] = useState('0%');
  const [src] = useState<string>(
    data.media.find((m) => m.main === 'true')?.url || '',
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            domRef.current?.classList.add('fade-in-from-bottom', 'is-visible');
          }
        });
      },
      { threshold: 0.1 },
    );

    if (domRef.current) observer.observe(domRef.current);

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, [hasAnimated]);

  const clickHandler = () => {
    setWidth('100%');
    setTimeout(() => {
      setModal(true);
      setWidth('0%');
    }, 1000);
  };

  return (
    <>
      <div
        style={{
          width: width,
          transition: `width 1s ease-in-out`,
        }}
        className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-mediumGray transition-all"
      ></div>
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
        onClick={() => clickHandler()}
        className={`${data.id !== null && data.id % 4 === 0 && 'animDelay'} fade-in-from-bottom col-span-1 mx-2 grid max-w-fit cursor-pointer justify-center justify-items-stretch gap-3 text-xs lg:mx-0 lg:h-[300px]`}
      >
        <Image
          width={260}
          height={260}
          alt="work"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 260px"
          className="max-h-[620px] w-full justify-self-center object-contain lg:h-[260px] lg:max-w-[260px]"
          src={src}
        />
        <div className="flex w-full uppercase italic text-mediumGray">
          {data.title && <span>{data.title}</span>}
          {data.title && data.year && <span>,&nbsp;</span>}
          {data.year && <span>{data.year}</span>}
        </div>
      </section>
    </>
  );
}
