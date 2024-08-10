import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { UserButton } from '@clerk/nextjs';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-row">
      <div className="border-r bg-gray-100/40 dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link
              href="#"
              className="flex items-center gap-2 font-semibold"
              prefetch={false}
            >
              <span>Selected Work</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <div className="flex h-full w-64 flex-col  p-4">
              <div className="flex flex-col space-y-4">
                <nav className="flex flex-col space-y-2">
                  <Link
                    href=""
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground"
                    prefetch={false}
                  >
                    Home
                  </Link>
                  <Link
                    href="/collections"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground"
                    prefetch={false}
                  >
                    My Collections
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground"
                    prefetch={false}
                  >
                    About
                  </Link>
                  <Link
                    href="/cv"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground"
                    prefetch={false}
                  >
                    CV
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground"
                    prefetch={false}
                  >
                    Contact
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          <div className="mt-auto p-4">
            <div className="flex items-center gap-4">
              <Link
                href="/account"
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                prefetch={false}
              >
                <span>Account Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
          <div className="flex flex-1 flex-row gap-6">
            <Link
              href="#"
              target="_blank"
              className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              View Live Site
            </Link>
          </div>
          <UserButton />
        </header>
        {children}
      </div>
    </div>
  );
}
