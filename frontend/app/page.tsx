'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, GitBranch, ExternalLink, Mail } from 'lucide-react';

export default function Home() {
  return (
    <section className='min-h-screen flex items-center justify-center px-6 pt-20'>
      <div className='max-w-5xl w-full mx-auto grid grid-cols-1 gap-12'>
        {/* badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text items-center gap-2 w-fit'>
          <span className='w-2 h-2 rounded-full bg-green-400 animate-pulse' />
          <span className='text-sm text-gray-400'>
            Available for opportunities
          </span>
        </motion.div>

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='space-y-4'>
          <h1 className='text-5xl md:text-6xl font-bold text-whote leading-tight tracking-tight'>
            Hi, I'm <span className='text-blue-400'>Rizki</span>
          </h1>
          <h2 className='text-2xl md:text-3xl font-medium text-gray-300'>
            Fullstack Developer
          </h2>
          <p className='text-gray-400 text-lg max-w-xl leading-relaxed'>
            I build web applications and automate things that shouldn't be done
            manually. Currently learning Golang and exploring backend
            architecture.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='flex flex-wrap gap-4'>
          <Link
            href='projects'
            className='inline-glex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-thite px-6 py-3 rounded-lg font-medium transition-colors'>
            View Projects <ArrowRight size={18} />
          </Link>
          <Link
            href='/contact'
            className='inline-flex items-center gap-2 border border-gray-600 hover:border-gray-400 text-gray-400 px-6 py-3 rounded-lg font-medium transition-colors'>
            Contact Me <Mail size={18} />
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='flex gap-5 text-gray-400'>
          <a
            href='https://github.com/rzkinr/'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-white transition-colors'>
            <GitBranch size={24} />
          </a>
          <a
            href='https://www.linkedin.com/in/rizkinr/'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-white transition-colors'>
            <ExternalLink size={24} />
          </a>
          <a
            href='mailto:rizkynurrokhim18@gmail.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-white transition-colors'>
            <Mail size={24} />
          </a>
        </motion.div>

        {/* tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='space-y-3'>
          <p className='text-xs text-gray-500 uppercase tracking-wide'>
            Tech Stack
          </p>
          <div className='flex flex-wrap gap-2'>
            {[
              'Python',
              'Go',
              'JavaScript',
              'TypeScript',
              'React',
              'Node.js',
              'Docker',
              'PostgreSQL',
              'MySQL',
            ].map((tech) => (
              <span
                key={tech}
                className='px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-md border border-gray-700'>
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
