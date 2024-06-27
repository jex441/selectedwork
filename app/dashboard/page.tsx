import { currentUser } from '@clerk/nextjs/server';

export default async function Page() {
  const user = async () => {
    return await currentUser();
  };
  const res = await user();
  console.log('k', res);

  return <div className="mx-auto flex min-h-[100dvh] w-full flex-col"></div>;
}
