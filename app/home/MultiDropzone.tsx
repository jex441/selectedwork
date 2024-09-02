'use client';

import { useDropzone } from '@uploadthing/react';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { useCallback, useState } from 'react';
import { useUploadThing } from '@/app/api/uploadthing/uploadThing';
import Image from 'next/image';

export default function MultiDropzone({
  userId,
  createCollectionWithMediaHandler,
  urls,
  formDataFiles,
  handleFileChange,
  name = 'images',
}: {
  formDataFiles: File[];
  userId: number | null;
  handleFileChange: (urls: File[]) => void;
  createCollectionWithMediaHandler: (
    urls: string[],
    userId: number | null,
  ) => void;
  urls: string[];
  name: string;
}) {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>(formDataFiles);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleFileChange(acceptedFiles, name);
    // startUpload(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      console.log(res);
      setLoading(false);
      const newUrls = res.map((r) => r.url);
      createCollectionWithMediaHandler(newUrls, userId);
    },
    onUploadError: () => {
      setLoading(false);

      alert('error occurred while uploading');
    },
    onUploadBegin: () => {
      setLoading(true);
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });
  console.log('files', files);
  return (
    <div
      className="relative h-full rounded-lg bg-gray-200/50"
      {...getRootProps()}
    >
      <input {...getInputProps()} name="images" />
      <div className="flex h-full rounded-md text-sm text-lightGray">
        {formDataFiles.length > 0 && (
          <div className="grid grid-cols-7 gap-2">
            {Array.from(formDataFiles).map((file, index) => (
              <div className="flex flex-col">
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded ${index + 1}`}
                  className="m-2 h-[120px] w-[120px] rounded object-cover"
                />
                {/* <div className="m-2 flex flex-col text-left">
                  Untitled {index + 1}
                </div> */}
              </div>
            ))}
          </div>
        )}
        {!files.length && (
          <div className="absolute left-[300px] top-[300px] mx-auto self-center">
            {loading
              ? `Uploading ${files.length} files...`
              : 'Drag and drop a few images of your work here to get started'}
          </div>
        )}
      </div>
    </div>
  );
}
