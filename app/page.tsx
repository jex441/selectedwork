import React from 'react';
import UserSite from './[username]/[collection]/page';

export default async function Page() {
  return <UserSite params={{ username: '', collection: null }} />;
}
