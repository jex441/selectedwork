'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  const [expandedWorkshops, setExpandedWorkshops] = useState<Set<string>>(
    new Set(),
  );
  const [overflowingWorkshops, setOverflowingWorkshops] = useState<Set<number>>(
    new Set(),
  );

  // Add refs for content containers
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Check for overflow on mount and window resize
  useEffect(() => {
    const checkOverflow = () => {
      const newOverflowing = new Set<number>();
      workshops.forEach((workshop) => {
        if (workshop.id === null) return;
        const element = contentRefs.current[workshop.id];
        if (element && element.scrollHeight > 150) {
          // 150px is our max-height
          newOverflowing.add(workshop.id);
        }
      });
      setOverflowingWorkshops(newOverflowing);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [workshops]);

  const inquireHandler = (workshop: IWorkshop) => {
    setCurrentWorkshop(workshop);
    setInquireModalOpen(true);
  };

  const toggleExpand = (workshopId: string) => {
    setExpandedWorkshops((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(workshopId)) {
        newSet.delete(workshopId);
      } else {
        newSet.add(workshopId);
      }
      return newSet;
    });
  };

  return (
    <main className="mb-20 flex w-full flex-col items-start justify-center px-4 lg:gap-14 lg:px-20 lg:pt-10">
      {workshops.map((workshop) => {
        const isExpanded = expandedWorkshops.has(workshop.id);
        const isOverflowing = overflowingWorkshops.has(workshop.id);

        return (
          <div
            key={workshop.id}
            className="my-2 flex w-full flex-col items-start justify-start gap-4 border-b pb-10 lg:flex-row lg:gap-10"
          >
            <div className="relative flex h-[400px] w-full justify-center overflow-hidden lg:w-[300px]">
              {workshop.imgSrc && (
                <Image
                  className="object-contain"
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
              <div
                ref={(el) => (contentRefs.current[workshop.id] = el)}
                className={`relative transition-all duration-500 ease-in-out ${
                  !isExpanded ? 'max-h-[150px] ' : 'max-h-[2000px]'
                } overflow-hidden`}
              >
                <div className="relative ">
                  {workshop.body &&
                    workshop.body
                      .split('\n')
                      .map((paragraph: string, idx: number) => (
                        <p
                          key={idx}
                          className="my-2 text-xs leading-6 text-mediumGray"
                        >
                          {paragraph}
                        </p>
                      ))}
                  {workshop.linkSrc1 && (
                    <p className="text-sm leading-6 text-mediumGray">
                      <a href={workshop.linkSrc1}>{workshop.linkSrc1}</a>
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => inquireHandler(workshop)}
                  className="my-2 border-[1px] border-mediumGray px-4 py-1 text-sm leading-6 tracking-wide text-mediumGray transition-all hover:border-darkGray hover:text-darkGray"
                >
                  Inquire
                </button>
                {isOverflowing && (
                  <button
                    onClick={() => toggleExpand(workshop.id)}
                    className="my-2 border-[1px] border-mediumGray px-4 py-1 text-sm leading-6 tracking-wide text-mediumGray transition-all hover:border-darkGray hover:text-darkGray"
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
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
