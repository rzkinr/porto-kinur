'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className='min-h-screen flex items-center justify-center px-6'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-md w-full text-center space-y-6'>
        <p className='text-sm text-blue-500 dark:text-blue-400 font-medium tracking-widest uppercase'>
          Error 404
        </p>

        <h1 className='text-6xl md:text-7xl font-bold text-gray-900 dark:text-white'>
          404
        </h1>

        <p className='text-gray-600 dark:text-gray-400 text-lg leading-relaxed'>
          Halaman yang kamu cari tidak ditemukan. Mungkin sudah dipindahkan atau
          tidak pernah ada.
        </p>

        <div className='flex flex-wrap justify-center gap-4 pt-2'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors'>
            <Home size={16} /> Back to Home
          </Link>
          <Link
            href='/projects'
            className='inline-flex items-center gap-2 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-6 py-3 rounded-lg font-medium transition-colors'>
            <ArrowLeft size={16} /> View Projects
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
