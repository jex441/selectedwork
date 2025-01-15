import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileIcon, Trash2Icon } from 'lucide-react';
import { UploadButton } from '@/app/lib/uploadthing';
import { addCVPDF, removeCVPDF } from '@/app/lib/data';
import { useToast } from '@/hooks/use-toast';

export default function Component({ data }: { data: any }) {
  const { toast } = useToast();

  const [currentCV, setCurrentCV] = useState<string | null>(data.pdf);

  const addCVPDFHandler = async (url: string) => {
    const res = await addCVPDF(url as string);
    setCurrentCV(url);
    toast({
      title: 'Success',
      description: 'CV uploaded successfully',
    });
  };

  const handleDelete = async () => {
    const res = await removeCVPDF();
    setCurrentCV(null);
    toast({
      title: 'Success',
      description: 'CV removed successfully',
    });
  };

  return (
    <nav className="hidden w-40 rounded-md px-1 md:inline-block">
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
                className="h-8 w-8"
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="flex w-80 flex-row items-center gap-4">
              <span className="text-sm text-gray-500">
                Add a PDF (optional)
              </span>
              <span>
                <label htmlFor="cv-upload">
                  <UploadButton
                    className="ut-button:border-1 self-start ut-button:rounded-md ut-button:border ut-button:bg-white ut-button:text-gray-500 ut-button:hover:bg-gray-600 ut-button:hover:text-white ut-allowed-content:hidden"
                    endpoint="pdfUploader"
                    onClientUploadComplete={(res: { url: string }[]) => {
                      addCVPDFHandler(res[0].url);
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </label>
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
