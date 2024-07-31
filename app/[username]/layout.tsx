import Nav from './Nav';
import { getCollectionDataForSite } from '@/app/lib/data';
import { ICollection } from '../interfaces/ICollection';
export default async function Layout({
  params,
  children,
}: {
  params: { username: string };
  children: React.ReactNode;
}) {
  let username = params.username;
  type user = { username: string };

  const res: {
    status: number;
    user: user | null;
    data: ICollection | null;
  } = await getCollectionDataForSite(username, 'work');

  if (res.user === null) {
    return <div>404</div>;
  }
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Nav username={username} displayName={res.user.username} />
      <main className="mt-[60px] lg:mt-0">{children}</main>
    </div>
  );
}
