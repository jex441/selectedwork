import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Home,
  FolderHeart,
  Info,
  Mail,
  File,
  FileText,
  Settings,
  Globe,
  SquareUser,
  LogOut,
  ArrowUpRight,
  ArrowRightFromLine,
  GalleryThumbnails,
  CircleUserRound,
  LayoutGrid,
  SendHorizonal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Toaster } from 'react-hot-toast';
import { UserButton, SignOutButton } from '@clerk/nextjs';
import { getUserData } from '@/app/lib/data';
import { useClerk } from '@clerk/nextjs';
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserData();
  if (user === null) {
    return 'Error';
  }
  return (
    <div className="flex min-h-screen w-full flex-row">
      <Toaster position="top-right" />
      <div className="fixed flex h-screen w-1/6 flex-col items-stretch border-r bg-gray-100/40 dark:bg-gray-800/40">
        <div className="flex h-14 px-4">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            Selected Work
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-2 p-4">
            {/* <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 text-sm font-bold transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/"
            >
              <Home className="h-4 w-4" />
              Home
            </Link> */}
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/collections"
            >
              <LayoutGrid className="h-4 w-4" />
              Collections
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/about"
            >
              <SquareUser className="h-4 w-4" />
              About
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/contact"
            >
              <SendHorizonal className="h-4 w-4" />
              Contact
            </Link>
            <Link
              className="t font-boldransition-all flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/cv"
            >
              <File className="h-4 w-4" />
              CV
            </Link>
          </nav>
        </ScrollArea>
        <div className="mt-auto p-4">
          <nav className="flex flex-col gap-2">
            <Link
              href={`http${process.env.NODE_ENV !== 'development' ? 's' : ''}://${user.username}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
              target="_blank"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <Globe className="h-4 w-4" />
              View Your Site
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/account"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <div className="flex items-center gap-3 rounded-lg border-t-2 px-3 py-2 pt-2 text-sm font-bold text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              <UserButton />
              {user.displayName}
            </div>
          </nav>
        </div>
      </div>
      <div className="ml-[16.6%] flex min-h-screen w-full">{children}</div>
    </div>
  );
}
