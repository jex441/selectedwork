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
}: {
  formDataFiles: File[];
  userId: number | null;
  handleFileChange: (urls: File[]) => void;
  createCollectionWithMediaHandler: (
    urls: string[],
    userId: number | null,
  ) => void;
  urls: string[];
}) {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>(formDataFiles);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleFileChange(acceptedFiles);
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
    <div className="relative h-5/6" {...getRootProps()}>
      <input {...getInputProps()} name="images" />
      <div className="flex h-full rounded-md border-2 border-dashed border-gray-300 text-sm text-lightGray">
        {formDataFiles.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {Array.from(formDataFiles).map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Uploaded ${index + 1}`}
                className="h-30 w-30 m-2 rounded object-cover"
              />
            ))}
          </div>
        )}
        {!files.length && (
          <div className="mx-auto self-center">
            {loading
              ? `Uploading ${files.length} files...`
              : 'Drop a few images of your work here to get started'}
          </div>
        )}
      </div>
    </div>
  );
}
