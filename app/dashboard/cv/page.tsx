import { useState } from 'react';
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
import { Trash2Icon, PlusIcon } from '../../assets/svgs';
import { getCVPageData } from '@/app/lib/data';
import { Contact } from 'lucide-react';
import CvForm from './cvform';

export default async function Component() {
  const data = await getCVPageData('CV');
  return (
    <div className="flex h-full flex-row ">
      {data && <CvForm data={data} />}
    </div>
  );
}
