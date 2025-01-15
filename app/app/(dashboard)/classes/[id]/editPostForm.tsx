'use client';

import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UploadButton } from '../../../../lib/uploadthing';
import { IWorkshop } from '../../../../interfaces/IWorkshop';
import { Trash } from 'lucide-react';

import { deleteWorkshop, updateWorkshop } from '@/app/lib/data';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import Visibility from './visibility';

export default function page({ data }: { data: IWorkshop }) {
  const { toast } = useToast();

  const [state, setState] = useState(data);

  const changeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateWorkshop(state).then((res) => {
      if (!res) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Changes could not be saved',
        });
      } else if (res.status === 200) {
        toast({
          title: 'Changes saved',
          description: 'Changes to this class saved successfully',
        });
      }
    });
  };

  const removeImageHandler = async () => {
    await updateWorkshop({ ...state, imgSrc: null }).then(() => {
      setState((prev) => ({ ...prev, imgSrc: null }));
      toast({
        title: 'Image removed',
      });
    });
  };

  const deleteWorkshopHandler = async (state: IWorkshop) => {
    // Implement delete functionality here
    await deleteWorkshop(state).then(() => {
      toast({
        title: 'Success',
        description: 'Class deleted successfully',
      });
      window.location.href = '/classes';
    });
  };

  return (
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)}>
      <header className="mb-4 flex w-full items-center justify-between pb-4 md:space-x-4">
        <h1 className="text-lg font-bold">Class</h1>
        <div className="flex w-full items-center justify-end space-x-4">
          <Visibility state={state} setState={setState} />
          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Save Changes
          </Button>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="order-1 space-y-6">
          <div className="flex flex-col justify-start space-y-4">
            <Label>Photo</Label>
            <div className="relative my-4 flex h-[100px] w-[200px] items-center justify-center self-center md:h-[200px] md:w-[300px]">
              {state.imgSrc ? (
                <Image
                  src={state.imgSrc ?? ''}
                  className="object-contain"
                  fill={true}
                  alt="Image"
                />
              ) : (
                <div className="border-1 block flex h-full w-full items-center justify-center rounded-md bg-gray-100 text-gray-300">
                  {' '}
                  No image
                </div>
              )}
            </div>
            <div className="flex w-full flex-row justify-between">
              <UploadButton
                className="transform-color self-start ut-button:bg-gray-700 ut-button:text-white ut-button:hover:bg-gray-600 ut-allowed-content:hidden"
                endpoint="imageUploader"
                onClientUploadComplete={async (res) => {
                  await updateWorkshop({ ...state, imgSrc: res[0].url }).then(
                    () =>
                      toast({
                        title: 'Image uploaded',
                      }),
                  );
                  setState((prev) => ({ ...prev, imgSrc: res[0].url }));
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
              <span onClick={() => removeImageHandler()}>
                <Trash
                  size={20}
                  className="mx-2 cursor-pointer opacity-60 transition-all hover:opacity-100"
                />
              </span>
            </div>
          </div>
        </div>
        <div className="order-2 col-span-3 space-y-6 md:ml-20">
          <div>
            <Label htmlFor="heading">Title</Label>
            <Input
              onChange={(e) => changeHandler(e)}
              id="heading"
              name="heading"
              placeholder="Enter heading"
              defaultValue={state.heading ?? ''}
            />
          </div>
          {/* <div>
            <Label htmlFor="subheading">Line 2</Label>
            <Input
              onChange={(e) => changeHandler(e)}
              id="subheading"
              name="subHeading"
              placeholder=""
              defaultValue={state.subHeading ?? ''}
            />
          </div> */}
          <div>
            <Label htmlFor="date">Date/Time</Label>
            <Input
              onChange={(e) => changeHandler(e)}
              id="date"
              name="date"
              placeholder=""
              defaultValue={state.date ?? ''}
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              onChange={(e) => changeHandler(e)}
              id="location"
              name="location"
              placeholder=""
              defaultValue={state.location ?? ''}
            />
          </div>
          <div>
            <Label htmlFor="page-description">Description</Label>
            <Textarea
              onChange={(e) => changeHandler(e)}
              id="text"
              name="body"
              placeholder=""
              className="min-h-[220px]"
              defaultValue={state.body ?? ''}
            />
          </div>
          <div className="grid gap-4">
            <Label>Link</Label>
            <Input
              id="linkSrc1"
              onChange={(e) => changeHandler(e)}
              defaultValue={state.linkSrc1 ?? ''}
              placeholder="https://..."
              name="linkSrc1"
            />
            <div className="flex flex-col"></div>
          </div>
          <button
            type="button"
            className="border-2 border-red-500 px-2 py-1 text-red-500 hover:bg-red-500 hover:text-white"
            onClick={() => deleteWorkshopHandler(state)}
          >
            Delete Class
          </button>
        </div>
      </div>
    </form>
  );
}
