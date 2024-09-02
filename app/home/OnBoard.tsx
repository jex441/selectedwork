'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { UploadDropzone, UploadButton } from '@/app/lib/uploadthing';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ImagePlus, User, Instagram, Mail } from 'lucide-react';
import { createCollectionWithMedia, onboardUser } from '../lib/data';
import { set } from 'zod';
import MultiDropzone from './MultiDropzone';
import { checkUsername } from '../lib/data';
import Success from './Success';

export default function Component() {
  const [step, setStep] = useState(1);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [urls, setUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState<{
    images: File[];
    name: string;
    username: string;
    photo: File[];
    bio: string;
    instagram: string;
    email: string;
  }>({
    images: [],
    name: '',
    username: '',
    photo: [],
    bio: '',
    instagram: '',
    email: '',
  });

  const checkUsernameHandler = async (username: string) => {
    const res = await checkUsername(username);
    console.log(res);
    if (res === true) {
      setInvalidUsername(true);
    } else {
      setInvalidUsername(false);
    }
  };

  useEffect(() => {
    if (formData.username.length > 2) {
      setTimeout(() => {
        checkUsernameHandler(formData.username);
      }, 2000);
    }
  }, [formData.username]);

  const createCollectionWithMediaHandler = async (
    newUrls: string[],
    userId: number | null,
  ) => {
    // const res = await createCollectionWithMedia(newUrls, userId);
    setUrls([...urls, ...newUrls]);
    // setUserId(res.id);
  };

  const autoUsername = (name: string) => {
    let alpha = /^[a-zA-Z]+$/;
    let username = '';

    for (let i = 0; i < name.length; i++) {
      if (name[i].match(alpha)) {
        username += name[i];
      }
    }
    return username.toLowerCase();
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    name === 'username' && setInvalidUsername(false);
    name === 'name' &&
      setFormData((prev) => ({
        ...prev,
        username: autoUsername(value),
      }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (files: File[], name: string) => {
    if (name === 'photo') {
      setFormData((prev) => ({ ...prev, photo: files }));
    }
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const onboardUserHandler = async () => {
    // await onboardUser(formData).then((res) => {
    //   handleNext();
    // });
    handleNext();
  };
  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <section className="h-[550px] w-full">
            {/* <CardTitle>Step 1: Add Images</CardTitle> */}
            <MultiDropzone
              formDataFiles={formData.images}
              createCollectionWithMediaHandler={
                createCollectionWithMediaHandler
              }
              handleFileChange={handleFileChange}
              userId={userId}
              urls={urls}
              name="images"
            />
          </section>
        );
      case 2:
        return (
          <>
            <main className="flex h-[550px] flex-col gap-4">
              <div className="flex w-full flex-row justify-around gap-2">
                <div className="relative h-[180px] w-1/3">
                  <Label htmlFor="photo">Your photo</Label>
                  <UploadDropzone
                    className=""
                    endpoint="imageUploader"
                    onDrop={(files) => handleFileChange(files, 'photo')}
                  />
                </div>
                <div className="flex w-1/2 flex-col gap-2 space-y-2 text-left">
                  <Label className="" htmlFor="name">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                  <div className="flex w-full flex-row items-center justify-start gap-2">
                    <Input
                      id="username"
                      name="username"
                      maxLength={18}
                      value={formData.username}
                      defaultValue={formData.name
                        .split(' ')
                        .join('')
                        .toLowerCase()}
                      onChange={handleInputChange}
                      placeholder="johndoe"
                      className="w-1/3 border-0 border-b-2 p-0 text-sm"
                    />
                    <span className="w-1/3 text-sm text-mediumGray">
                      .selected-work.com
                    </span>
                    <span className="block w-1/3 text-sm text-red-400">
                      {invalidUsername && 'Username not available'}
                    </span>
                  </div>
                  <div className="flex flex-row gap-6">
                    <div className="grid gap-3 text-left">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="instagram">Instagram Handle</Label>
                      <Input
                        id="instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        placeholder="@yourusername"
                      />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="bio">Brief Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      className="h-[180px]"
                      onChange={handleInputChange}
                      placeholder="Something about yourself or your work"
                    />
                  </div>
                </div>
              </div>
            </main>
          </>
        );
      case 3:
        return <Success />;
    }
  };

  return (
    <main className="mx-auto h-full w-3/4 rounded-lg bg-white p-4">
      <div className="mb-2 flex h-14 items-start justify-between text-sm">
        Step 1: Upload Images --- Step 2: Personal Info --- Step: 3 Finish
      </div>
      {renderStep()}
      <div className="mt-2 flex justify-between p-4">
        {step > 1 && (
          <Button onClick={handlePrev} variant="outline">
            Previous
          </Button>
        )}
        {step < 3 ? (
          <Button
            // disabled={!urls.length}
            onClick={handleNext}
            className="ml-auto"
          >
            Next
          </Button>
        ) : (
          <Button onClick={() => onboardUserHandler()} className="ml-auto">
            Finish
          </Button>
        )}
      </div>
    </main>
  );
}
