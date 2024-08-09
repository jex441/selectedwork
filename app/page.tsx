import React from 'react';
import UserSite from './[username]/[collection]/page';
import Home from './home/page';
export default async function Page() {
  const getHost = async () => {
    const data = await fetch(
      `${process.env.BASE_URL}/api/requests/getHostName`,
      {
        method: 'GET',
      },
    ).then((res) => {
      console.log('res', res);
      return res.json();
    });
    return data;
  };

  const response = await getHost();
  console.log('hostname', response);
  if (
    response.data.host === 'localhost:3000' ||
    response.data.host === 'www.selected-work.com' ||
    response.data.host === 'selected-work.com'
  ) {
    return <Home />;
  } else {
    return <UserSite params={{ username: null, collection: null }} />;
  }
}
