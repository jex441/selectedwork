import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { IWork } from '@/app/interfaces/IWork';
import close from '/public/close.png';

export default function Modal({
  data,
  setModal,
  modal,
}: {
  setModal: (val: boolean) => void;
  modal: boolean;
  data: IWork;
}) {
  const [visible, setVisible] = useState(false);
  setTimeout(() => {
    setVisible(true);
  }, 100);

  const closeHandler = () => {
    setTimeout(() => {
      setVisible(false);
    }, 500);

    setModal(false);
  };
  return (
    <>
      <div
        className={`fade-in ${visible ? 'is-visible' : ''} fixed right-0 top-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden bg-white`}
      >
        <nav className="flex w-full justify-end p-2 lg:fixed lg:p-5">
          <span
            className="cursor-pointer opacity-50 hover:opacity-100"
            onClick={() => closeHandler()}
          >
            <Image src={close} alt="close" height={25} width={25} />
          </span>
        </nav>

        <section className="flex h-full w-full flex-col px-2 pt-5 lg:flex-row lg:items-center lg:justify-center lg:justify-around lg:p-0">
          <div className="relative flex max-h-[600px] w-full items-center justify-center lg:w-2/3">
            <Image
              height={0}
              width={0}
              sizes="100vw"
              alt="work"
              className="w-full object-contain lg:max-h-[600px] lg:w-4/5"
              src={data.media[0].url ?? ''}
            />
          </div>

          <div className="flex w-full flex-col gap-2  px-1 lg:mx-auto lg:w-1/3 lg:pr-20">
            <span className="flex w-full items-center justify-between">
              <span className="flex items-center text-xl font-light italic leading-10 text-gray-600">
                {data.title}
                {/* {data.sold && (
                  <span className="mx-4 inline-block h-2 w-2 rounded-lg"></span>
                )} */}
              </span>
              <p className="leading-7 text-gray-500">{data.year}</p>
            </span>
            <p className="text-sm leading-7 text-gray-600">{data.medium}</p>
            <p className="text-xs uppercase text-gray-600">
              {data.height && `${data.height} x `}
              {data.width && data.width}
              {data.depth && ` x ${data.depth}`}
              {data.unit && ` ${data.unit}`}
            </p>
            <p className="text-xs font-light leading-7 text-gray-700">
              {data.description}
            </p>
            <p className="text-sm italic leading-7 text-gray-500">
              {data.location}
            </p>
            <p className="font-light leading-7 text-gray-600">
              {data.price && `$ ${data.price}`}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
