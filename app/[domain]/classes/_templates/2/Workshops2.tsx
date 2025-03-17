'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IWorkshopsPage } from '../../../../interfaces/IWorkshopsPage';
import { IWorkshop } from '../../../../interfaces/IWorkshop';
import Image from 'next/image';
import WorkshopModal from '../_components/WorkshopModal';

export default function Workshops1({ data }: { data: IWorkshopsPage }) {
  const { imgSrc, workshops, heading, subHeading, body } = data || {};
  const [inquireModalOpen, setInquireModalOpen] = useState(false);
  const [currentWorkshop, setCurrentWorkshop] = useState<IWorkshop | null>(
    null,
  );
  const [expandedWorkshops, setExpandedWorkshops] = useState<Set<number>>(
    new Set(),
  );
  const [overflowingWorkshops, setOverflowingWorkshops] = useState<Set<number>>(
    new Set(),
  );

  // Add refs for content containers
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Check for overflow on mount and window resize
  useEffect(() => {
    const checkOverflow = () => {
      const newOverflowing = new Set<number>();
      workshops.forEach((workshop) => {
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

  const toggleExpand = (workshopId: number) => {
    setExpandedWorkshops((prev) => {
      const newSet = new Set<number>(prev);
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
            <div className="relative flex max-h-[400px] w-full items-start justify-center overflow-hidden lg:w-[300px]">
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
                  className="my-2 border-[1px] border-lightGray px-4 py-1 text-sm leading-6 tracking-wide text-lightGray transition-all hover:border-darkGray hover:text-darkGray"
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
      <WorkshopModal
        isOpen={inquireModalOpen}
        onClose={() => setInquireModalOpen(false)}
        workshop={currentWorkshop}
        email={data.email}
      />
    </main>
  );
}
