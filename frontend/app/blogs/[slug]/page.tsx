'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Eye } from 'lucide-react';
import { useParams } from 'next/navigation';
import { getBlogBySlug, getRelatedBlogs, type Blog } from '@/lib/api';
import { Skeleton, SkeletonText } from '@/components/Skeleton';
import ReadingProgress from '@/components/ReadingProgress';

export default function BlogDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [related, setRelated] = useState<Blog[]>([]);

  useEffect(() => {
    Promise.all([getBlogBySlug(slug), getRelatedBlogs(slug)])
      .then(([data, relatedBlogs]) => {
        if (!data) setNotFound(true);
        else {
          setPost(data);
          setRelated(relatedBlogs);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className='min-h-screen px-6 pt-32 pb-20'>
        <ReadingProgress />
        <div className='max-w-3xl mx-auto space-y-6 animate-pulse'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-9 w-3/4' />
          <SkeletonText lines={4} />
        </div>
      </section>
    );
  }

  if (notFound || !post) {
    return (
      <section className='min-h-screen px-6 pt-32 pb-20'>
        <div className='max-w-3xl mx-auto text-center space-y-4'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>
            Post not found
          </h1>
          <Link
            href='/blogs'
            className='text-blue-600 dark:text-blue-400 hover:underline'>
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
            className='inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white transition-colors text-sm'>
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-4'>
          <p className='text-gray-500 dark:text-gray-500 text-sm'>
            {new Date(post.created_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight'>
            {post.title}
          </h1>
          <div className='flex flex-wrap items-center gap-3'>
            {post.tags.split(',').map((tag) => (
              <span
                key={tag}
                className='px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-700'>
                {tag.trim()}
              </span>
            ))}
            {post.read_time && (
              <span className='text-gray-500 dark:text-gray-500 text-sm'>
                {post.read_time}
              </span>
            )}
            <span className='flex items-center gap-1 text-gray-500 dark:text-gray-500 text-sm'>
              <Eye size={14} /> {post.views} views
            </span>
          </div>
        </motion.div>

        {/* Divider */}
        <hr className='border-gray-200 dark:border-gray-800' />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-[15px] space-y-4'>
          {post.content}
        </motion.div>
      </div>
      {related.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='space-y-6 pt-8 border-t border-gray-200 dark:border-gray-800'>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
            Related Posts
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {related.map((r) => (
              <Link key={r.id} href={`/blog/${r.slug}`}>
                <div className='border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-gray-400 dark:hover:border-gray-600 transition-colors group h-full'>
                  <p className='text-gray-500 dark:text-gray-500 text-xs mb-2'>
                    {new Date(r.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <h3 className='text-gray-900 dark:text-white text-sm font-medium group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors leading-snug mb-2'>
                    {r.title}
                  </h3>
                  <div className='flex flex-wrap gap-1'>
                    {r.tags
                      .split(',')
                      .slice(0, 2)
                      .map((tag) => (
                        <span
                          key={tag}
                          className='px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded border border-gray-300 dark:border-gray-700'>
                          {tag.trim()}
                        </span>
                      ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
