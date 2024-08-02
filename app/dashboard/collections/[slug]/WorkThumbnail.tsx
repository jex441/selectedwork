import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from 'grommet';

import placeholder from '@/assets/placeholder.png';
import { IWork } from '@/app/interfaces/IWork';

export default function WorkThumbnail({
  slug,
  work,
}: {
  slug: string;
  work: IWork;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = work && work.id !== null && useSortable({ id: work.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: '100px',
    height: '100px',
    border: '2px solid red',
    backgroundColor: '#cccccc',
    margin: '10px',
    zIndex: isDragging ? '100' : 'auto',
    opacity: isDragging ? 0.3 : 1,
  };
  //
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative overflow-hidden rounded-lg"
    >
      <Box>
        <button {...listeners} {...attributes}>
          Drag handle
        </button>

        <Link
          href={`/dashboard/collections/${slug}/${work.id}`}
          className="absolute inset-0 z-10"
          prefetch={false}
        >
          <span className="sr-only">View Image</span>
        </Link>
        <Image
          src={work.media[0]?.url ?? placeholder}
          alt="Image 7"
          width={400}
          height={300}
          className="h-60 w-full object-cover"
        />
        <div className="bg-white p-4 dark:bg-gray-950">
          <h3 className="text-lg font-semibold md:text-xl">{work.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {work.medium}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {work.year}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {work.height} {work.width} {work.unit}
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
