'use client';


import React from 'react'
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
import { useFormState } from 'react-dom';
import { IUser } from '@/app/interfaces/IUser';
import { updateUser } from '@/app/lib/data';
import { UserState } from '@/app/lib/data';

export default function AccountStatusForm({data}: {data: IUser}) {
    const initialState: UserState = { message: null, errors: {} };
    const updateUserWithId = updateUser.bind(null, data.id);
    const [state, formAction] = useFormState(updateUserWithId, initialState);
  return (
     <Card className="border-destructive">
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
                  <Button variant="destructive">Archive Site</Button>
                </div>
              </div>
              {/* <Separator /> */}
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
          </Card> 
  )
}
