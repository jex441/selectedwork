import React, { useState } from 'react';
import Image from 'next/image';

export default function piece({ data }: {}) {
  const [modal, setModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState({});
  return (
    <>
      {modal && (
        <>
          <div className="fixed right-0 top-0 z-10 h-full w-full overflow-scroll bg-white">
            <nav className="flex w-full justify-end p-5 lg:fixed">
              <span onClick={() => setModal(false)}>x</span>
            </nav>

            <section className="flex h-full w-full flex-col lg:flex-row lg:items-center lg:justify-center lg:justify-around">
              <div className="relative mx-1 flex h-[480px] w-full lg:mx-0 lg:h-[600px] lg:w-[700px]">
                <Image
                  fill
                  alt="work"
                  objectFit="contain"
                  style={{ objectFit: 'contain' }}
                  src={data.media[0].url}
                />
              </div>
              <div className="flex w-full flex-col gap-2 px-1 lg:w-1/3 lg:px-4">
                <span className="flex w-full items-center justify-between">
                  <span className="flex items-center text-xl italic leading-10">
                    {data.title}
                    {data.sold && (
                      <span className="mx-4 inline-block h-2 w-2 rounded-lg bg-red-500"></span>
                    )}
                  </span>
                  <p className="leading-7 text-gray-600">{data.year}</p>
                </span>
                <p className="leading-7">{data.medium}</p>
                <p className="text-sm">
                  {data.height && `${data.height} x `}
                  {data.width && data.width}
                  {data.depth && ` x ${data.depth}`}
                  {data.unit && ` ${data.unit}`}
                </p>
                <p className="text-sm leading-7">{data.description}</p>
                <p className="text-sm italic leading-7 text-gray-600">
                  {data.location}
                </p>
                <p className="leading-7 text-gray-600">
                  {data.price && `$ ${data.price}`}
                </p>
              </div>
            </section>
          </div>
        </>
      )}
      <section
        onClick={() => setModal(true)}
        className="border-1 relative mx-1 mb-6 grid h-auto w-full cursor-pointer justify-items-stretch lg:m-3 lg:h-[290px] lg:w-[305px]"
      >
        <figure className="relative h-[400px] w-full self-center justify-self-center object-contain lg:h-[230px] lg:w-[305px]">
          <Image
            fill
            alt="work"
            objectFit="contain"
            style={{ objectFit: 'contain' }}
            src={data.media[0].url}
          />
        </figure>
        <div className="mt-4 flex w-full self-end justify-self-center text-xs tracking-wide lg:mt-0 lg:w-[305px] ">
          <span className="uppercase italic text-gray-600">{data.title}</span>
          <span className="ml-3 text-gray-400">
            {data.year && `${data.year}`}
          </span>
        </div>
      </section>
    </>
  );
}
