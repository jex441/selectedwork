import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { IWork } from '@/app/interfaces/IWork';
import close from '/public/close.png';
import next from '@/public/next.png';
import previous from '@/public/previous.png';

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
  const closeHandler = () => {
    setModal(false);
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
      <div className="fixed right-0 top-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden bg-white">
        <nav className="flex w-full justify-end p-2 lg:fixed lg:p-4">
          <span
            className="fade-in-simple cursor-pointer cursor-pointer opacity-50 hover:opacity-100"
            onClick={() => closeHandler()}
          >
            <Image src={close} alt="close" height={18} width={18} />
          </span>
        </nav>

        <section className="animDelay flex h-full w-full flex-col px-6 pt-1 lg:flex-row lg:items-center lg:justify-center lg:justify-around lg:px-4 lg:py-0">
          <Image
            src={previous}
            alt="previous"
            height={18}
            width={18}
            onClick={() => navigateHandler('previous')}
            className="hidden cursor-pointer opacity-30 transition-all hover:opacity-80 lg:block"
          />
          <div className="relative flex max-h-[520px] w-full items-center justify-center lg:w-2/3">
            <Image
              height={0}
              width={0}
              sizes="100vw"
              alt="work"
              className="animDelay fade-in-up-simple h-auto w-full object-contain lg:max-h-[600px] lg:w-4/5"
              src={src}
            />
          </div>

          <div className="fade-in-right-simple flex w-full flex-col gap-1 pt-10 lg:mx-auto lg:w-1/4 lg:pt-0">
            {work.media.length > 1 && (
              <div className="my-2 block flex gap-2 lg:hidden">
                {work.media.map(
                  (m) =>
                    m.url && (
                      <Image
                        onClick={() => m.url && setSrc(m.url)}
                        alt={data.title ?? 'Artwork'}
                        src={m.url}
                        height={35}
                        width={35}
                        className={`cursor-pointer border-2 ${src === m.url ? 'border-darkGray' : 'border-transparent'} hover:border-darkGray`}
                      />
                    ),
                )}
              </div>
            )}
            <p className="text-[14px] text-lightGray">{artist}</p>
            <span className="flex w-full items-center justify-between">
              <span className="flex w-1/2 items-center justify-between text-[14px] text-darkGray">
                <span>{work.title}</span>
                {work.sold && (
                  <span className="my-1 inline-block h-2 w-2 rounded-lg bg-red-400"></span>
                )}
              </span>
            </span>
            <p className="text-[12px] text-lightGray">{work.year}</p>
            <p className="text-[12px] text-lightGray">{work.medium}</p>
            {work.height && work.width ? (
              <div className="text-[12px] text-lightGray">
                <span className="">{work.height && `${work.height}`}</span>
                <span className="text-lightGray"> x </span>
                <span className="">{work.width && work.width}</span>
                {work.depth && (
                  <span className="">
                    <span className="text-lightGray"> x </span>
                    {work.depth}
                  </span>
                )}
                <span className="text-[12px] text-lightGray">
                  {work.unit && ` ${unit}`}
                </span>
              </div>
            ) : null}
            <p className="my-2 text-[12px] leading-6 text-mediumGray ">
              {work.description}
            </p>
            <p className="text-[12px] italic leading-6 text-mediumGray">
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
                      <Image
                        onClick={() => m.url && setSrc(m.url)}
                        alt={data.title ?? 'Artwork'}
                        src={m.url}
                        height={35}
                        width={35}
                        className={`cursor-pointer border-2 ${src === m.url ? 'border-darkGray' : 'border-transparent'} hover:border-darkGray`}
                      />
                    ),
                )}
              </div>
            )}
          </div>
          <Image
            src={next}
            alt="previous"
            height={18}
            width={18}
            onClick={() => navigateHandler('next')}
            className="hidden cursor-pointer opacity-30 transition-all hover:opacity-80 lg:block"
          />
        </section>
      </div>
    </>
  );
}
