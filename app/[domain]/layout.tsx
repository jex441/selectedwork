import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { notFound, redirect } from 'next/navigation';
import Nav from './Nav';
import { getUserByUsername } from '../lib/data';
import Home from '../home/page';
import { getCollectionDataForSite } from '../lib/requests';

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
  const data = await getCollectionDataForSite(domain, null);

  const res = await getUserByUsername(domain);

  if (!data) {
    <div>not found</div>;
    // notFound();
  }

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
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Nav
        collections={res.collections ?? []}
        username={res.username}
        displayName={res.displayName}
      />
      <main className="mt-[70px] lg:mt-0">{children}</main>
    </div>
  );
}
