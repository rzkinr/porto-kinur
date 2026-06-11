import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs',
  description:
    'Artikel-artikel tentang teknologi, pengalaman kerja, dan hal-hal lain yang menarik.',
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
