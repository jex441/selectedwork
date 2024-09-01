import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { CheckCircle2Icon, ExternalLinkIcon } from 'lucide-react';

export default function Component() {
  const deployedUrl = 'https://camdenross.selected-work.com';

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <Card className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle2Icon className="h-8 w-8 text-green-500" />
                <h1 className="text-2xl font-bold tracking-tight">
                  Congratulations!
                </h1>
              </div>
              <p className="text-muted-foreground">
                Your new website has been successfully deployed and is ready to
                view.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild className="flex-1">
                <Link href="/create-account">Continue to Create Account</Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href="/">No Thanks</Link>
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Your website is now live at:
              </p>
              <Link
                href={deployedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:underline"
              >
                {deployedUrl}
                <ExternalLinkIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="h-[calc(100vh-10rem)] overflow-hidden rounded-lg border md:h-auto">
            <div className="bg-muted px-4 py-2 text-sm font-medium">
              Preview
            </div>
            <iframe
              src={deployedUrl}
              title="Newly Deployed Website Preview"
              className="h-full min-h-[300px] w-full border-0"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
