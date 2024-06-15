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

export default function Page() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1 bg-gray-100 dark:bg-gray-950">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-12 md:grid-cols-2 md:gap-24 md:px-6 lg:py-24">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="text-sm font-medium text-gray-500 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      prefetch={false}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Create a new account to start showcasing your art.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 py-6 dark:bg-gray-800">
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
      </footer>
    </div>
  );
}
