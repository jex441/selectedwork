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
} from '@dnd-kit/sortable';

import { reorderCollections } from '@/app/lib/data';
import { ICollection } from '@/app/interfaces/ICollection';
import { IWork } from '@/app/interfaces/IWork';
import Collection from './[slug]/page';
import placeholder from '../../../assets/placeholder.png';

export default function CollectionsGrid({ data }: { data: ICollection[] }) {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [items, setItems] = useState<number[]>(
    data.map((collection) => collection.idx),
  );

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
    <div className="flex justify-start rounded-lg bg-gray-100">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <Box flex={true} wrap={true} direction="row">
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {items.map((idx) => {
              const collection = data.find(
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
