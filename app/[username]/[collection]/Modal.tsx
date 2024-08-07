import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { IWork } from '@/app/interfaces/IWork';
import close from '/public/close.png';
import { set } from 'zod';
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

  return (
    <>
      <div className="fixed right-0 top-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden bg-white">
        <nav className="flex w-full justify-end p-2 lg:fixed lg:p-5">
          <span
            className="cursor-pointer cursor-pointer opacity-50 hover:opacity-100"
            onClick={() => closeHandler()}
          >
            <Image src={close} alt="close" height={25} width={25} />
          </span>
        </nav>

        <section className="animDelay flex h-full w-full flex-col px-2 pt-1 lg:flex-row lg:items-center lg:justify-center lg:justify-around lg:p-0">
          <Image
            src={previous}
            alt="previous"
            height={25}
            width={25}
            onClick={() => navigateHandler('previous')}
            className="hidden cursor-pointer opacity-50 hover:opacity-100 lg:block"
          />
          <div className="relative flex max-h-[600px] w-full items-center justify-center lg:w-2/3">
            <Image
              height={0}
              width={0}
              sizes="100vw"
              alt="work"
              className="fade-in-up-simple w-full object-contain lg:max-h-[600px] lg:w-4/5"
              src={work.media[0].url ?? ''}
            />
          </div>

          <div className="fade-in-right-simple flex w-full flex-col gap-1 px-1 pt-5 lg:mx-auto lg:w-1/4 lg:pt-0">
            <p className="text-darkGray text-lg">{artist}</p>
            <span className="mb-2 flex w-full items-center justify-between">
              <span className="text-lightGray flex items-center text-xl font-light italic">
                {work.title}
                {work.sold !== null && (
                  <span className="mx-4 inline-block h-2 w-2 rounded-lg bg-red-400"></span>
                )}
              </span>
            </span>
            <p className="text-lightGray text-sm">{work.year}</p>
            <p className="text-lightGray text-sm">{work.medium}</p>
            <div className="text-mediumGray text-sm">
              <span className="">{work.height && `${work.height}`}</span>
              <span className="text-lightGray"> x </span>
              <span className="">{work.width && work.width}</span>
              {work.depth && (
                <span className="">
                  <span className="text-lightGray"> x </span>
                  `${work.depth}`
                </span>
              )}
              <span className="text-lightGray text-xs">
                {work.unit && ` ${unit}`}
              </span>
            </div>
            <p className="text-mediumGray my-2 text-xs leading-7 ">
              {work.description}
            </p>
            <p className="text-mediumGray text-sm italic leading-7">
              {work.location}
            </p>
            <p className="text-gray-primary font-light leading-7">
              {work.price && `$ ${work.price}`}
            </p>
          </div>
          <Image
            src={next}
            alt="previous"
            height={25}
            width={25}
            onClick={() => navigateHandler('next')}
            className="hidden cursor-pointer opacity-50 hover:opacity-100 lg:block"
          />
        </section>
      </div>
    </>
  );
}
