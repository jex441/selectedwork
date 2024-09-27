'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import CollectionThumbnail from './CollectionThumbnail';
//
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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import CreateButton from './createbutton';
import { reorderCollections } from '@/app/lib/data';
import { ICollection } from '@/app/interfaces/ICollection';
import { IWork } from '@/app/interfaces/IWork';
import Collection from './[slug]/page';
import placeholder from '../../../assets/placeholder.png';

export default function CollectionsGrid({ data }: { data: ICollection[] }) {
  const [collections, setCollections] = useState<ICollection[]>(data);
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [items, setItems] = useState<number[]>(
    collections.map((collection) => collection.idx),
  );

  useEffect(() => {
    setItems(collections.map((collection) => collection.idx));
  }, [collections]);

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

  const reorderCollectionsHandler = async () => {
    const newCollectionsOrder = items.map((item) => {
      let col = data.find((collection) => collection.idx === item);
      if (col) return col;
      else return data[0];
    });
    newCollectionsOrder && (await reorderCollections(newCollectionsOrder));
  };

  useEffect(() => {
    setTimeout(() => {
      reorderCollectionsHandler();
    }, 2000);
  }, [items]);
  if (!items.length) return null;

  return (
    <>
      <div className="block flex w-full justify-start md:p-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <Box flex={true} wrap={true} direction="row">
            <SortableContext items={items} strategy={rectSortingStrategy}>
              {items.map((idx) => {
                const collection = collections.find(
                  (collection) => collection.idx === idx,
                );
                if (!collection) return null;
                if (!collection.slug) return null;
                return (
                  <CollectionThumbnail
                    key={idx}
                    idx={idx}
                    handle={true}
                    slug={collection.slug}
                    collection={collection}
                  />
                );
              })}
              <DragOverlay>
                {activeId ? (
                  <div
                    className="border-1 m-1 h-[100px] w-[110px] rounded-md border bg-gray-200 py-1 shadow-md lg:h-[250px] lg:w-[270px]"
                    // style={{
                    //   width: '250px',
                    //   height: '200px',
                    //   backgroundColor: '#ccc',
                    //   borderRadius: '5px',
                    // }}
                  ></div>
                ) : null}
              </DragOverlay>
            </SortableContext>
          </Box>
        </DndContext>
      </div>
      <CreateButton collections={collections} setCollections={setCollections} />
    </>
  );
}
