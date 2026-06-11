import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Kenali lebih jauh tentang Rizki Nur Rokhim — pengalaman, skill, dan pendidikan.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
