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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useFormState } from 'react-dom';
import { IUser } from '@/app/interfaces/IUser';
import { updateUser } from '@/app/lib/data';
import { UserState } from '@/app/lib/data';

export default function AccountForm({ data }: { data: IUser }) {
  const initialState: UserState = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, data.id);
  const [state, formAction] = useFormState(updateUserWithId, initialState);

  return (
    <form action={formAction} className="flex min-h-screen flex-col">
      <main className="flex-1 p-6 md:p-10">
        <div className="mx-auto grid max-w-4xl gap-8">
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
            <CardFooter className="border-t">
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Domain Settings</CardTitle>
              <CardDescription>Manage your custom domain.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="domain">Custom Domain</Label>
                <Input
                  name="domain"
                  id="domain"
                  defaultValue={data.domain || undefined}
                />
              </div>
              {data.domain !== null && (
                <div>
                  Add an A record with name @ and value of '76.76.21.21' to your
                  DNS
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t">
              <Button type="submit">Update Domain</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>
                Manage your billing information.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="payment-method">Payment Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visa">Visa - 1234</SelectItem>
                    <SelectItem value="mastercard">
                      Mastercard - 5678
                    </SelectItem>
                    <SelectItem value="amex">
                      American Express - 9012
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="border-t">
              <Button>Update Billing</Button>
            </CardFooter>
          </Card>
          {/* <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>These actions are irreversible.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Archive Website</h3>
                    <p className="text-sm text-muted-foreground">
                      This will make your website inaccessible to the public.
                    </p>
                  </div>
                  <Button variant="destructive">Archive</Button>
                </div>
              </div>
              <Separator />
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-destructive">
                      Delete Account
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      This will permanently delete your account and all
                      associated data.
                    </p>
                  </div>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </main>
    </form>
  );
}
