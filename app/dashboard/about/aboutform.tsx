'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UploadButton } from "../../lib/uploadthing";

import { IAboutPage } from '../../interfaces/IAboutPage';
import {
  EyeIcon,
  UploadIcon,
} from '../../assets/svgs';
import {updateAbout} from '@/app/lib/data';
import LinkInput from './linkinput';  
import AboutTemplates from './abouttemplates';

export default function AboutForm ({data}: {data: IAboutPage}) {
    const initialState = data
    const updateAboutWithId = updateAbout.bind(null, initialState.id);
return (
<form action={updateAboutWithId}>
<div className="mb-6 flex items-center justify-between">
  <div className="flex w-full items-center justify-end space-x-4">
    {/* <Link
      href="#"
      target="_blank"
      className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      prefetch={false}
    >
      <EyeIcon className="mr-2 h-4 w-4" />
      Preview
    </Link> */}

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
      <Input id="heading" name="heading" placeholder="Enter heading" defaultValue={data.heading ?? ""} />
    </div>
    <div>
      <Label htmlFor="page-description">Text</Label>
      <Textarea
        id="text"
        name="text"
        placeholder="About you"
        className="min-h-[100px]"
        defaultValue={data.text ?? ""}
      />
    </div>
    <div>
      <Label>Links</Label>
      <div className="space-y-4">
       <LinkInput linkSrc={data.linkSrc1 ?? ""} linkText={data.linkText1 ?? ""} textName={"linkText1"} urlName={"linkSrc1"} />
       <LinkInput linkSrc={data.linkSrc2 ?? ""} linkText={data.linkText2 ?? ""} textName={"linkText2"} urlName={"linkSrc2"} />
       </div>
    </div>
  </div>
  <div className="space-y-6">
    <div className="space-y-4">
      <Label>Image</Label>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <div className="space-y-2">
      <Label htmlFor="image-caption">Image Caption</Label>
      <Input type="text" defaultValue={data.imgCaption ?? ""} name="imgCaption" />
      </div>
    </div>

    {/* <div className="space-y-2">
      <AboutTemplates />
    </div> */}

  </div>
</div>
</form>)}