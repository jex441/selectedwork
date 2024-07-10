'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

import { IPage } from '../../interfaces/IPage';

import {
  EyeIcon,
  LinkIcon,
  UploadIcon,
  XIcon,
} from '../../assets/svgs';
import { useFormState } from 'react-dom';
import {updateAbout} from '@/app/lib/data';

export default function AboutForm ({ 
    values
 }: 
   {aboutHeading: string[], aboutText: string[], aboutImage: string[]}
) {
    const initialState = {id: 1, aboutHeading: values['about-heading'], aboutText: values['about-text'], aboutImage: values['about-image']};
    const [state, formAction] = useFormState(updateAbout, initialState);
    
return (
<form action={formAction}>
<div className="mb-6 flex items-center justify-between">
  <div className="flex w-full items-center justify-end space-x-4">
    <Link
      href="#"
      target="_blank"
      className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      prefetch={false}
    >
      <EyeIcon className="mr-2 h-4 w-4" />
      Preview
    </Link>

    <Button
      variant="outline"
      className="text-muted-foreground hover:bg-muted hover:text-muted-foreground"
    >
      Discard Changes
    </Button>
    <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
      Save Changes
    </Button>
  </div>
</div>
<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
  <div className="space-y-6">
    <div>
      <Label htmlFor="page-title">Heading</Label>
      <Input id="about-heading" name="about-heading" placeholder="Enter heading" defaultValue={values['about-heading'[1]]} />
    </div>
    <div>
      <Label htmlFor="page-description">Text</Label>
      <Textarea
        id="page-description"
        placeholder="About you"
        className="min-h-[100px]"
        defaultValue={values['about-text'[1]]}
      />
    </div>
    <div>
      <Label>Links</Label>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <LinkIcon className="h-5 w-5 text-muted-foreground" />
            <Input placeholder="Enter link URL" />
          </div>
          <Button variant="ghost" size="icon">
            <XIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <LinkIcon className="h-5 w-5 text-muted-foreground" />
            <Input placeholder="Enter link URL" />
          </div>
          <Button variant="ghost" size="icon">
            <XIcon className="h-5 w-5" />
          </Button>
        </div>
        <Button variant="outline" className="w-full">
          Add Link
        </Button>
      </div>
    </div>
  </div>
  <div className="space-y-6">
    <div>
      <Label>Image</Label>
      <div className="flex items-center justify-center rounded-md border-2 border-dashed border-muted p-8">
        <div className="space-y-2 text-center">
          <UploadIcon className="h-8 w-8 text-muted-foreground" />
          <p className="text-muted-foreground">
            Drag and drop or click to upload an image
          </p>
        </div>
      </div>
    </div>
    <div>
      <Label>Template Selection</Label>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div className="overflow-hidden rounded-md border">
          <Image
            src="https://generated.vusercontent.net/placeholder.svg"
            width={200}
            height={150}
            alt="Template 1"
            className="h-auto w-full"
          />
          <div className="bg-muted p-4">
            <h3 className="text-lg font-bold">Template 1</h3>
            <p className="text-sm text-muted-foreground">
              A simple one-column layout
            </p>
            <Button variant="outline" className="mt-4 w-full">
              Select
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-md border">
          <Image
            src="https://generated.vusercontent.net/placeholder.svg"
            width={200}
            height={150}
            alt="Template 2"
            className="h-auto w-full"
          />
          <div className="bg-muted p-4">
            <h3 className="text-lg font-bold">Template 2</h3>
            <p className="text-sm text-muted-foreground">
              A two-column layout with sidebar
            </p>
            <Button variant="outline" className="mt-4 w-full">
              Select
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-md border">
          <Image
            src="https://generated.vusercontent.net/placeholder.svg"
            width={200}
            height={150}
            alt="Template 3"
            className="h-auto w-full"
          />
          <div className="bg-muted p-4">
            <h3 className="text-lg font-bold">Template 3</h3>
            <p className="text-sm text-muted-foreground">
              A three-column grid layout
            </p>
            <Button variant="outline" className="mt-4 w-full">
              Select
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</form>)}