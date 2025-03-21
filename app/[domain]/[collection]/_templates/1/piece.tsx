'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { IWork } from '@/app/interfaces/IWork';
import Modal from '../../_components/Modal';
import { useMediaQuery } from 'react-responsive';
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
  const [width, setWidth] = useState('0%');
  const [src, setSrc] = useState<string>(
    data.media.find((m) => m.main === 'true')?.url || '',
  );

  const isLargeScreen = useMediaQuery({ query: '(min-width: 700px)' });
  const [ratio, setRatio] = useState(isLargeScreen ? '260px' : '100%');

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
        className={`${data.id !== null && data.id % 4 === 0 && 'animDelay'} fade-in-from-bottom relative col-span-1 mx-2 grid cursor-pointer justify-items-stretch gap-3 lg:mx-0 lg:h-[300px]`}
      >
        <div className="relative flex justify-center">
          <Image
            width={260}
            height={260}
            alt="work"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 260px"
            className="max-h-[620px] w-full justify-self-center object-contain lg:h-[260px] lg:max-w-[260px]"
            src={src}
            onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
              const { naturalWidth, naturalHeight } =
                e.target as HTMLImageElement;
              if (naturalHeight > naturalWidth && isLargeScreen) {
                const int = Math.floor((naturalWidth * 260) / naturalHeight);
                setRatio(`${int}px`);
              }
            }}
          />
        </div>
        <div
          style={{ minWidth: ratio }}
          className={`relative flex min-w-fit justify-self-center text-xs tracking-wide lg:mt-0`}
        >
          <span className="whitespace-nowrap pr-3 uppercase italic text-mediumGray">
            {data.title}
          </span>
          <span className="shrink-0 text-lightGray">
            {data.year && `${data.year}`}
          </span>
        </div>
      </section>
    </>
  );
}
