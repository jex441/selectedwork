'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UploadButton } from '../../../lib/uploadthing';
import { IUser } from '@/app/interfaces/IUser';
import { updateUserFavicon } from '@/app/lib/data';
import { Trash2, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';

export default function FaviconForm({ data }: { data: IUser }) {
  const router = useRouter();
  const { toast } = useToast();
  const [faviconUrl, setFaviconUrl] = useState<string>(data.favicon || '');

  const updateFaviconHandler = async () => {
    await updateUserFavicon(faviconUrl).then((res) => {
      if (!res || res.status === 500) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Error updating favicon',
        });
      } else if (res.status === 200) {
        toast({
          title: 'Success',
          description: 'Favicon updated successfully',
        });
      }
    });
    router.refresh();
  };

  const removeFaviconHandler = async () => {
    await updateUserFavicon('').then((res) => {
      if (!res || res.status === 500) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Error removing favicon',
        });
      } else if (res.status === 200) {
        setFaviconUrl('');
        toast({
          title: 'Success',
          description: 'Favicon removed successfully',
        });
      }
    });
  };

  return (
    <form onSubmit={updateFaviconHandler}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Favicon</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">
                    A favicon is the small icon that appears in browser tabs,
                    bookmarks, and other places to represent your website
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription>Upload your site's favicon here.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex flex-col items-center gap-4">
            {faviconUrl && (
              <Image
                src={faviconUrl}
                alt="Favicon preview"
                width={64}
                height={64}
                className="rounded-lg border"
              />
            )}
            <div className="flex items-center gap-2">
              <UploadButton
                disabled={data.plan === 'free'}
                endpoint="imageUploader"
                onClientUploadComplete={(res: { url: string }[]) => {
                  if (res?.[0]) {
                    setFaviconUrl(res[0].url);
                    toast({
                      title: 'Success',
                      description: 'Favicon uploaded successfully',
                    });
                  }
                }}
                onUploadError={(error: Error) => {
                  toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: error.message,
                  });
                }}
              />
              {faviconUrl && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={removeFaviconHandler}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={!faviconUrl || faviconUrl === data.favicon}
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
