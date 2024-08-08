import React from 'react';
import UserSite from './[username]/[collection]/page';

export default async function Page(props) {
  // Need to render [username] contents here in the root. The only difference is we are sourcing the user's data from the domain name.
  // How to achieve this without duplicating the code? Hrefs will be /work not /username/work0
  // return <UserSite params={params} />;
  // return <UserSite params={{ username: 'value', collection: null }} />;
  return <UserSite params={props.params} />;
}
