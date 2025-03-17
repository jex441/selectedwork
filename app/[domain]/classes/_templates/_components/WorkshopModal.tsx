import React from 'react';
import Image from 'next/image';
import close from '@/public/close.png';
import InquireForm from './InquireForm';
import { IWorkshop } from '../../../../interfaces/IWorkshop';

interface WorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshop: IWorkshop | null;
  email?: string | null;
}

export default function WorkshopModal({
  isOpen,
  onClose,
  workshop,
  email,
}: WorkshopModalProps) {
  if (!isOpen || !workshop) return null;

  return (
    <div className="fixed inset-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="flex h-[600px] w-[550px] flex-col bg-white p-4">
        <button
          onClick={onClose}
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
            {workshop.imgSrc && (
              <Image
                src={workshop.imgSrc}
                alt={'Workshops image'}
                sizes="(max-width: 600px) 100px, (max-width: 900px) 100px, 200px"
                width={100}
                height={200}
              />
            )}
            <div className="flex w-[320px] flex-col px-4">
              <h2 className="mb-1 leading-5 text-darkGray">
                {workshop.heading}
              </h2>
              <p className="truncate text-xs font-bold leading-5 text-mediumGray">
                {workshop.date}
              </p>
              <p className="truncate text-xs leading-5 text-mediumGray">
                {workshop.location}
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            {email && <InquireForm email={email} subject={workshop.heading} />}
          </div>
        </div>
      </div>
    </div>
  );
}
