import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Component() {
  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between bg-background px-4 py-3">
        <Link
          href="/dashboard/collections/piece"
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
        <img
          src="https://generated.vusercontent.net/placeholder.svg"
          alt="Product Image"
          width={500}
          height={300}
          className="overflow-hidden border border-gray-200 dark:border-gray-800"
        />
      </div>
    </div>
  );
}

function ArrowLeftIcon(props) {
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
