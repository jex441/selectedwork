import Nav from './Nav';
import { getUserByUsername } from '@/app/lib/data';
import { IUser } from '../interfaces/IUser';

export default async function Layout({
  params,
  children,
}: {
  params: { username: string };
  children: React.ReactNode;
}) {
  let username = params.username;
  type user = { username: string; displayName: string };

  const request = async () => {
    let url = `${process.env.BASE_URL}/api/requests/getCollectionDataForSite`;
    if (username !== null) {
      url += `/${username}`;
    }
    return await fetch(url, {
      method: 'GET',
    }).then((res) => res.json());
  };

  const res = await request();
  const userData: IUser | null = await getUserByUsername(username);

  if (res.user === null) {
    return <div>404</div>;
  }
  if (userData === null) {
    return <div>404</div>;
  }
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Nav
        collections={userData.collections ?? []}
        username={username}
        displayName={res.user.displayName}
      />
      <main className="mt-[70px] lg:mt-0">{children}</main>
    </div>
  );
}
