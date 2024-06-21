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
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
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
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground"
                    prefetch={false}
                  >
                    Home
                  </Link>
                  <Link
                    href="/dashboard/collections"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground"
                    prefetch={false}
                  >
                    Selected Work
                  </Link>
                  <Link
                    href="/dashboard/about"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground"
                    prefetch={false}
                  >
                    About
                  </Link>
                  <Link
                    href="/dashboard/cv"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground"
                    prefetch={false}
                  >
                    CV
                  </Link>
                  <Link
                    href="/dashboard/contact"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground"
                    prefetch={false}
                  >
                    Contact
                  </Link>
                </nav>
                {/* <div className="flex flex-col space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Hidden
                  </h3>
                  <nav className="flex flex-col space-y-2">
                    <Link
                      href="#"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground"
                      prefetch={false}
                    >
                      Hidden Page 1
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground"
                      prefetch={false}
                    >
                      Hidden Page 2
                    </Link>
                  </nav>
                </div> 
                <Link
                  href="/dashboard/newpage"
                  className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  prefetch={false}
                >
                  Add New Page
                </Link>*/}
              </div>
            </div>
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
          <Link href="#" className="lg:hidden" prefetch={false}>
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex flex-1 flex-row gap-6">
            <Link
              href="#"
              target="_blank"
              className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              View Live Site
            </Link>
            <div className="inline-flex h-8 items-center justify-center rounded-md bg-green-500/10 px-3 text-sm font-medium text-green-500">
              Active
            </div>
          </div>
          <UserButton />
        </header>
        {children}
      </div>
    </div>
  );
}
