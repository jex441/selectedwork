import Link from 'next/link';

export default function Layout({
  params,
  children,
}: {
  params: { username: string };
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <nav className="flex w-full flex-row items-center gap-4 p-10">
        <span>
          <Link href={`/${params.username}/`}>Selected Work</Link>
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
