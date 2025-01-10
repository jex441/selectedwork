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
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
import { UserButton, SignOutButton } from '@clerk/nextjs';
import { getUserData, togglePageVisibility } from '@/app/lib/data';
import { useClerk } from '@clerk/nextjs';
import Nav from './Nav';
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
      <Nav user={user} />
      <div className="mt-12 flex min-h-screen w-full md:ml-[16.6%] md:mt-0">
        {children}
      </div>
    </div>
  );
}
