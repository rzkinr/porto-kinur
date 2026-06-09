'use client';

import { useEffect, useState } from 'react';
import {
  getBlogs,
  adminCreateBlog,
  adminUpdateBlog,
  adminDeleteBlog,
  type Blog,
} from '@/lib/api';

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  tags: '',
  read_time: '',
};

export default function AdminBlog() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => getBlogs().then(setPosts);
  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editSlug) {
      await adminUpdateBlog(editSlug, form);
    } else {
      await adminCreateBlog(form);
    }
    setForm(emptyForm);
    setEditSlug(null);
    setShowForm(false);
    load();
  };

  const handleEdit = (b: Blog) => {
    setForm({
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      content: b.content,
      tags: b.tags,
      read_time: b.read_time,
    });
    setEditSlug(b.slug);
    setShowForm(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Hapus post ini?')) return;
    await adminDeleteBlog(slug);
    load();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-white'>Blog</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditSlug(null);
            setForm(emptyForm);
          }}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors'>
          + Add Post
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className='border border-gray-700 rounded-xl p-6 space-y-4'>
          <h2 className='text-white font-semibold'>
            {editSlug ? 'Edit Post' : 'Add Post'}
          </h2>
          <form onSubmit={handleSubmit} className='space-y-3'>
            {[
              { name: 'title', placeholder: 'Title' },
              { name: 'slug', placeholder: 'slug-url-friendly' },
              {
                name: 'tags',
                placeholder: 'Tags (comma separated: Go,Backend)',
              },
              { name: 'read_time', placeholder: 'Read time (e.g. 5 min read)' },
            ].map((field) => (
              <input
                key={field.name}
                name={field.name}
                type='text'
                placeholder={field.placeholder}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 text-sm focus:outline-none focus:border-blue-500'
              />
            ))}
            <textarea
              name='excerpt'
              placeholder='Excerpt (ringkasan singkat)'
              rows={2}
              value={form.excerpt}
              onChange={handleChange}
              className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 text-sm focus:outline-none focus:border-blue-500 resize-none'
            />
            <textarea
              name='content'
              placeholder='Content (full blog post)'
              rows={8}
              value={form.content}
              onChange={handleChange}
              className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 text-sm focus:outline-none focus:border-blue-500 resize-none'
            />
            <div className='flex gap-3'>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm'>
                {editSlug ? 'Update' : 'Save'}
              </button>
              <button
                type='button'
                onClick={() => setShowForm(false)}
                className='border border-gray-700 text-gray-400 hover:text-white px-4 py-2 rounded-lg text-sm'>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className='space-y-3'>
        {posts.map((b) => (
          <div
            key={b.id}
            className='border border-gray-800 rounded-xl px-6 py-4 flex justify-between items-start gap-4'>
            <div>
              <p className='text-white font-medium'>{b.title}</p>
              <p className='text-gray-500 text-xs mt-1'>
                {b.slug} · {b.tags}
              </p>
            </div>
            <div className='flex gap-2 shrink-0'>
              <button
                onClick={() => handleEdit(b)}
                className='text-sm text-blue-400 hover:text-blue-300'>
                Edit
              </button>
              <button
                onClick={() => handleDelete(b.slug)}
                className='text-sm text-red-400 hover:text-red-300'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
