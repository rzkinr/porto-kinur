'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className='w-9 h-9' />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='w-9 h-9 flex items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors'
      aria-label='Toggle theme'>
      {theme === 'dark' ?
        <Sun size={16} />
      : <Moon size={16} />}
    </button>
  );
}
