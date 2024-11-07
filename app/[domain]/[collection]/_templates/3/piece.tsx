'use client';

import { useMediaQuery } from 'react-responsive';
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
  const [isVisible, setVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const domRef = useRef<HTMLElement | null>(null);
  const [src, setSrc] = useState<string>(
    data.media.find((m) => m.main === 'true')?.url || '',
  );

  const isLargeScreen = useMediaQuery({ query: '(min-width: 700px)' });
  const [width, setWidth] = useState(isLargeScreen ? '500px' : '300px');
  const [loaderWidth, setLoaderWidth] = useState('0vw');
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
    setLoaderWidth('100vw');
    setTimeout(() => {
      setModal(true);
      setLoaderWidth('0vw');
    }, 1000);
  };

  return (
    <>
      <div
        style={{
          width: loaderWidth,
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
      <div
        key={data.id}
        className="mt-10 flex w-screen flex-col items-center gap-10 lg:mt-0"
      >
        <div
          style={{ width: width }}
          className="fade-in-right-simple relative h-[350px] lg:h-[450px]"
        >
          <Image
            onClick={() => clickHandler()}
            src={data.media.find((m) => m.main === 'true')?.url || ''}
            alt={data.title ?? ''}
            fill
            className="h-[350px] w-full cursor-pointer object-contain lg:h-[450px]"
            onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
              const { naturalWidth, naturalHeight } =
                e.target as HTMLImageElement;
              if (isLargeScreen) {
                const int = Math.floor((naturalWidth * 450) / naturalHeight);
                setWidth(`${int}px`);
              }
            }}
          />
        </div>
        <div
          style={{ width: width }}
          className="fade-in-up-simple mt-4 flex flex-col justify-start gap-1 md:mt-0 lg:w-full "
        >
          <span className="text-xs text-mediumGray">{data.title}</span>
          <span className="text-xs text-mediumGray">{data.year}</span>
          <span className="text-xs text-mediumGray">{data.medium}</span>
        </div>
      </div>
    </>
  );
}

{
  /* <div key={data.id} className="w-[900px] flex-none">
  <div className="grid grid-cols-[500px,1fr] gap-6 rounded-lg bg-background shadow-md">
    <div className="relative h-[500px]">
      <Image
        src={data.media.find((m) => m.main === 'true')?.url || ''}
        alt={data.title ?? ''}
        fill
        className="rounded-l-lg object-cover"
      />
    </div>
    <div className="flex flex-col justify-center p-6">
      <h2 className="mb-4 text-2xl font-bold">{data.title}</h2>
     
      <p className="text-muted-foreground">Year: {data.year}</p>
    </div>
  </div>
</div>; */
}
