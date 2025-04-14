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
  const [isFullScreen, setIsFullScreen] = useState(false);
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
        className="mx-1 flex w-screen shrink-0 flex-col items-center justify-end gap-1 lg:max-w-fit lg:gap-1"
      >
        <div className="fade-in-right-simple h-auto max-w-fit ">
          <Image
            onClick={() => setIsFullScreen(true)}
            src={data.media.find((m) => m.main === 'true')?.url || ''}
            alt={data.title ?? ''}
            height={400}
            width={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 500px"
            className="w-auto cursor-pointer lg:h-[500px]"
          />

          {/* Full Screen Modal */}
          {isFullScreen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-white"
              onClick={() => setIsFullScreen(false)}
            >
              <Image
                src={data.media.find((m) => m.main === 'true')?.url || ''}
                alt={data.title ?? ''}
                fill
                className="object-contain"
              />
            </div>
          )}

          <div className="mt-4 flex flex-row justify-between">
            <div className="fade-in-up-simple flex flex-col justify-start gap-1 lg:w-full ">
              <span className="text-xs text-darkGray">
                {data.year ? (
                  <>
                    <i>{data.title}, </i>
                    {data.year}
                  </>
                ) : (
                  data.title
                )}
                <span>
                  {data.sold && (
                    <div className="mx-2 inline-block h-2 w-2 rounded-full bg-red-500"></div>
                  )}
                </span>
              </span>
              <span className="text-xs text-lightGray">{data.medium}</span>
              <span className="text-xs text-lightGray">
                {data.height} x {data.width} {data.unit}
              </span>
              <span className="text-xs text-mediumGray">{data.price}$1500</span>
              <span className="text-xs text-lightGray">
                {data.location}Private Collection
              </span>
              {/*  <span className="max-w-[600px] text-xs leading-5 text-mediumGray">
                {data.description}Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Quisquam, quos. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                quos.
              </span> */}
            </div>
            <div className="relative flex flex-row gap-1">
              {data.media.map((m) => (
                <div key={m.url} className="relative h-[35px] w-[35px]">
                  <Image
                    alt={data.title ?? 'Artwork'}
                    src={m.url}
                    fill={true}
                    sizes="35px"
                    priority
                    loading="eager"
                    quality={85}
                    placeholder="empty"
                    className={`absolute inset-0 cursor-pointer border-2 object-cover`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
