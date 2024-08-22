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
import { createCollectionWithMedia } from '../lib/data';
import { set } from 'zod';
import MultiDropzone from './MultiDropzone';
import { checkUsername } from '../lib/data';

export default function Component() {
  const [step, setStep] = useState(1);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [urls, setUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    images: [],
    name: '',
    username: '',
    photo: '',
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
    const res = await createCollectionWithMedia(newUrls, userId);
    setUrls([...urls, ...newUrls]);
    setUserId(res.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    name === 'username' && setInvalidUsername(false);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'images') {
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Step 1: Add Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex w-full flex-col gap-1">
                  {/* {urls &&
                    urls.map((url) => (
                      <div
                        className="w-full rounded-md border-2 border-lightGray p-1"
                        key={url}
                      >
                        <Image
                          alt="New artwork"
                          height={40}
                          width={40}
                          src={url}
                        />
                      </div>
                    ))} */}
                </div>
                {/* <UploadDropzone
                  className="h-full w-full"
                  endpoint="imageUploader"
                  config={{
                    mode: 'auto',
                  }}
                  onClientUploadComplete={(res) => {
                    console.log(res);
                    const newUrls = res.map((r) => r.url);
                    createCollectionWithMediaHandler(newUrls, userId);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                /> */}
                <MultiDropzone
                  createCollectionWithMediaHandler={
                    createCollectionWithMediaHandler
                  }
                  userId={userId}
                  urls={urls}
                />
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from(formData.images).map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded ${index + 1}`}
                        className="h-24 w-full rounded object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Step 2: Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Username for your website</Label>
                  <div className="flex items-center">
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="johndoe"
                      className="w-1/2"
                    />
                    <span className="w-1/2 pl-1 text-left">
                      .selected-work.com
                    </span>
                  </div>
                  {invalidUsername && (
                    <span className="my-1 flex w-full justify-start text-sm text-red-400">
                      Username not available
                    </span>
                  )}
                </div>
                <div>
                  <Label htmlFor="photo">
                    A photo that represents you or your work
                  </Label>
                  <div className="flex w-full flex-row items-center justify-around">
                    <div>
                      {formData.photo && (
                        <Image
                          src={formData.photo}
                          alt="Profile"
                          height={100}
                          width={100}
                          className="mt-2 h-24 w-24 rounded-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <UploadButton
                        className="self-start"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (typeof res[0].url === 'string')
                            setFormData((prev) => ({
                              ...prev,
                              photo: res[0].url,
                            }));
                        }}
                        onUploadError={(error: Error) => {
                          alert(`ERROR! ${error.message}`);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Brief Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Something about yourself or your work"
                  />
                </div>
              </div>
            </CardContent>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Step 3: Social and Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="instagram">Instagram Handle</Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="@yourusername"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </CardContent>
          </>
        );
    }
  };

  return (
    <Card className="mx-auto w-full max-w-lg">
      {renderStep()}
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button onClick={handlePrev} variant="outline">
            Previous
          </Button>
        )}
        {step < 3 ? (
          <Button onClick={handleNext} className="ml-auto">
            Next
          </Button>
        ) : (
          <Button onClick={() => console.log(formData)} className="ml-auto">
            Finish
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
