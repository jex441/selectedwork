import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileIcon, Trash2Icon, UploadIcon } from 'lucide-react';
import { UploadButton } from '@/app/lib/uploadthing';
import { addCVPDF, removeCVPDF } from '@/app/lib/data';
import toast from 'react-hot-toast';

export default function Component({ data }: { data: any }) {
  const [currentCV, setCurrentCV] = useState<string | null>(data.pdf);

  const addCVPDFHandler = async (url: string) => {
    const res = await addCVPDF(url as string);
    setCurrentCV(url);
    toast.success('CV uploaded successfully');
  };

  const handleDelete = async () => {
    const res = await removeCVPDF();
    setCurrentCV(null);
    toast.success('CV removed successfully');
  };

  return (
    <nav className="w-80">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          {currentCV ? (
            <>
              <a href={data.pdf} target="_blank">
                <div className="flex items-center space-x-2 text-foreground">
                  <FileIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">{data.pdfName}</span>
                </div>
              </a>
              <Button
                variant="destructive"
                size="icon"
                onClick={handleDelete}
                aria-label="Delete CV"
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="flex items-center">
              <label htmlFor="cv-upload">
                <UploadButton
                  config={{
                    maxFileSize: '4MB',
                    accept: '.pdf',
                    multiple: false,
                  }}
                  className="self-start"
                  endpoint="pdfUploader"
                  onClientUploadComplete={(res: { url: string }[]) => {
                    addCVPDFHandler(res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
