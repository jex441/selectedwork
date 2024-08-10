import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import { ArrowLeftIcon } from '@/app/assets/svgs';
import placeholder from '@/app/assets/placeholder.png';

export default function Component() {
  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between bg-background px-4 py-3">
        <Link
          href="/collections/piece"
          className="text-primary hover:text-primary-foreground"
          prefetch={false}
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost">Discard Changes</Button>
          <Button>Save Changes</Button>
        </div>
      </header>
      <div className="flex h-full w-full items-center justify-center">
        <Image
          src={placeholder}
          alt="Product Image"
          width={500}
          height={300}
          className="overflow-hidden border border-gray-200 dark:border-gray-800"
        />
      </div>
    </div>
  );
}
