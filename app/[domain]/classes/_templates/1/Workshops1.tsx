'use client';

import React, { useState } from 'react';
import { IWorkshopsPage } from '../../../../interfaces/IWorkshopsPage';
import { IWorkshop } from '../../../../interfaces/IWorkshop';
import Image from 'next/image';
import InquireForm from './InquireForm';
import close from '@/public/close.png';

export default function Workshops1({ data }: { data: IWorkshopsPage }) {
  const { imgSrc, workshops, heading, subHeading, body } = data || {};
  const [inquireModalOpen, setInquireModalOpen] = useState(false);
  const [currentWorkshop, setCurrentWorkshop] = useState<IWorkshop | null>(
    null,
  );

  const inquireHandler = (workshop: IWorkshop) => {
    setCurrentWorkshop(workshop);
    setInquireModalOpen(true);
  };

  return (
    <main className="mb-20 flex w-full flex-col items-start justify-center px-4 lg:gap-14 lg:px-20 lg:pt-10">
      {workshops.map((workshop) => (
        <div
          key={workshop.id}
          className="my-2 flex w-full flex-col items-start justify-start gap-4 lg:flex-row lg:gap-10"
        >
          <div className="relative max-h-[400px] w-[300px] overflow-hidden">
            {workshop.imgSrc && (
              <Image
                src={workshop.imgSrc}
                alt={'Workshops image'}
                sizes="350px"
                width={300}
                height={300}
              />
            )}
          </div>
          <div className="flex-1 gap-4">
            <h2 className="text-xl text-darkGray">{workshop.heading}</h2>
            <div className="mb-3 mt-1">
              <p className="text-sm font-bold leading-6 text-mediumGray">
                {workshop.date}
              </p>
              <p className="text-sm leading-6 text-mediumGray">
                {workshop.location}
              </p>
            </div>
            {workshop.body &&
              workshop.body
                .split('\n')
                .map((paragraph: string) => (
                  <p className="my-2 text-xs leading-6 text-mediumGray">
                    {paragraph}
                  </p>
                ))}
            {workshop.linkSrc1 && (
              <p className="text-sm leading-6 text-mediumGray">
                <a href={workshop.linkSrc1}>{workshop.linkSrc1}</a>
              </p>
            )}
            <button
              onClick={() => inquireHandler(workshop)}
              className="my-2 border-[1px] border-mediumGray px-4 py-1 text-sm leading-6 tracking-wide text-mediumGray transition-all hover:border-darkGray hover:text-darkGray"
            >
              Inquire
            </button>
          </div>
        </div>
      ))}
      {inquireModalOpen && (
        <div className="fixed inset-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="flex h-[600px] w-[550px] flex-col bg-white p-4">
            <button
              onClick={() => setInquireModalOpen(false)}
              className="self-end text-sm leading-6 text-mediumGray"
            >
              <Image
                className="w-4 opacity-40 transition-all hover:opacity-100"
                src={close}
                alt={'close'}
              />
            </button>
            <div className="flex w-full flex-col">
              <div className="flex w-full flex-row p-4">
                {currentWorkshop !== null && currentWorkshop.imgSrc && (
                  <Image
                    src={currentWorkshop.imgSrc}
                    alt={'Workshops image'}
                    sizes="(max-width: 600px) 100px, (max-width: 900px) 100px, 200px"
                    width={100}
                    height={200}
                  />
                )}
                <div className="flex w-[320px] flex-col px-4">
                  <h2 className="mb-1 leading-5 text-darkGray">
                    {currentWorkshop?.heading}
                  </h2>
                  <p className="truncate text-xs font-bold leading-5 text-mediumGray">
                    {currentWorkshop?.date}
                  </p>
                  <p className="truncate text-xs leading-5 text-mediumGray">
                    {currentWorkshop?.location}
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col">
                {currentWorkshop !== null && data.email && (
                  <InquireForm
                    email={data.email}
                    subject={currentWorkshop.heading}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
