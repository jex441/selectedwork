import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

import { useStore } from '../../store';

import { IUser } from '../../interfaces/IUser';
import { IPage } from '../../interfaces/IPage';
import { ISection } from '../../interfaces/ISection';
import { ISectionAttribute } from '../../interfaces/ISectionAttribute';
import AboutForm from './aboutform';
import { getPageData } from '../../lib/data';

import {
  ArrowLeftIcon,
  EyeIcon,
  LinkIcon,
  UploadIcon,
  XIcon,
} from '../../assets/svgs';

export default async function Component() {
  const data: IPage = await getPageData('About');

  let values: {
    sectionId: number | null;
    'about-heading': string;
    'about-text': string;
    'about-image': string;
  } = {
    sectionId: data.sections !== null && data.sections[0].id,
  };

  data.sections !== null &&
    data.sections[0] !== null &&
    data.sections[0].attributes !== null &&
    data.sections[0].attributes.forEach((attribute) => {
      values[attribute.tag] = attribute.value;
    });

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="flex items-center space-x-4">
        <Link
          href="/dashboard/collections"
          className="text-muted-foreground hover:text-primary"
          prefetch={false}
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">Back</h1>
      </div>
      <AboutForm values={values} />
    </div>
  );
}
