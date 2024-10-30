import React from 'react';

import { getUserByUsername } from '../../lib/requests';
import { notFound } from 'next/navigation';
import Nav1 from './_templates/1/Nav1';
import Nav2 from './_templates/2/Nav2';

import { ICollection } from '@/app/interfaces/ICollection';
// This can be removed and use only the client components in same dir
// Unless this is needed for custom domains?
export default async function page({ params }: { params: { domain: string } }) {
  const domain = decodeURIComponent(params.domain);
  const res = await getUserByUsername(domain);
  console.log('res:', res);
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
        pages={res.pages}
      />
    );
  }
  if (res.template === 2) {
    return (
      <Nav2
        collections={res.collections ?? []}
        displayName={res.displayName}
        instagram={res.instagram}
        pages={res.pages}
      />
    );
  }
  if (res.template === 3) {
    return (
      <Nav1
        collections={res.collections ?? []}
        displayName={res.displayName}
        instagram={res.instagram}
        pages={res.pages}
      />
    );
  }
}
