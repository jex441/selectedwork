'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import WorkThumbnail from './WorkThumbnail';
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

import { reorderWorks } from '@/app/lib/data';
import { ICollection } from '@/app/interfaces/ICollection';
import { IWork } from '@/app/interfaces/IWork';

//

export default function WorksGrid({ collection }: { collection: ICollection }) {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [items, setItems] = useState<number[]>(
    collection.works.map((work) => work.idx),
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

  const reorderWorksHandler = async () => {
    const newWorksOrder = items.map((item) => {
      let work = collection.works.find((work) => work.idx === item);
      if (work) return work;
      else return collection.works[0];
    });
    newWorksOrder && (await reorderWorks(newWorksOrder));
  };

  useEffect(() => {
    setTimeout(() => {
      reorderWorksHandler();
    }, 2000);
  }, [items]);
  if (!items.length) return null;

  return (
    <div className="flex justify-start">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <Box flex={true} wrap={true} direction="row">
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {items.map((idx) => {
              const work = collection.works.find((work) => work.idx === idx);
              if (!work) return null;
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
