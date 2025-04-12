'use client';

import { useMediaQuery } from 'react-responsive';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { IWork } from '@/app/interfaces/IWork';

export default function Piece({
  data,
  index,
  clickHandler,
}: {
  data: IWork;
  works: IWork[];
  index: number;
  artist: string;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  clickHandler: (currentWork: IWork, index: number) => void;
}) {
  const [isVisible, setVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const domRef = useRef<HTMLElement | null>(null);
  const isLargeScreen = useMediaQuery({ query: '(min-width: 700px)' });
  const [width, setWidth] = useState(isLargeScreen ? '500px' : '360px');

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
    );

    if (domRef.current) observer.observe(domRef.current);

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, [hasAnimated]);

  return (
    <>
      <div
        key={data.id}
        className="mx-1 mt-10 flex w-screen flex-col items-center gap-1 lg:mt-10 lg:gap-10"
      >
        <div className="fade-in-right-simple relative max-h-[620px] w-full lg:h-[400px] lg:w-auto">
          <Image
            onClick={() => clickHandler(data, index)}
            src={data.media.find((m) => m.main === 'true')?.url || ''}
            alt={data.title ?? ''}
            height={400}
            width={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 500px"
            className="h-full w-full cursor-pointer object-contain lg:h-[400px]"
            onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
              const { naturalWidth, naturalHeight } =
                e.target as HTMLImageElement;
              if (isLargeScreen) {
                const int = Math.floor((naturalWidth * 400) / naturalHeight);
                setWidth(`${int}px`);
              }
            }}
          />
        </div>
        <div
          style={{ width: width }}
          className="fade-in-up-simple mt-4 flex flex-col justify-start gap-1 md:mt-0 lg:w-full "
        >
          <span className="text-xs text-darkGray">{data.title}</span>
          <span className="text-xs text-lightGray">{data.year}</span>
          <span className="text-xs text-lightGray">{data.medium}</span>
        </div>
      </div>
    </>
  );
}
