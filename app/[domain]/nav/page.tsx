import React from 'react';

import { getUserByUsername } from '../../lib/requests';
import { notFound } from 'next/navigation';
import Nav1 from './_templates/1/page';
import Nav2 from './_templates/2/page';

import { ICollection } from '@/app/interfaces/ICollection';
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
  if (res.template === 1) {
    return (
      <Nav1
        collections={res.collections ?? []}
        displayName={res.displayName}
        instagram={res.instagram}
      />
    );
  }
  if (res.template === 2) {
    return (
      <Nav2
        collections={res.collections ?? []}
        displayName={res.displayName}
        instagram={res.instagram}
      />
    );
  }
}
