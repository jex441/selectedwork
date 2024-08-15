'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { IUser } from '@/app/interfaces/IUser';

export default function AccountStatusForm({ data }: { data: IUser }) {
  const hibernateAccount = async () => {
    const response = await fetch('/api/account/hibernate', {
      method: 'POST',
      body: JSON.stringify({ email: data.email }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  };

  const deleteAccount = async () => {
    const response = await fetch('/api/account/delete', {
      method: 'POST',
      body: JSON.stringify({ email: data.email }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  };

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle>Danger Zone</CardTitle>
        <CardDescription>These actions can be irreversible.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">
                Hibernation Status for your Website
              </h3>
              <p className="text-sm text-muted-foreground">
                {data.hibernate
                  ? 'Your website is currently hibernating. Click the button to make it live again.'
                  : 'This will make your website inaccessible to the public.'}
              </p>
            </div>
            {data.hibernate ? (
              <Button
                onClick={() => hibernateAccount()}
                variant="destructive"
                className="w-40"
              >
                Hibernate Site
              </Button>
            ) : (
              <Button
                onClick={() => hibernateAccount()}
                className="w-40 bg-darkGray text-white"
              >
                Go Live
              </Button>
            )}
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-destructive">
                Delete Account
              </h3>
              <p className="text-sm text-muted-foreground">
                This will permanently delete your account and all associated
                data.
              </p>
            </div>
            <Button variant="destructive" className="w-40">
              Delete Account
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
