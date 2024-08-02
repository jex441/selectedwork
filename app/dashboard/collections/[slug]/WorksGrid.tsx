'use client';

import React from 'react';
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
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { ICollection } from '@/app/interfaces/ICollection';
//

export default function WorksGrid({ collection }: { collection: ICollection }) {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState<number[]>(
    collection.works.map((work) => work.id),
  );
  // const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
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
  if (!items.length) return null;
  return (
    <div className="flex bg-gray-100">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <Box
          flex={true}
          wrap={true}
          direction="row"
          style={{ maxWidth: '100%' }}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {/* {items.map((item) => {
              const work = collection.works.find((work) => work.id === item);
              if (!work) return null;
              if (!collection.slug) return null;
              return (
                <WorkThumbnail key={item} slug={collection.slug} work={work} />
              );
            })} */}

            {items.map((id) => {
              const work = collection.works.find((work) => work.id === id);
              if (!work) return null;
              if (!collection.slug) return null;
              return (
                <WorkThumbnail key={id} id={id} handle={true} work={work} />
              );
            })}
            <DragOverlay>
              {activeId ? (
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: 'red',
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
