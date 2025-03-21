import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from 'grommet';

import placeholder from '../../../assets/placeholder.png';
import { IWorkshop } from '@/app/interfaces/IWorkshop';
import { Eye, EyeOff, Archive } from 'lucide-react';

export default function WorkshopThumbnail({
  idx,
  workshop,
  handle,
}: {
  idx: number;
  workshop: IWorkshop;
  handle: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: idx });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // width: '250px',
    // height: '270px',
    borderRadius: '5px',
    backgroundColor: 'white',
    margin: '5px',
    zIndex: isDragging ? '100' : 'auto',
    opacity: isDragging ? 0.3 : 1,
    'touch-action': 'none',
  };
  //
  return (
    <div
      className="border-1 h-[100px] w-[100px] rounded-md border py-1 shadow-md lg:h-[250px] lg:w-[270px]"
      ref={setNodeRef}
      style={style}
    >
      <Box>
        <button
          className="px-1 text-right text-xs text-gray-500 md:text-sm"
          {...listeners}
          {...attributes}
        >
          ::
        </button>
        <Link
          href={`/classes/${workshop.id}`}
          className="h-full w-full"
          prefetch={false}
        >
          <div className="relative h-14 w-full bg-gray-100 lg:h-40">
            <div className="relative h-14 w-full bg-gray-100 lg:h-40">
              <Image
                fill
                src={workshop.imgSrc ?? placeholder}
                alt="Image 7"
                className="w-full overflow-hidden object-cover"
              />
            </div>
          </div>
          <div className="bg-white p-1 dark:bg-gray-950 lg:p-2">
            <span className="flex justify-between">
              <p className="lg:text-md overflow-hidden truncate text-sm md:font-semibold">
                {workshop.heading}
              </p>
              <p className="hidden text-xs text-gray-500 dark:text-gray-400 md:block lg:text-sm">
                {workshop.visibility === true ? (
                  <Eye size={16} />
                ) : (
                  <EyeOff size={16} />
                )}
              </p>
            </span>
            <div className="flex items-center justify-between"></div>
          </div>
        </Link>
      </Box>
    </div>
  );
}
