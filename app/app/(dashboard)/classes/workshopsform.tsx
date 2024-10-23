'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Edit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  getWorkshopsPageData,
  saveCVSections,
  deleteWorkshop,
  createWorkshop,
} from '../../../lib/data';
import { IWorkshopsPage } from '../../../interfaces/IWorkshopsPage';
import { set } from 'zod';
import { PlusCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

// need to navigate to edit page [id] and do CRUD operations
export default function Component({ data }: { data: IWorkshopsPage }) {
  const createWorkshopHandler = async () => {
    await createWorkshop();
  };
  return (
    <div className="flex h-full w-full flex-col">
      <header>
        <h1 className="text-lg font-bold">Classes</h1>
      </header>
      <div className="flex w-full flex-1 flex-wrap gap-6 px-6">
        {data.workshops &&
          data.workshops.map((workshop, index) => (
            <Link href={`/classes/${workshop.id}`}>
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
            </Link>
          ))}
        <Button
          className="fixed bottom-10 right-5 h-12 w-12 rounded-full text-lg lg:right-10"
          onClick={() => createWorkshopHandler()}
        >
          +
        </Button>
      </div>
    </div>
  );
}
