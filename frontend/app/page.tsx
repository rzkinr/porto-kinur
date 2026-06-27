'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, GitBranch, ExternalLink, Mail } from 'lucide-react';
import { getProfile, type Profile } from '@/lib/api';
import { Skeleton } from '@/components/Skeleton';

export default function Home() {
  // Tambahkan state
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className='min-h-screen flex items-center justify-center px-6 pt-20'>
      <div className='max-w-5xl w-full mx-auto grid grid-cols-1 gap-12'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex items-center gap-2 w-fit'>
          <span className='w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse' />
          <span className='text-sm text-gray-600 dark:text-gray-400'>
            Available for opportunities
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='space-y-4'>
          <h1 className='text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight'>
            Hi, Im{' '}
            <span className='text-blue-500 dark:text-blue-400'>Rizki</span>
          </h1>
          <h2 className='text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300'>
            {loading ?
              <Skeleton className='h-8 w-48' />
            : profile?.tagline || 'Full-Stack Developer'}
          </h2>

          <div className='text-gray-600 dark:text-gray-400 text-lg max-w-xl leading-relaxed'>
            {loading ?
              <Skeleton className='h-20 w-full' />
            : profile?.bio1 ||
              "I build web applications and automate things that shouldn't be done manually."
            }
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='flex flex-wrap gap-4'>
          <Link
            href='/projects'
            className='inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors'>
            View Projects <ArrowRight size={16} />
          </Link>
          <Link
            href='/contact'
            className='inline-flex items-center gap-2 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-6 py-3 rounded-lg font-medium transition-colors'>
            Contact Me
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='flex gap-5 text-gray-600 dark:text-gray-400'>
          <a
            href='https://github.com/rizkinr'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-gray-900 dark:hover:text-white transition-colors'>
            <GitBranch size={22} />
          </a>
          <a
            href='https://www.linkedin.com/in/rizkinurrokhim/'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-gray-900 dark:hover:text-white transition-colors'>
            <ExternalLink size={22} />
          </a>
          <a
            href='mailto:rizkynurrokhim18@gmail.com'
            className='hover:text-gray-900 dark:hover:text-white transition-colors'>
            <Mail size={22} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='space-y-3'>
          <p className='text-xs text-gray-500 dark:text-gray-500 uppercase tracking-widest'>
            Tech Stack
          </p>
          <div className='flex flex-wrap gap-2'>
            {[
              'Python',
              'Go',
              'TypeScript',
              'React',
              'Next.js',
              'PostgreSQL',
              'Docker',
            ].map((tech) => (
              <span
                key={tech}
                className='px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md border border-gray-300 dark:border-gray-700'>
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
