import Link from 'next/link';
import { getPageDataForSite } from '@/app/lib/data';

export default async function Layout({
  params,
  children,
}: {
  params: { username: string };
  children: React.ReactNode;
}) {
  let username = params.username;
  let data = await getPageDataForSite(username, 'work');
  console.log('params layout', params);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <nav className="flex w-full flex-row items-center gap-4 p-10">
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
