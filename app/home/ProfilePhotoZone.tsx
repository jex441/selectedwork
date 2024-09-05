'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';

export default function ProfilePhotoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="flex flex-col items-center space-y-4 rounded-lg bg-gray-50 p-4">
      <div
        {...getRootProps()}
        className="flex w-full max-w-md cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors duration-200 hover:border-primary"
      >
        <input {...getInputProps()} aria-label="Upload profile photo" />
        {preview ? (
          <Avatar className="h-32 w-32">
            <AvatarImage src={preview} alt="Profile preview" />
            <AvatarFallback>Preview</AvatarFallback>
          </Avatar>
        ) : (
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              {isDragActive
                ? 'Drop the file here'
                : "Drag 'n' drop a file here, or click to select a file"}
            </p>
          </div>
        )}
      </div>
      <Button onClick={open} type="button">
        {file ? 'Change Photo' : 'Select Photo'}
      </Button>
      {file && (
        <p className="text-sm text-gray-500">Selected file: {file.name}</p>
      )}
    </div>
  );
}
