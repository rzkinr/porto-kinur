'use client';

import { useEffect, useState } from 'react';
import { adminGetMessages, type Contact } from '@/lib/api';

export default function AdminMessages() {
  const [messages, setMessages] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetMessages()
      .then(setMessages)
      .finally(() => setLoading(false));
  }, []);
  console.log('AdminMessages rendered with messages:', messages);

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold text-white'>Messages</h1>

      {loading ?
        <p className='text-gray-500'>Loading...</p>
      : messages.length === 0 ?
        <p className='text-gray-500'>Belum ada pesan.</p>
      : <div className='space-y-4'>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className='border border-gray-800 rounded-xl p-6 space-y-2'>
              <div className='flex justify-between items-start flex-wrap gap-2'>
                <div>
                  <p className='text-white font-medium'>{msg.name}</p>
                  <a
                    href={`mailto:${msg.email}`}
                    className='text-blue-400 text-sm hover:underline'>
                    {msg.email}
                  </a>
                </div>
                <span className='text-gray-500 text-xs'>
                  {new Date(msg.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <p className='text-gray-300 text-sm leading-relaxed'>
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
