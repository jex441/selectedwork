'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { reorderWorkshops } from '@/app/lib/data';
import { createWorkshop } from '../../../lib/data';
import { IWorkshopsPage } from '../../../interfaces/IWorkshopsPage';
import { IWorkshop } from '../../../interfaces/IWorkshop';
import WorkshopThumbnail from './workshopthumbnail';

import { useToast } from '@/hooks/use-toast';

// need to navigate to edit page [id] and do CRUD operations
export default function Component({ data }: { data: IWorkshopsPage }) {
  const { toast } = useToast();

  const createWorkshopHandler = async () => {
    await createWorkshop().then((res) => {
      if (!res) {
        toast({
          variant: 'destructive',
          title: 'Error creating class',
          description: 'Class could not be created',
        });
      } else if (res.status === 200) {
        toast({
          title: 'Class created',
          description: 'Class created successfully',
        });
      }
    });
  };
  console.log(data);
  const [workshops, setWorkshops] = useState<IWorkshop[]>(data.workshops);
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [items, setItems] = useState<number[]>(
    workshops.map((workshop) => workshop.idx),
  );

  useEffect(() => {
    setItems(workshops.map((workshop) => workshop.idx));
  }, [workshops]);

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

  const reorderWorkshopsHandler = async () => {
    const newWorkshopsOrder = items.map((item) => {
      let col = workshops.find((workshop) => workshop.idx === item);
      if (col) return col;
      else return workshops[0];
    });
    newWorkshopsOrder && (await reorderWorkshops(newWorkshopsOrder));
  };

  useEffect(() => {
    setTimeout(() => {
      reorderWorkshopsHandler();
    }, 2000);
  }, [items]);

  // if (!items.length) return null;

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <header>
          <h1 className="text-lg font-bold">Classes</h1>
        </header>
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
                  const workshop = workshops.find(
                    (workshop) => workshop.idx === idx,
                  );
                  if (!workshop) return null;
                  return (
                    <WorkshopThumbnail
                      key={idx}
                      idx={idx}
                      handle={true}
                      workshop={workshop}
                    />
                  );
                })}
                <DragOverlay>
                  {activeId ? (
                    <div className="border-1 m-1 h-[100px] w-[110px] rounded-md border bg-gray-200 py-1 shadow-md lg:h-[250px] lg:w-[270px]"></div>
                  ) : null}
                </DragOverlay>
              </SortableContext>
            </Box>
          </DndContext>
        </div>
        <Button
          className="fixed bottom-10 right-5 h-12 w-12 rounded-full text-lg lg:right-10"
          onClick={() => createWorkshopHandler()}
        >
          +
        </Button>
      </div>
    </>
  );
}

{
  /* <Link href={`/classes/${workshop.id}`}>
<Card className="h-[350px] w-[250px] overflow-hidden">
  <CardHeader className="p-0">
    {workshop.imgSrc ? (
      <Image
        src={workshop.imgSrc}
        alt={'Class Image'}
        width={384}
        height={200}
        className="h-48 w-full object-cover"
      />
    ) : (
      <div className="flex h-48 w-full items-center justify-center bg-gray-200 text-gray-400">
        no image
      </div>
    )}
  </CardHeader>
  <CardContent className="h-[110px] p-4">
    <CardTitle className="text-lg">{workshop.heading}</CardTitle>
    <div className="mt-2 flex items-center text-sm text-muted-foreground">
      {workshop.date}
    </div>
    <div className="flex items-center text-sm text-muted-foreground">
      {workshop.location}
    </div>
  </CardContent>
</Card>
</Link> */
}
