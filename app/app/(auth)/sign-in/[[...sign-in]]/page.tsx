import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="mx-auto flex h-screen w-full flex-col bg-gray-100">
      <main className="flex dark:bg-gray-950">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-12  md:gap-24 md:px-6 lg:py-24">
          <div className="grid gap-6">
            <SignIn />
          </div>
        </div>
      </main>
    </div>
  );
}
