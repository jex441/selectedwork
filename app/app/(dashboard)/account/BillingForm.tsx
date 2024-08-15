'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

export default function BillingForm({ data }: { data: any }) {
  const createCheckoutSession = async () => {
    const response = await fetch('/api/stripe/createCheckoutSession', {
      method: 'POST',
      body: JSON.stringify({ email: data.email }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }).then((res) => res.json());
    window.location.href = response.url;
  };

  const createBillingPortalSession = async () => {
    const response = await fetch('/api/stripe/createBillingPortalSession', {
      method: 'POST',
      body: JSON.stringify({ customerId: data.customerId }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }).then((res) => res.json());
    window.location.href = response.url;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>Manage your billing information.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6"></CardContent>
      <CardFooter>
        {data.plan === 'free' ? (
          <Button onClick={() => createCheckoutSession()}>Upgrade Plan</Button>
        ) : (
          <Button onClick={() => createBillingPortalSession()}>
            Manage Billing
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
