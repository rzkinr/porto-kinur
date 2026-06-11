import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Hubungi Rizki Nur Rokhim untuk kolaborasi atau pertanyaan lebih lanjut.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
