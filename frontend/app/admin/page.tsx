'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { login } from '@/lib/api';

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get('admin_token');
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = await login(form.username, form.password);
    if (token) {
      Cookies.set('admin_token', token, { expires: 1 });
      router.push('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
    setLoading(false);
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-6'>
      <div className='w-full max-w-sm space-y-6'>
        <div className='space-y-1'>
          <h1 className='text-2xl font-bold text-white'>Admin Login</h1>
          <p className='text-gray-400 text-sm'>Portofolio Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-1'>
            <label htmlFor='username' className=' text-sm text-gray-400'>
              Username
            </label>
            <input
              id='username'
              type='text'
              value={form.username}
              onChange={(e) =>
                setForm((p) => ({ ...p, username: e.target.value }))
              }
              required
              className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:outline-none transition-colors text-sm'
            />
          </div>
          <div className='space-y-1'>
            <label htmlFor='password' className=' text-sm text-gray-400'>
              {' '}
              Password
            </label>
            <input
              id='password'
              type='password'
              value={form.password}
              onChange={(e) =>
                setForm((p) => ({ ...p, password: e.target.value }))
              }
              required
              className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:outline-none transition-colors text-sm'
            />
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-blue-500/50 text-sm'>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
