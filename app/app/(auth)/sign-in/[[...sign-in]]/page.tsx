import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignUp } from '@clerk/nextjs';
import { SignIn } from '@clerk/nextjs';
export default function Page() {
  return (
    <div className="mx-auto flex h-screen w-full flex-col bg-gray-100">
      <main className="flex dark:bg-gray-950">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-12  md:gap-24 md:px-6 lg:py-24">
          <div className="grid gap-6">
            <SignIn />
          </div>
        </div>
      </main>

      {/* <footer className="bg-gray-100 py-6 dark:bg-gray-800">
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; 2024 Acme Inc. All rights reserved.
          </p>
          <nav className="flex items-center space-x-4">
            <Link
              href="#"
              className="text-sm font-medium text-gray-500 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-500 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer> */}
    </div>
  );
}
