import Nav from './Nav';
import { getCollectionDataForSite, getUserByUsername } from '@/app/lib/data';
import { ICollection } from '../interfaces/ICollection';
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

  const res: {
    status: number;
    user: user | null;
    data: ICollection | null;
  } = await getCollectionDataForSite(username, null);

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
