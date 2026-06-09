'use client';

import { useEffect, useState } from 'react';
import { getProjects, getBlogs, adminGetMessages } from '@/lib/api';

export default function Dashboard() {
  const [counts, setCounts] = useState({ projects: 0, blogs: 0, messages: 0 });

  useEffect(() => {
    Promise.all([getProjects(), getBlogs(), adminGetMessages()]).then(
      ([projects, blogs, messages]) => {
        setCounts({
          projects: projects.length,
          blogs: blogs.length,
          messages: messages.length,
        });
      },
    );
  }, []);

  const cards = [
    { label: 'Projects', value: counts.projects, color: 'text-blue-400' },
    { label: 'Blog Posts', value: counts.blogs, color: 'text-green-400' },
    { label: 'Messages', value: counts.messages, color: 'text-yellow-400' },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-2xl font-bold text-white'>Dashboard</h1>
        <p className='text-gray-400 text-sm mt-1'>Welcome back, Rizki!</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {cards.map((card) => (
          <div
            key={card.label}
            className='border border-gray-800 rounded-xl p-6'>
            <p className='text-gray-500 text-sm'>{card.label}</p>
            <p className={`text-4xl font-bold mt-2 ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
