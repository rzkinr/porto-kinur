'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='fixed top-0 w-full z-590 border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm'>
      <div className='max-w-5xl mx-auto px-6 py-4 flex justify-between items-center'>
        <Link
          href='/'
          className='font-semibold text-white tracking-tight text-lg'>
          kinur<span className='text-blue-400'>.</span>dev
        </Link>
        <ul className='flex gap-6 text-sm items-center'>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  'transition-colors hover:text-white',
                  pathname === link.href ?
                    'text-white font-medium'
                  : 'text-gray-400',
                )}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
