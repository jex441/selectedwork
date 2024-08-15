'use client';

import React from 'react'
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';


export default function BillingForm({data}: {data: any}) {

    const createCheckoutSession = async () => { 
    const response = await fetch('/api/stripe/createCheckoutSession', {
        method: 'POST',
        body: JSON.stringify({email: data.email}),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }).then((res) => res.json());
      window.location.href = response.url;
    };

  return (
    <Card >
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>Manage your billing information.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6"></CardContent>
      <Button onClick={()=> createCheckoutSession()}>Update Billing</Button>
    </Card>
  )
}
