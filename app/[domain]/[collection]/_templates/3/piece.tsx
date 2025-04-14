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
  const [currentImageUrl, setCurrentImageUrl] = useState(
    data.media.find((m) => m.main === 'true')?.url || '',
  );

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
        className="flex w-screen shrink-0 flex-col items-center justify-end gap-1 gap-5 px-5 lg:mx-1 lg:max-w-fit lg:gap-1"
      >
        <div className="fade-in-right-simple h-auto max-w-fit ">
          <Image
            onClick={() => setIsFullScreen(true)}
            src={currentImageUrl}
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
                src={currentImageUrl}
                alt={data.title ?? ''}
                fill
                className="object-contain"
              />
            </div>
          )}

          <div className="mt-4 flex flex-col-reverse justify-between lg:flex-row">
            <div className="fade-in-up-simple flex flex-col justify-start gap-1 lg:w-full ">
              <span className="text-lg text-darkGray lg:text-xs">
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
              <span className="text-lg text-lightGray lg:text-xs">
                {data.medium}
              </span>
              <span className="text-lg text-lightGray lg:text-xs">
                {data.height} x {data.width} {data.unit}
              </span>
              <span className="text-lg text-mediumGray lg:text-xs">
                {data.price}$1500
              </span>
              <span className="text-lg text-lightGray lg:text-xs">
                {data.location}Private Collection
              </span>
              <span className="max-w-[600px] text-xs leading-5 text-mediumGray">
                {data.description}
              </span>
            </div>
            <div className="relative my-4 flex flex-row gap-1 lg:my-0">
              {data.media.length > 1 &&
                data.media.map(
                  (m) =>
                    m.url && (
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
                          className={`absolute inset-0 cursor-pointer border-2 object-cover ${
                            currentImageUrl === m.url
                              ? 'border-darkGray'
                              : 'border-lightGray'
                          }`}
                          onClick={() => setCurrentImageUrl(m.url)}
                        />
                      </div>
                    ),
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
