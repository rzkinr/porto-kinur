'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GitBranch, Search } from 'lucide-react';
import { getProjects, type Project } from '@/lib/api';

const statusColors: Record<string, string> = {
  'In Progress': 'bg-yellow-500/10 text-yellowe-400 border-yellow-500/20',
  'Completed': 'bg-green-500/10 text-greene-400 border-green-500/20',
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  //ambil semua tech yang unik dari projects
  const allTech = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.tech.split(',').forEach((tech) => techSet.add(tech.trim()));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  //filter projects berdasarkan search dan selectedTech
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesTech =
        selectedTech ?
          p.tech
            .split(',')
            .map((t) => t.trim())
            .includes(selectedTech)
        : true;
      return matchesSearch && matchesTech;
    });
  }, [projects, search, selectedTech]);

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

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className='space-y-4'>
          <div className='relative'>
            <Search
              size={16}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'
            />
            <input
              type='text'
              placeholder='Cari project...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-gray-100 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500'
            />
          </div>

          {allTech.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              <button
                onClick={() => setSelectedTech(null)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                  !selectedTech ?
                    'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500'
                }`}>
                All
              </button>
              {allTech.map((tech) => (
                <button
                  key={tech}
                  onClick={() =>
                    setSelectedTech(tech === selectedTech ? null : tech)
                  }
                  className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                    selectedTech === tech ?
                      'bg-blue-500 text-white border-blue-500'
                    : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500'
                  }`}>
                  {tech}
                </button>
              ))}
            </div>
          )}
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
        : filteredProjects.length === 0 ?
          <p className='text-gray-400'>No projects found.</p>
        : <div className='grid grid-cols-1 gap-6'>
            {filteredProjects.map((project, index) => (
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
