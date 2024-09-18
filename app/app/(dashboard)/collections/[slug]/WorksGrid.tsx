'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import WorkThumbnail from './WorkThumbnail';

import { Box } from 'grommet';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { useDropzone } from '@uploadthing/react';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { useCallback } from 'react';
import { useUploadThing } from '@/app/api/uploadthing/uploadThing';
import { createWorkWithMedia } from '@/app/lib/data';

import { reorderWorks } from '@/app/lib/data';
import { ICollection } from '@/app/interfaces/ICollection';
import { IWork } from '@/app/interfaces/IWork';

export default function WorksGrid({ collection }: { collection: ICollection }) {
  const [works, setWorks] = useState<IWork[]>(collection.works);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [items, setItems] = useState<number[]>(
    collection.works.map((work) => work.idx),
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      startUpload(acceptedFiles);
      const newWorks = acceptedFiles.map((file, idx) => works.length + idx + 1);
      setItems((items) => {
        return [...items, ...newWorks];
      });
    },
    [works],
  );

  const { startUpload, permittedFileInfo } = useUploadThing('imageUploader', {
    onClientUploadComplete: async (res) => {
      setLoading(false);
      const news = res.map(async (r, idx) => {
        if (collection.slug) {
          const work = await createWorkWithMedia(
            { url: r.url, main: 'true', type: 'image' },
            collection.slug,
          );
          work && setWorks((prev) => [...prev, work]);
          return work;
        }
      });
    },
    onUploadError: () => {
      setLoading(false);
      alert('error occurred while uploading');
    },
    onUploadBegin: () => {
      setLoading(true);
    },
  });
  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };
  const handleDragEnd = async (event: { active: any; over: any }) => {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const reorderWorksHandler = async () => {
    let reorder = true;
    const newWorksOrder = items.map((item) => {
      let work = collection.works.find((work) => work.idx === item);
      if (work) return work;
      else {
        reorder = false;
        return works[0];
      }
    });
    reorder && (await reorderWorks(newWorksOrder));
  };

  useEffect(() => {
    setTimeout(() => {
      reorderWorksHandler();
    }, 2000);
  }, [items]);

  return items.length === 0 ? (
    <div
      className="relative flex h-full w-full flex-1 items-center justify-center border-2 border-dashed border-gray-300 text-xl text-gray-400"
      {...getRootProps()}
    >
      <input className="" {...getInputProps()} />
      Drop your images or click here to get started
    </div>
  ) : (
    <div className="relative flex w-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <Box flex={true} wrap={true} direction="row">
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {items.map((idx) => {
              const work = works.find((work) => work.idx === idx);
              if (!work) {
                return (
                  <div className="m-1 block h-[270px] w-[250px] animate-pulse rounded-md bg-gray-300"></div>
                );
              }
              if (!collection.slug) return null;
              return (
                <WorkThumbnail
                  key={idx}
                  idx={idx}
                  handle={true}
                  slug={collection.slug}
                  work={work}
                />
              );
            })}
            <DragOverlay>
              {activeId ? (
                <div
                  style={{
                    width: '250px',
                    height: '200px',
                    backgroundColor: '#ccc',
                    borderRadius: '5px',
                  }}
                ></div>
              ) : null}
            </DragOverlay>
          </SortableContext>
        </Box>
      </DndContext>
    </div>
  );
}
