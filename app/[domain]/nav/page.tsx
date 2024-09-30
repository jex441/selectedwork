import React from 'react';
import { getUserByUsername } from '../../lib/requests';
import Nav from './Nav';
import SideNav from './SideNav';
import { notFound } from 'next/navigation';

// This can be removed and use only the client components in same dir
// Unless this is needed for custom domains?
export default async function page({ params }: { params: { domain: string } }) {
  const domain = decodeURIComponent(params.domain);
  const res = await getUserByUsername(domain);

  if (res !== null && res.hibernate) {
    notFound();
  }
  if (res === null) {
    notFound();
  }
  if (res.sideNav) {
    return (
      <SideNav
        collections={res.collections ?? []}
        displayName={res.displayName}
        instagram={res.instagram}
      />
    );
  } else {
    return (
      <Nav
        collections={res.collections ?? []}
        displayName={res.displayName}
        instagram={res.instagram}
      />
    );
  }
}
