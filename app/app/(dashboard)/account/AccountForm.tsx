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
import { updateUser } from '@/app/lib/data';
import { UserState } from '@/app/lib/data';

export default function AccountForm({ data }: { data: IUser }) {
  const initialState: UserState = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, data.id);
  const [state, formAction] = useFormState(updateUserWithId, initialState);

  return (
      <form action={formAction}>
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Update your personal information.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input
                      name="displayName"
                      id="name"
                      defaultValue={data.displayName || undefined}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      name="username"
                      id="username"
                      defaultValue={data.username || undefined}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    name="occupation"
                    defaultValue={data.occupation || undefined}
                    placeholder="eg. Sculptor"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </Card>
      </form>
  );
}
