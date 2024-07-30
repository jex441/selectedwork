import Link from 'next/link';
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
      <nav className="flex w-full flex-row items-center gap-4 p-10">
        <span className="mr-6 text-xl">
          <Link href={`/${params.username}/`}>{res.user.username}</Link>
        </span>
        <span>
          <Link href={`/${params.username}/work`}>Selected Work</Link>
        </span>
        <span>
          <Link href={`/${params.username}/about`}>About</Link>
        </span>
        <span>
          <Link href={`/${params.username}/contact`}>Contact</Link>
        </span>
        <span>
          <Link href={`/${params.username}/cv`}>CV</Link>
        </span>
      </nav>
      <main>{children}</main>
    </div>
  );
}
