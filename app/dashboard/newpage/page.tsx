import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Component() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Create a New Web Page
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Choose from our collection of pre-designed templates.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <div className="aspect-w-16 aspect-h-9">
            <Image
              src="https://generated.vusercontent.net/placeholder.svg"
              alt="Template Preview 1"
              width={640}
              height={360}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">
              Landing Page Template
            </h3>
            <div className="mt-4 flex justify-between">
              <Link
                href="#"
                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Preview
              </Link>
              <Button>Select</Button>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <div className="aspect-w-16 aspect-h-9">
            <Image
              src="https://generated.vusercontent.net/placeholder.svg"
              alt="Template Preview 2"
              width={640}
              height={360}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">Blog Template</h3>
            <div className="mt-4 flex justify-between">
              <Link
                href="#"
                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Preview
              </Link>
              <Button>Select</Button>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <div className="aspect-w-16 aspect-h-9">
            <Image
              src="https://generated.vusercontent.net/placeholder.svg"
              alt="Template Preview 3"
              width={640}
              height={360}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">
              E-commerce Template
            </h3>
            <div className="mt-4 flex justify-between">
              <Link
                href="#"
                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Preview
              </Link>
              <Button>Select</Button>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <div className="aspect-w-16 aspect-h-9">
            <Image
              src="https://generated.vusercontent.net/placeholder.svg"
              alt="Template Preview 4"
              width={640}
              height={360}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">
              Portfolio Template
            </h3>
            <div className="mt-4 flex justify-between">
              <Link
                href="#"
                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Preview
              </Link>
              <Button>Select</Button>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <div className="aspect-w-16 aspect-h-9">
            <Image
              src="https://generated.vusercontent.net/placeholder.svg"
              alt="Template Preview 5"
              width={640}
              height={360}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">
              About Us Template
            </h3>
            <div className="mt-4 flex justify-between">
              <Link
                href="#"
                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Preview
              </Link>
              <Button>Select</Button>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <div className="aspect-w-16 aspect-h-9">
            <Image
              src="https://generated.vusercontent.net/placeholder.svg"
              alt="Template Preview 6"
              width={640}
              height={360}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">
              Contact Form Template
            </h3>
            <div className="mt-4 flex justify-between">
              <Link
                href="#"
                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Preview
              </Link>
              <Button>Select</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button>Create</Button>
      </div>
    </div>
  );
}
