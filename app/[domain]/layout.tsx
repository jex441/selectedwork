import { ReactNode } from 'react';
import { getUserByUsername } from '../lib/requests';
import Home from '../home/page';
import NavPage from './nav/page';

export default async function SiteLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const domain = decodeURIComponent(params.domain);
  if (domain === 'home') {
    return <Home />;
  }
  const res = await getUserByUsername(domain);

  if (!res) {
    return <div>user not found</div>;
  }

  if (
    !domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    res.plan === 'free'
  ) {
    return <div>Not found</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavPage params={params} />
      <main className="mt-[70px] min-h-screen lg:mt-0">{children}</main>
      <div className="mt-10 flex h-20 w-[90%] flex-row justify-between self-center border-t border-gray-200 p-4 text-xs text-lightGray">
        <div>{res.displayName} 2024</div>
        {res.plan === 'free' && (
          <div>
            <a
              href={`http://${process.env.NODE_ENV === 'production' ? 's' : ''}${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
              className="transition-colors hover:text-darkGray hover:underline"
            >
              selectedwork.net
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
