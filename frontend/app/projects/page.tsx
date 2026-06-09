'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GitBranch } from 'lucide-react';
import { getProjects, type Project } from '@/lib/api';

const statusColors: Record<string, string> = {
  'In Progress': 'bg-yellow-500/10 text-yellowe-400 border-yellow-500/20',
  'Completed': 'bg-green-500/10 text-greene-400 border-green-500/20',
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className='min-h-screen px-6 pt-32 pb-20'>
      <div className='max-w-5xl mx-auto space-y-12'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-4'>
          <p className='text-xs text-gray-500 uppercase tracking-widest'>
            My Work
          </p>
          <h1 className='text-4xl font-bold text-white'>Projects</h1>
          <p className='text-gray-400 text-lg max-w-2xl leading-relaxed'>
            Beberapa project yang pernah saya kerjakan — dari automation bot
            sampai web development.
          </p>
        </motion.div>

        {loading ?
          <div className='space-y-4'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='border border-gray-800 rounded-xl p-6 animate-pulse'>
                <div className='h-5 bg-gray-800 rounded w-1/3 mb-3' />
                <div className='h-4 bg-gray-800 rounded w-2/3 mb-2' />
                <div className='h-4 bg-gray-800 rounded w-1/2' />
              </div>
            ))}
          </div>
        : projects.length === 0 ?
          <p className='text-gray-400'>No projects found.</p>
        : <div className='grid grid-cols-1 gap-6'>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors group'>
                <div className='flex justify-between items-start flex-wrap gap-3'>
                  <div className='space-y-1'>
                    <h2 className='text-white font-semibold text-xl group-hover:text-blue-400 transition-colors'>
                      {project.title}
                    </h2>
                    <span
                      className={`inline-block px-2 py-0.5 border text-xs rounded ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Links */}
                  <div className='flex gap-3'>
                    {project.github && (
                      <a
                        href={project.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-gray-400 hover:text-white transition-colors'>
                        <GitBranch size={18} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={`https://${project.demo}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-gray-400 hover:text-white transition-colors'>
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <p className='text-gray-400 mt-4 text-sm leading-relaxed'>
                  {project.description}
                </p>

                <div className='flex flex-wrap gap-2 mt-4'>
                  {project.tech.split(',').map((tech) => (
                    <span
                      key={tech}
                      className='px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded border border-gray-700'>
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        }
      </div>
    </section>
  );
}
