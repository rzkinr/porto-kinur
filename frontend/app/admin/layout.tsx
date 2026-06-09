'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

const navLinks = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/blog', label: 'Blogs' },
  { href: '/admin/messages', label: 'Messages' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin';

  useEffect(() => {
    if (!isLoginPage) {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/admin');
      }
    }
  }, [isLoginPage, router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className='min-h-screen flex'>
      {/* Sidebar */}
      <aside className='w-56 border-r border-gray-800 pt-20 px-4 flex flex-col gap-1 fixed h-full'>
        <p className='text-xs text-gray-500 uppercase tracking-widest px-3 mb-2'>
          Admin
        </p>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              'px-3 py-2 rounded-lg text-sm transition-colors',
              pathname === link.href ?
                'bg-gray-800 text-white font-medium'
              : 'text-gray-400 hover:bg-gray-800/50 hover:text-white',
            )}>
            {link.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className='mt-auto mb-5 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left'>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className='ml-56 flex-1 pt-20 px-8 pb-20'>{children}</main>
    </div>
  );
}
