'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import { sendContact, type ContactPayload } from '@/lib/api';

export default function Contact() {
  const [form, setForm] = useState<ContactPayload>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting contact form:', form);
    // Handle form submission logic here
    setStatus('loading');

    const success = await sendContact(form);
    if (success) {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
  };

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
            Get in Touch
          </p>
          <h1 className='text-4xl font-bold text-white'>Contact Us</h1>
          <p className='text-gray-600'>
            Punya pertanyaan, project, atau sekadar ingin ngobrol? Silakan kirim
            pesan — saya akan balas secepatnya.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='space-y-6'>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-blue-400'>
                <Mail size={20} />
              </div>
              <div>
                <p className='text-xs text-gray-500 uppercase tracking-widest mb-1'>
                  Email
                </p>
                <a
                  href='mailto:rizkynurrokhim18@gmail.com'
                  className='text-gray-300 hover:text-white transition-colors'>
                  rizkynurrokhim18@gmail.com
                </a>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-blue-400'>
                <MapPin size={20} />
              </div>
              <div>
                <p className='text-xs text-gray-500 uppercase tracking-widest mb-1'>
                  Location
                </p>
                <p className='text-gray-300'>Magetan, Indonesia</p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-blue-400'>
                <ExternalLink size={20} />
              </div>
              <div>
                <p className='text-xs text-gray-500 uppercase tracking-widest mb-1'>
                  LinkedIn
                </p>
                <a
                  href='https://www.linkedin.com/in/rizkinr/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-300 hover:text-white transition-colors'>
                  linkedin.com/in/rizkinr
                </a>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-blue-400'>
                <ExternalLink size={20} />
              </div>
              <div>
                <p className='text-xs text-gray-500 uppercase tracking-widest mb-1'>
                  GitHub
                </p>
                <a
                  href='https://github.com/rzkinr'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-300 hover:text-white transition-colors'>
                  github.com/rzkinr
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-1'>
                <label className='text-sm text-gray-400'>Name</label>
                <input
                  type='text'
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  required
                  className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none transition-colors text-sm'
                  placeholder='Your Name'
                />
              </div>

              <div className='space-y-1'>
                <label className='text-sm text-gray-400'>Email</label>
                <input
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                  placeholder='your@gmail.com'
                  required
                  className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none transition-colors text-sm'
                />
              </div>

              <div className='space-y-1'>
                <label className='text-sm text-gray-400'>Message</label>
                <textarea
                  value={form.message}
                  name='message'
                  onChange={handleChange}
                  required
                  rows={5}
                  className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none transition-colors text-sm resize-none h-32'
                  placeholder='Your Message'
                />
              </div>

              <button
                type='submit'
                disabled={status === 'loading'}
                className='w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-medium py-3 rounded-lg transition-colors text-sm'>
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className='text-green-400 text-sm text-center'>
                  ✓ Pesan berhasil dikirim! Saya akan segera membalas.
                </p>
              )}
              {status === 'error' && (
                <p className='text-red-400 text-sm text-center'>
                  ✗ Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
