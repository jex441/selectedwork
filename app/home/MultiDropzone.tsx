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
}: {
  userId: number | null;
  createCollectionWithMediaHandler: (
    urls: string[],
    userId: number | null,
  ) => void;
  urls: string[];
}) {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    startUpload(acceptedFiles);
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

  return (
    <div className="relative" {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="flex h-48 rounded-md border-2 border-dashed border-gray-300 text-sm text-lightGray">
        {urls &&
          urls.map((url) => (
            <div
              className="relative m-2 h-20 w-20 gap-2 rounded-md rounded-md border-2 border-lightGray"
              key={url}
            >
              <Image
                alt="New artwork"
                height={0}
                width={0}
                sizes="100vw"
                className="h-full w-full object-cover"
                src={url}
              />
            </div>
          ))}
        {!urls.length && (
          <div className="mx-auto self-center">
            {loading
              ? `Uploading ${files.length} files...`
              : 'Drop a few images of your work here (max 8)'}
          </div>
        )}
      </div>
    </div>
  );
}
