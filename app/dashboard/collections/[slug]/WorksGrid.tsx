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
  const [items, setItems] = useState(collection.works);

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
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
          style={{ maxWidth: '600px' }}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {items.map((work) => (
              <WorkThumbnail key={work.id} slug={collection.slug} work={work} />
            ))}
            {/* 
{items.map((id) => (
            <SortableItem key={id} id={id} handle={true} value={id} />
          ))} */}
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
