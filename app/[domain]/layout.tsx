import { ReactNode } from 'react';
import Nav from './nav/Nav';
import { getUserByUsername } from '../lib/requests';
import Home from '../home/page';
import { getCollectionDataForSite } from '../lib/requests';
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
  // Optional: Redirect to custom domain if it exists
  //   if (
  //     domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
  //     data.customDomain &&
  //     process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === 'true'
  //   ) {
  //     return redirect(`https://${data.customDomain}`);
  //   }

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
      <main className="mt-[70px] lg:mt-0">{children}</main>
    </div>
  );
}
