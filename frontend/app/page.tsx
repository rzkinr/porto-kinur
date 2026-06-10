'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, GitBranch, ExternalLink, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProfile, getSkills, type Profile, type Skill } from '@/lib/api';

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProfile(), getSkills()])
      .then(([p, s]) => {
        setProfile(p);
        setSkills(s);
      })
      .finally(() => setLoading(false));
  }, []);

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
            Halo, saya <span className='text-blue-400'>Rizki</span>
          </h1>
          <h2 className='text-2xl md:text-3xl font-medium text-gray-300'>
            {profile?.tagline || 'Fullstack Developer'}
          </h2>
          <p className='text-gray-400 text-lg max-w-xl leading-relaxed'>
            {profile?.bio2 ||
              'Berpengalaman di bidang web development, mobile development, dan IT Support. Saat ini fokus mendalami Golang dan backend architecture.'}
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
            href={profile?.github || '#'}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-white transition-colors'>
            <GitBranch size={24} />
          </a>
          <a
            href={profile?.linkedin || 'https://www.linkedin.com/in/rizkinr/'}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-white transition-colors'>
            <ExternalLink size={24} />
          </a>
          <a
            href={profile?.email || 'mailto:rizkynurrokhim18@gmail.com'}
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
          transition={{ duration: 0.5, delay: 0.1 }}
          className='space-y-6'>
          <h2 className='text-2xl font-semibold text-white'>Skills</h2>
          {loading ?
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse'>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className='space-y-2'>
                  <div className='h-4 bg-gray-800 rounded w-1/3' />
                  <div className='h-4 bg-gray-800 rounded w-full' />
                </div>
              ))}
            </div>
          : skills.length === 0 ?
            <p className='text-gray-500'>Belum ada skill.</p>
          : <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {skills.map((skill) => (
                <div key={skill.id} className='space-y-3'>
                  <p className='text-xs text-gray-500 uppercase tracking-wide'>
                    {skill.category}
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {skill.items.split(',').map((item) => (
                      <span
                        key={item}
                        className='px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-md border border-gray-700'>
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          }
        </motion.div>
      </div>
    </section>
  );
}
