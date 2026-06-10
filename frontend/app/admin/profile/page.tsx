'use client';

import { useEffect, useState } from 'react';
import { getProfile, adminUpserProfile } from '../../../lib/api';

const emptyForm = {
  bio1: '',
  bio2: '',
  tagline: '',
  location: '',
  email: '',
  github: '',
  linkedin: '',
};

export default function AdminProfile() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getProfile()
      .then((profile) => {
        if (profile)
          setForm({
            bio1: profile.bio1,
            bio2: profile.bio2,
            tagline: profile.tagline,
            location: profile.location,
            email: profile.email,
            github: profile.github,
            linkedin: profile.linkedin,
          });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const ok = await adminUpserProfile(form);
    if (ok) setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setSaving(false);
  };

  if (loading) return <p className='text-gray-500'>Loading...</p>;

  return (
    <div className='space-y-6 max-w-2xl'>
      <h1 className='text-2xl font-bold text-white'>Profile</h1>

      <form onSubmit={handleSubmit} className='space-y-4'>
        {[
          {
            name: 'tagline',
            label: 'Tagline (e.g. Full-Stack Developer)',
            type: 'text',
          },
          { name: 'location', label: 'Location', type: 'text' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'github', label: 'GitHub URL', type: 'url' },
          { name: 'linkedin', label: 'LinkedIn URL', type: 'url' },
        ].map((field) => (
          <div key={field.name} className='space-y-1'>
            <label htmlFor={field.name} className='text-sm text-gray-400'>
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              value={form[field.name as keyof typeof form]}
              onChange={handleChange}
              className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 text-sm focus:outline-none foucus:border-blue-500'
            />
          </div>
        ))}

        <div className='space-y-1'>
          <label htmlFor='bio1' className='text-sm text-gray-400'>
            Bio 1 (short, for homepage)
          </label>
          <textarea
            name='bio1'
            id='bio1'
            value={form.bio1}
            onChange={handleChange}
            className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 text-sm focus:outline-none foucus:border-blue-500 resize-none'
            rows={3}
          />
        </div>

        <div className='space-y-1'>
          <label htmlFor='bio2' className='text-sm text-gray-400'>
            Bio 2 (detailed, for about page)
          </label>
          <textarea
            name='bio2'
            id='bio2'
            value={form.bio2}
            onChange={handleChange}
            className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 text-sm focus:outline-none foucus:border-blue-500 resize-none'
            rows={6}
          />
        </div>

        <button
          type='submit'
          disabled={saving}
          className='bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors'>
          {saving ? 'Saving...' : 'Save Profile'}
        </button>

        {success && (
          <p className='text-green-500 text-sm'>Profile saved successfully!</p>
        )}
      </form>
    </div>
  );
}
