import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-6 px-4 md:gap-8 md:px-6">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
          <div className="grid gap-1">
            <h2 className="text-3xl font-bold tracking-tighter">Pricing</h2>
            <p className="text-muted-foreground">
              Choose the plan that fits your needs.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>Perfect for individuals</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 fill-primary" />
                <span>5 GB storage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 fill-primary" />
                <span>Unlimited bandwidth</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 fill-primary" />
                <span>1 user</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 fill-primary" />
                <span>Basic support</span>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-4xl font-bold">$9</div>
              <Button>Continue</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>Perfect for small teams</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 fill-primary" />
                <span>50 GB storage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 fill-primary" />
                <span>Unlimited bandwidth</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 fill-primary" />
                <span>5 users</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 fill-primary" />
                <span>Priority support</span>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-4xl font-bold">$29</div>
              <Button>Continue</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>Perfect for large organizations</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 fill-primary" />
                <span>Unlimited storage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 fill-primary" />
                <span>Unlimited bandwidth</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 fill-primary" />
                <span>Unlimited users</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 fill-primary" />
                <span>Enterprise support</span>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-4xl font-bold">$99</div>
              <Button>Continue</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
interface Props {
  className?: string;
}

function CheckIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
