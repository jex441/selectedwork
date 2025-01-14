import { Toaster } from '@/components/ui/toaster';
import { getUserData } from '@/app/lib/data';
import Nav from './Nav';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserData();
  if (user === null) {
    return 'Error';
  }

  return (
    <div className="flex min-h-screen w-full flex-row">
      <Toaster />
      <Nav user={user} />
      <div className="mt-12 flex min-h-screen w-full md:ml-[16.6%] md:mt-0">
        {children}
      </div>
    </div>
  );
}
