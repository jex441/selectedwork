import { ReactNode } from 'react';
import { getUserByUsername } from '../lib/requests';
import Home from '../home/page';
import Nav from './nav/page';

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
  console.log(res);
  if (res.template === 1) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        {/* Layout */}
        <>
          <Nav params={params} />
          {/* Main content */}
          <main className="mt-[70px] min-h-screen lg:mt-0">{children}</main>
          {/* Footer */}
          <div className="mt-10 flex h-20 w-[90%] flex-row justify-between self-center border-t border-gray-200 py-4 text-xs text-lightGray">
            <div>{res.displayName} 2025</div>
            {res.plan === 'free' && (
              <div>
                <a
                  href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
                  className="transition-colors hover:text-darkGray hover:underline"
                >
                  selectedwork.net
                </a>
              </div>
            )}
          </div>
        </>
      </div>
    );
  }
  if (res.template === 2) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        {/* Layout */}
        <>
          <Nav params={params} />
          {/* Main content */}
          <main className="ml-0 flex min-h-screen lg:ml-[160px] lg:items-center">
            {children}
          </main>
          {/* Footer */}
          <div className="mt-10 flex h-20 w-[95%] flex-row justify-between border-t border-gray-200 px-4 py-4 text-xs text-lightGray lg:px-0 lg:pl-[250px]">
            <div>{res.displayName} 2025</div>
            {res.plan === 'free' && (
              <div>
                <a
                  href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
                  className="transition-colors hover:text-darkGray hover:underline"
                >
                  selectedwork.net
                </a>
              </div>
            )}
          </div>
        </>
      </div>
    );
  }
  if (res.template === 3) {
    return (
      <div className="flex min-h-screen w-screen flex-col">
        {/* Layout */}
        <>
          <Nav params={params} />
          {/* Main content */}
          <main className="mt-[10vh] min-h-[86vh] lg:mt-0">{children}</main>
          {/* Footer */}
          <div className="mr-1 flex h-[2vh] w-full flex-row justify-end self-end text-xs text-lightGray lg:right-10">
            {res.plan === 'free' && (
              <div>
                <a
                  href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
                  className="transition-colors hover:text-darkGray hover:underline"
                >
                  selectedwork.net
                </a>
              </div>
            )}
          </div>
        </>
      </div>
    );
  }
}
