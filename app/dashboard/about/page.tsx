import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

import { useStore } from '../../store';

import { IUser } from '../../interfaces/IUser';
import { IAboutPage } from '../../interfaces/IAboutPage';
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
  const data: IAboutPage = await getPageData('About');

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <AboutForm data={data} />
    </div>
  );
}
