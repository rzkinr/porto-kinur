'use client';

import { useEffect, useState } from 'react';
import {
  getProjects,
  adminCreateProject,
  adminUpdateProject,
  adminDeleteProject,
  type Project,
} from '@/lib/api';

const emptyForm = {
  title: '',
  description: '',
  tech: '',
  github: '',
  demo: '',
  status: 'In Progress',
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => getProjects().then(setProjects);
  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await adminUpdateProject(editId, form);
    } else {
      await adminCreateProject(form);
    }
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
    load();
  };

  const handleEdit = (p: Project) => {
    setForm({
      title: p.title,
      description: p.description,
      tech: p.tech,
      github: p.github,
      demo: p.demo,
      status: p.status,
    });
    setEditId(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus project ini?')) return;
    await adminDeleteProject(id);
    load();
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-white'>Projects</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setForm(emptyForm);
          }}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors'>
          + Add Project
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className='border border-gray-700 rounded-xl p-6 space-y-4'>
          <h2 className='text-white font-semibold'>
            {editId ? 'Edit Project' : 'Add Project'}
          </h2>
          <form onSubmit={handleSubmit} className='space-y-3'>
            {[
              { name: 'title', placeholder: 'Title', type: 'text' },
              {
                name: 'tech',
                placeholder: 'Tech (comma separated: Go,React,PostgreSQL)',
                type: 'text',
              },
              { name: 'github', placeholder: 'GitHub URL', type: 'text' },
              {
                name: 'demo',
                placeholder: 'Demo URL (optional)',
                type: 'text',
              },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.name as keyof typeof form]}
                onChange={(e) =>
                  setForm((p) => ({ ...p, [field.name]: e.target.value }))
                }
                className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 text-sm focus:outline-none focus:border-blue-500'
              />
            ))}
            <textarea
              placeholder='Description'
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 text-sm focus:outline-none focus:border-blue-500 resize-none'
            />
            <select
              value={form.status}
              onChange={(e) =>
                setForm((p) => ({ ...p, status: e.target.value }))
              }
              className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 text-sm focus:outline-none focus:border-blue-500'>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <div className='flex gap-3'>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm'>
                {editId ? 'Update' : 'Save'}
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
        {projects.map((p) => (
          <div
            key={p.id}
            className='border border-gray-800 rounded-xl px-6 py-4 flex justify-between items-start gap-4'>
            <div>
              <p className='text-white font-medium'>{p.title}</p>
              <p className='text-gray-500 text-xs mt-1'>{p.tech}</p>
            </div>
            <div className='flex gap-2 shrink-0'>
              <button
                onClick={() => handleEdit(p)}
                className='text-sm text-blue-400 hover:text-blue-300'>
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
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
