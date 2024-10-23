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
          <div>
            {workshop.imgSrc && (
              <Image
                src={workshop.imgSrc}
                alt={'Workshops image'}
                width={400}
                height={400}
              />
            )}
          </div>
          <div className="flex-1 gap-4">
            <h2 className="text-lg leading-9 text-darkGray">
              {workshop.heading}
            </h2>
            <p className="text-sm leading-6 text-mediumGray">
              {workshop.subHeading}
            </p>
            <div className="my-2">
              <p className="text-sm leading-6 text-mediumGray">
                {workshop.date}
              </p>
              <p className="text-sm leading-6 text-mediumGray">
                {workshop.location}
              </p>
            </div>
            <p className="my-2 w-full text-sm leading-6 text-mediumGray">
              {workshop.body}
            </p>
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
                {currentWorkshop.imgSrc && (
                  <Image
                    src={currentWorkshop.imgSrc}
                    alt={'Workshops image'}
                    width={150}
                    height={150}
                  />
                )}
                <div className="flex w-[320px] flex-col px-4">
                  <h2 className="leading-9 text-darkGray">
                    {currentWorkshop?.heading}
                  </h2>
                  <p className="truncate text-xs leading-5 text-mediumGray">
                    {currentWorkshop?.date}
                  </p>
                  <p className="truncate text-xs leading-5 text-mediumGray">
                    {currentWorkshop?.location}
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col">
                {currentWorkshop !== null && (
                  <InquireForm subject={currentWorkshop.heading} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
