import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { IWork } from '@/app/interfaces/IWork';
import close from '/public/close.png';
import next from '@/public/next.png';
import previous from '@/public/previous.png';

// Custom loader component for thumbnails
const ThumbnailLoader = () => (
  <div className="relative h-[35px] w-[35px] animate-pulse bg-gray-200" />
);

export default function Modal({
  data,
  setModal,
  modal,
  artist,
  works,
  index,
}: {
  setModal: (val: boolean) => void;
  modal: boolean;
  data: IWork;
  artist: string;
  works: IWork[];
  index: number;
}) {
  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modal]);

  const closeHandler = () => {
    const zoomElement = document.querySelector('.zoom-in-simple');
    const fadeElement = document.querySelector('.piece-data');
    const modal = document.querySelector('.modal-bg');

    fadeElement?.classList.remove('fade-in-right-simple');
    zoomElement?.classList.add('zoom-out-simple');
    fadeElement?.classList.add('zoom-out-simple');
    modal?.classList.add('fade-out-simple');

    document.body.style.overflow = 'unset';

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const [current, setCurrent] = useState<number>(index);
  const [work, setWork] = useState<IWork>(data);
  const [src, setSrc] = useState<string>(
    work.media.find((m) => m.main === 'true')?.url || '',
  );
  const units = { inches: 'in', cm: 'cm', ft: 'ft', m: 'm' };
  const key: string = work?.unit ?? 'inches';
  const unit = units[key as keyof typeof units];

  const navigateHandler = (direction: string) => {
    const zoomElement = document.querySelector('.zoom-in-simple');
    const fadeElement = document.querySelector('.piece-data');

    // Remove animation classes
    zoomElement?.classList.remove('zoom-in-simple');
    fadeElement?.classList.remove('fade-in-right-simple');

    // Force a reflow to restart animations
    void (zoomElement as HTMLElement).offsetWidth;
    void (fadeElement as HTMLElement).offsetWidth;

    // Add animation classes back
    zoomElement?.classList.add('zoom-in-simple');
    fadeElement?.classList.add('fade-in-right-simple');

    if (direction === 'next' && current < works.length - 1) {
      setWork(works[current + 1]);
      setCurrent(current + 1);
    }
    if (direction === 'previous' && current > 0) {
      setCurrent(current - 1);
      setWork(works[current - 1]);
    }
  };

  useEffect(() => {
    setSrc(work.media.find((m) => m.main === 'true')?.url || '');
  }, [work]);

  return (
    <>
      <div className="modal-bg fixed right-0 top-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden bg-white">
        <nav className="flex w-full justify-end p-2 lg:fixed lg:p-4">
          <span
            className="fade-in-simple cursor-pointer cursor-pointer opacity-50 hover:opacity-100"
            onClick={() => closeHandler()}
          >
            <Image
              src={close}
              alt="close"
              height={18}
              width={18}
              priority
              loading="eager"
              quality={85}
              placeholder="empty"
            />
          </span>
        </nav>

        <section
          className={`mt-5 flex h-full w-full flex-col px-6 pt-1 lg:mt-0 lg:flex-row lg:items-center lg:justify-center ${work.title ? 'lg:justify-around lg:px-4' : ''} lg:py-0`}
        >
          <Image
            src={previous}
            alt="previous"
            height={18}
            width={18}
            priority
            loading="eager"
            quality={85}
            placeholder="empty"
            onClick={() => navigateHandler('previous')}
            className="hidden cursor-pointer opacity-30 transition-all hover:opacity-80 lg:block"
          />
          <div
            className={`relative flex max-h-[520px] w-full items-center justify-center ${work.title ? 'lg:w-2/3' : 'lg:w-full'}`}
          >
            <Image
              height={work.title ? 500 : 520}
              width={work.title ? 700 : 520}
              sizes={
                work.title
                  ? '(max-width: 768px) 100vw, 33vw'
                  : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              }
              alt="work"
              priority
              loading="eager"
              quality={85}
              placeholder="empty"
              className={`animDelay zoom-in-simple h-auto w-full object-contain lg:max-h-[600px] ${work.title ? 'lg:w-4/5' : 'lg:w-full'}`}
              src={src}
              onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const { naturalWidth, naturalHeight } =
                  e.target as HTMLImageElement;
              }}
            />
          </div>

          {work.title && (
            <div className="piece-data fade-in-right-simple flex w-full flex-col gap-1 pt-10 lg:mx-auto lg:w-1/4 lg:pt-0">
              {work.media.length > 1 && (
                <div className="my-2 block flex gap-2 lg:hidden">
                  {work.media.map(
                    (m) =>
                      m.url && (
                        <div key={m.url} className="relative h-[35px] w-[35px]">
                          <ThumbnailLoader />
                          <Image
                            onClick={() => m.url && setSrc(m.url)}
                            alt={data.title ?? 'Artwork'}
                            src={m.url}
                            fill={true}
                            sizes="35px"
                            priority
                            loading="eager"
                            quality={85}
                            placeholder="empty"
                            className={`absolute inset-0 cursor-pointer border-2 object-cover ${
                              src === m.url
                                ? 'border-darkGray'
                                : 'border-transparent'
                            } hover:border-darkGray`}
                          />
                        </div>
                      ),
                  )}
                </div>
              )}
              <p className="text-[22px] text-lightGray lg:text-[14px]">
                {artist}
              </p>
              <span className="flex w-full items-center justify-between">
                <span className="flex w-full items-center justify-between text-[16px] text-darkGray lg:w-1/2 lg:text-[14px]">
                  <span>{work.title}</span>
                  {work.sold && (
                    <span className="my-1 inline-block h-2 w-2 rounded-lg"></span>
                  )}
                </span>
              </span>
              <p className="text-[16px] text-lightGray lg:text-[12px]">
                {work.year}
              </p>
              <p className="text-[16px] text-lightGray lg:text-[12px]">
                {work.medium}
              </p>
              {work.height && work.width ? (
                <div className="text-[16px] text-lightGray lg:text-[12px]">
                  <span className="">{work.height && `${work.height}`}</span>
                  <span className="text-lightGray"> x </span>
                  <span className="">{work.width && work.width}</span>
                  {work.depth && (
                    <span className="">
                      <span className="text-lightGray"> x </span>
                      {work.depth}
                    </span>
                  )}
                  <span className="text-[16px] text-lightGray lg:text-[12px]">
                    {work.unit && ` ${unit}`}
                  </span>
                </div>
              ) : null}
              <p className="my-2 text-[16px] leading-6 text-mediumGray lg:text-[12px] ">
                {work.description}
              </p>
              <p className="text-[16px] italic leading-6 text-mediumGray lg:text-[12px]">
                {work.location}
              </p>
              <p className="text-gray-primary my-1 leading-7 text-lightGray">
                {work.price && `$ ${work.price}`}
              </p>
              {work.media.length > 1 && (
                <div className="mt-2 hidden w-full flex-row gap-2 lg:flex">
                  {work.media.map(
                    (m) =>
                      m.url && (
                        <div key={m.url} className="relative h-[35px] w-[35px]">
                          <ThumbnailLoader />
                          <Image
                            onClick={() => m.url && setSrc(m.url)}
                            alt={data.title ?? 'Artwork'}
                            src={m.url}
                            fill={true}
                            sizes="35px"
                            priority
                            loading="eager"
                            quality={85}
                            placeholder="empty"
                            className={`absolute inset-0 cursor-pointer border-2 object-cover ${
                              src === m.url
                                ? 'border-darkGray'
                                : 'border-transparent'
                            } hover:border-darkGray`}
                          />
                        </div>
                      ),
                  )}
                </div>
              )}
            </div>
          )}

          <Image
            src={next}
            alt="previous"
            height={18}
            width={18}
            priority
            loading="eager"
            quality={85}
            placeholder="empty"
            onClick={() => navigateHandler('next')}
            className="hidden cursor-pointer opacity-30 transition-all hover:opacity-80 lg:block"
          />
        </section>
      </div>
    </>
  );
}
