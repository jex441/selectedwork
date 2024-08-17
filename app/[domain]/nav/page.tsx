import React from 'react';
import { getUserByUsername } from '../../lib/requests';
import Nav from './Nav';
import { notFound } from 'next/navigation';

export default async function page({ params }: { params: { domain: string } }) {
  const domain = decodeURIComponent(params.domain);
  const res = await getUserByUsername(domain);

  if (res !== null && res.hibernate) {
    notFound();
  }
  if (res !== null) {
    return (
      <Nav
        collections={res.collections ?? []}
        displayName={res.displayName}
        instagram={res.instagram}
      />
    );
  }
}
