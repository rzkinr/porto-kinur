'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Eye } from 'lucide-react';
import { useParams } from 'next/navigation';
import { getBlogBySlug, type Blog } from '@/lib/api';

export default function BlogDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getBlogBySlug(slug)
      .then((data) => {
        if (!data) setNotFound(true);
        else setPost(data);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className='min-h-screen px-6 pt-32 pb-20'>
        <div className='max-w-3xl mx-auto space-y-6 animate-pulse'>
          <div className='h-4 bg-gray-800 rounded w-24' />
          <div className='h-8 bg-gray-800 rounded w-3/4' />
          <div className='h-4 bg-gray-800 rounded w-full' />
          <div className='h-4 bg-gray-800 rounded w-full' />
          <div className='h-4 bg-gray-800 rounded w-2/3' />
        </div>
      </section>
    );
  }

  if (notFound || !post) {
    return (
      <section className='min-h-screen px-6 pt-32 pb-20'>
        <div className='max-w-3xl mx-auto text-center space-y-4'>
          <h1 className='text-4xl font-bold text-white'>Post not found</h1>
          <Link href='/blog' className='text-blue-400 hover:underline'>
            ← Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className='min-h-screen px-6 pt-32 pb-20'>
      <div className='max-w-3xl mx-auto space-y-8'>
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}>
          <Link
            href='/blogs'
            className='inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm'>
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-4'>
          <p className='text-gray-500 text-sm'>
            {new Date(post.createdAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <h1 className='text-3xl md:text-4xl font-bold text-white leading-tight'>
            {post.title}
          </h1>
          <div className='flex flex-wrap items-center gap-3'>
            {post.tags.split(',').map((tag) => (
              <span
                key={tag}
                className='px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded border border-gray-700'>
                {tag.trim()}
              </span>
            ))}
            {post.read_time && (
              <span className='text-gray-500 text-sm'>{post.read_time}</span>
            )}
            <span className='flex items-center gap-1 text-gray-500 text-sm'>
              <Eye size={14} /> {post.views} views
            </span>
          </div>
        </motion.div>

        {/* Divider */}
        <hr className='border-gray-800' />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='text-gray-300 leading-relaxed whitespace-pre-line text-[15px] space-y-4'>
          {post.content}
        </motion.div>
      </div>
    </section>
  );
}
