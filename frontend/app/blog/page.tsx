'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getBlogs, type Blog } from '@/lib/api';

export default function Blog() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className='min-h-screen px-6 pt-32 pb-20'>
      <div className='max-w-5xl mx-auto space-y-12'>
        {/* Blog Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-4'>
          <p className='text-xs text-gray-500 uppercase tracking-widest'>
            Writing
          </p>
          <h1 className='text-4xl font-bold text-white'>My Blog</h1>
          <p className='text-gray-400 text-lg max-w-2xl leading-relaxed'>
            Catatan perjalanan belajar — dari debugging aneh sampai hal-hal yang
            akhirnya masuk akal setelah berjam-jam.
          </p>
        </motion.div>

        {loading ?
          <div className='space-y-4'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='border border-gray-800 rounded-xl p-6 animate-pulse'>
                <div className='h-5 bg-gray-800 rounded w-2/3 mb-3' />
                <div className='h-4 bg-gray-800 rounded w-full mb-2' />
                <div className='h-4 bg-gray-800 rounded w-3/4' />
              </div>
            ))}
          </div>
        : posts.length === 0 ?
          <p className='text-gray-500'>Belum ada post.</p>
        : <div className='space-y-4'>
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Link href={`/blogs/${post.slug}`}>
                  <div className='border border-gray-800 rounded-xl p-6 hover:bg-gray-600 transition-colors group cursor-pointer'>
                    <div className='flex justify-between items-start flex-wrap gap-2 mb-3'>
                      <span className='text-gray-500 text-sm'>
                        {new Date(post.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                      <span className='text-gray-500 text-sm'>
                        {post.read_time} min read
                      </span>
                    </div>

                    <h2 className='text-white font-semibold text-xl group-hover:text-blue-400 transition-colors mb-2'>
                      {post.title}
                    </h2>

                    <p className='text-gray-400 text-sm leading-relaxed mb-4'>
                      {post.excerpt}
                    </p>

                    <div className='flex flex-wrap gap-2'>
                      {post.tags.split(',').map((tag) => (
                        <span
                          key={tag}
                          className='px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded border border-gray-700'>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        }
      </div>
    </section>
  );
}
