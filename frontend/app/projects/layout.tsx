import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Daftar proyek yang telah saya kerjakan — pengalaman, skill, dan pendidikan.',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
