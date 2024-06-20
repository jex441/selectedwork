import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

export default function Component() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard/collections"
            className="text-muted-foreground hover:text-primary"
            prefetch={false}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Back</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="#"
            target="_blank"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            <EyeIcon className="mr-2 h-4 w-4" />
            Preview
          </Link>

          <Button
            variant="outline"
            className="text-muted-foreground hover:bg-muted hover:text-muted-foreground"
          >
            Discard Changes
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Save Changes
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <Label htmlFor="page-title">Heading</Label>
            <Input id="page-title" placeholder="Enter heading" />
          </div>
          <div>
            <Label htmlFor="page-description">Text</Label>
            <Textarea
              id="page-description"
              placeholder="About you"
              className="min-h-[100px]"
            />
          </div>
          <div>
            <Label>Links</Label>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <LinkIcon className="h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Enter link URL" />
                </div>
                <Button variant="ghost" size="icon">
                  <XIcon className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <LinkIcon className="h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Enter link URL" />
                </div>
                <Button variant="ghost" size="icon">
                  <XIcon className="h-5 w-5" />
                </Button>
              </div>
              <Button variant="outline" className="w-full">
                Add Link
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <Label>Image</Label>
            <div className="flex items-center justify-center rounded-md border-2 border-dashed border-muted p-8">
              <div className="space-y-2 text-center">
                <UploadIcon className="h-8 w-8 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Drag and drop or click to upload an image
                </p>
              </div>
            </div>
          </div>
          <div>
            <Label>Template Selection</Label>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <div className="overflow-hidden rounded-md border">
                <Image
                  src="https://generated.vusercontent.net/placeholder.svg"
                  width={200}
                  height={150}
                  alt="Template 1"
                  className="h-auto w-full"
                />
                <div className="bg-muted p-4">
                  <h3 className="text-lg font-bold">Template 1</h3>
                  <p className="text-sm text-muted-foreground">
                    A simple one-column layout
                  </p>
                  <Button variant="outline" className="mt-4 w-full">
                    Select
                  </Button>
                </div>
              </div>
              <div className="overflow-hidden rounded-md border">
                <Image
                  src="https://generated.vusercontent.net/placeholder.svg"
                  width={200}
                  height={150}
                  alt="Template 2"
                  className="h-auto w-full"
                />
                <div className="bg-muted p-4">
                  <h3 className="text-lg font-bold">Template 2</h3>
                  <p className="text-sm text-muted-foreground">
                    A two-column layout with sidebar
                  </p>
                  <Button variant="outline" className="mt-4 w-full">
                    Select
                  </Button>
                </div>
              </div>
              <div className="overflow-hidden rounded-md border">
                <Image
                  src="https://generated.vusercontent.net/placeholder.svg"
                  width={200}
                  height={150}
                  alt="Template 3"
                  className="h-auto w-full"
                />
                <div className="bg-muted p-4">
                  <h3 className="text-lg font-bold">Template 3</h3>
                  <p className="text-sm text-muted-foreground">
                    A three-column grid layout
                  </p>
                  <Button variant="outline" className="mt-4 w-full">
                    Select
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="text-muted-foreground hover:bg-muted hover:text-muted-foreground"
          >
            Delete Collection
          </Button>
          <Button
            variant="outline"
            className="text-muted-foreground hover:bg-muted hover:text-muted-foreground"
          >
            Archive Collection
          </Button>
        </div>
      </div>
    </div>
  );
}
interface Props {
  className?: string;
}

function ArrowLeftIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function LinkIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function UploadIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function XIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
function EyeIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
