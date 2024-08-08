import React from 'react';
import Page from './[collection]/page';

export default async function UserHome({
  params,
}: {
  params: { username: string | null; collection: string | null };
}) {
  return <Page params={params} />;
}
