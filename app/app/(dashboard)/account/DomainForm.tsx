'use client';

import { Button } from '@/components/ui/button';
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
import { useFormState } from 'react-dom';
import { IUser } from '@/app/interfaces/IUser';
import { updateUserCustomDomain } from '@/app/lib/data';
import { UserState } from '@/app/lib/data';

export default function DomainForm({ data }: { data: IUser }) {
  const initialState: UserState = { message: null, errors: {} };
  const updateUserCustomDomainWithId = updateUserCustomDomain.bind(null, data.id);
  const [state, formAction] = useFormState(updateUserCustomDomainWithId, initialState);
  return (
      <form action={formAction} >
            <Card>
              <CardHeader>
                <CardTitle>Domain Settings</CardTitle>
                <CardDescription>Manage your custom domain.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="domain">Custom Domain</Label>
                  <Input
                  disabled={data.plan === 'free'}
                    name="domain"
                    id="domain"
                    defaultValue={data.domain || undefined}
                  />
                </div>
                {data.plan !== 'free' && (
                  <div>
                    Add an A record with name @ and value of '76.76.21.21' to
                    your DNS
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  disabled={data.plan === 'free'}
                type="submit">Update Domain</Button>
              </CardFooter>
            </Card>
      </form>
  );
}
