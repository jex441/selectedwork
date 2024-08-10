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
import AppInput from './appinput';
import { IContactPage } from '../../../interfaces/IContactPage';

export default function SocialLinkInputs({ data }: { data: IContactPage }) {
  return (
    <div className="w-full max-w-md">
      <div className="grid gap-2">
        <Label htmlFor="instagram">Instagram</Label>
        <AppInput
          id="instagram"
          type="url"
          name="instagram"
          text={data.instagram}
          error=""
          placeholder="https://instagram.com/username"
        />
      </div>
      {/* <div className="grid gap-2">
            <Label htmlFor="facebook">Facebook</Label>
            <AppInput id="facebook" type="url" name="facebook" text={data.facebook} error="" placeholder="https://facebook.com/username" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="twitter">Twitter</Label>
            <AppInput id="twitter" type="url" name="twitter" text={data.twitter} error="" placeholder="https://twitter.com/username" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <AppInput id="linkedin" type="url" name="linkedin" text={data.linkedin} error="" placeholder="https://linkedin.com/in/username" />
          </div> */}
    </div>
  );
}
