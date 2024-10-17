'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectValue,
} from '@/components/ui/select';
import { Trash2Icon, PlusIcon } from '../../../assets/svgs';
import {
  getNewsPageData,
  saveCVSections,
  deleteNewsPost,
} from '../../../lib/data';
import { INewsPage } from '../../../interfaces/INewsPage';
import { set } from 'zod';
import { PlusCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Component({ data }: { data: INewsPage }) {
  return (
    <div className="flex h-full w-full flex-row justify-center">
      <h1 className="text-lg font-bold">News</h1>

      <header className="flex w-full items-center justify-between space-x-4"></header>
      <div className="grid flex-1 grid-cols-12 gap-6 px-6">
        <div className="col-span-12">
          <div>
            {data.posts &&
              data.posts.map((post, index) => <div key={index}>post</div>)}
            <Button
              className="fixed bottom-10 right-5 h-12 w-12 rounded-full text-lg lg:right-10"
              //   onClick={handleAddWorkExperience}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
