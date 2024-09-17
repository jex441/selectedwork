import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from 'grommet';

import placeholder from '../../../../assets/placeholder.png';
import { IWork } from '@/app/interfaces/IWork';

export default function WorkThumbnail({
  slug,
  idx,
  work,
  handle,
}: {
  idx: number;
  slug: string;
  work: IWork;
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
    width: '250px',
    height: '270px',
    borderRadius: '5px',
    backgroundColor: 'white',
    margin: '5px',
    zIndex: isDragging ? '100' : 'auto',
    opacity: isDragging ? 0.3 : 1,
  };
  //
  return (
    <div
      className="border-1 relative z-10 border shadow-md"
      ref={setNodeRef}
      style={style}
    >
      <Box>
        <button
          className="p-1 text-right text-sm text-gray-500"
          {...listeners}
          {...attributes}
        >
          ::
        </button>
        <Link
          href={`/collections/${slug}/${work.id}`}
          className="h-full w-full"
          prefetch={false}
        >
          <div className="relative h-40 w-full bg-gray-100">
            <Image
              fill
              src={work.media[0]?.url ?? placeholder}
              alt="Image 7"
              className="w-full overflow-hidden object-cover"
            />
          </div>
          <div className="bg-white p-2 dark:bg-gray-950">
            <h3 className="font-semibold">{work.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {work.medium}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {work.year}
              </div>
              {/* <div className="text-sm text-gray-500 dark:text-gray-400">
                {work.height} {work.width} {work.unit}
              </div> */}
            </div>
          </div>
        </Link>
      </Box>
    </div>
  );
}
