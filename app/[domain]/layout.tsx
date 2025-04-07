import { ReactNode } from 'react';
import { getUserByUsername } from '../lib/requests';
import Home from '../home/page';
import Nav from './nav/page';
import Head from 'next/head';
import { IUser } from '../interfaces/IUser';

const FooterLink = () => (
  <div>
    <a
      href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
      className="transition-colors hover:text-darkGray hover:underline"
    >
      selectedwork.net
    </a>
  </div>
);

const templateStyles = {
  1: {
    main: 'mt-[70px] min-h-screen lg:mt-0',
    footer:
      'mt-10 flex h-20 w-[90%] flex-row justify-between self-center border-t border-gray-200 py-4 text-xs text-lightGray',
  },
  2: {
    main: 'ml-0 flex min-h-screen lg:ml-[160px] lg:items-center',
    footer:
      'mt-10 flex h-20 w-[95%] flex-row justify-between border-t border-gray-200 px-4 py-4 text-xs text-lightGray lg:px-0 lg:pl-[250px]',
  },
  3: {
    main: 'mt-[10vh] min-h-[86vh] lg:mt-0',
    footer:
      'mr-1 flex h-[2vh] w-full flex-row justify-end self-end text-xs text-lightGray lg:right-10',
  },
};

function generateSEOMetadata(user: IUser) {
  const name = `${user.firstName} ${user.lastName}`.trim();
  const description = `${user.displayName}`;

  // Build dynamic keywords based on user data
  const keywords = [
    name,
    user.displayName,
    'artist',
    'portfolio',
    ...(user.collections?.map((c) => c.title) || []),
    'fine art',
    'contemporary art',
  ]
    .filter(Boolean)
    .join(', ');

  const url =
    user.domain || `${user.username}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return {
    title: `${name} - ${user.displayName}`,
    description,
    keywords,
    url: `https://${url}`,
  };
}

export default async function SiteLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const domain = decodeURIComponent(params.domain);
  if (domain === 'home') return <Home />;

  const user: IUser | null = await getUserByUsername(domain);
  if (user === null) return <div>user not found</div>;

  if (
    !domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    user.plan === 'free'
  ) {
    return <div>Not found</div>;
  }

  const styles = templateStyles[user.template as keyof typeof templateStyles];
  if (!styles) return null;

  const seo = generateSEOMetadata(user);

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href={seo.url} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seo.url} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />

        {/* Additional Artist-specific Meta Tags */}
        <meta name="author" content={user.displayName} />

        {/* Robots Meta */}
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="flex min-h-screen w-full flex-col">
        <Nav params={params} />
        <main className={styles.main}>{children}</main>
        <div className={styles.footer}>
          {user.template !== 3 && <div>{user.displayName} 2025</div>}
          {user.plan === 'free' && <FooterLink />}
        </div>
      </div>
    </>
  );
}
