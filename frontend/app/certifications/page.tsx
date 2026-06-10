'use client';

import { useEffect, useState } from 'react';
import {
  getCertifications,
  adminCreateCertification,
  adminUpdateCertification,
  adminDeleteCertification,
  type Certification,
} from '../../lib/api';

const emptyForm = { name: '', issuer: '', year: '', cert_id: '' };

export default function AdminCertifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => getCertifications().then(setCertifications);
  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await adminUpdateCertification(editId, form);
    } else {
      await adminCreateCertification(form);
    }
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
    load();
  };

  const handleEdit = (c: Certification) => {
    setForm({
      name: c.name,
      issuer: c.issuer,
      year: c.year,
      cert_id: c.cert_id,
    });
    setEditId(c.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus sertifikasi ini?')) return;
    await adminDeleteCertification(id);
    load();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-white'>Certifications</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setForm(emptyForm);
          }}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors'>
          + Add Certification
        </button>
      </div>

      {showForm && (
        <div className='border border-gray-700 rounded-xl p-6 space-y-4 max-w-lg'>
          <h2 className='text-white font-semibold'>
            {editId ? 'Edit Certification' : 'Add Certification'}
          </h2>
          <form onSubmit={handleSubmit} className='space-y-3'>
            {[
              { name: 'name', placeholder: 'Nama sertifikasi' },
              { name: 'issuer', placeholder: 'Issuer (e.g. Dicoding)' },
              { name: 'year', placeholder: 'Tahun (e.g. 2025)' },
              { name: 'cert_id', placeholder: 'ID Sertifikat' },
            ].map((field) => (
              <input
                key={field.name}
                type='text'
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 text-sm focus:outline-none focus:border-blue-500'
              />
            ))}
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

      <div className='space-y-3'>
        {certifications.map((c) => (
          <div
            key={c.id}
            className='border border-gray-800 rounded-xl px-6 py-4 flex justify-between items-start gap-4'>
            <div>
              <p className='text-white font-medium'>{c.name}</p>
              <p className='text-blue-400 text-xs mt-1'>
                {c.issuer} · {c.cert_id}
              </p>
            </div>
            <div className='flex items-center gap-3 shrink-0'>
              <span className='text-gray-500 text-sm'>{c.year}</span>
              <button
                onClick={() => handleEdit(c)}
                className='text-sm text-blue-400 hover:text-blue-300'>
                Edit
              </button>
              <button
                onClick={() => handleDelete(c.id)}
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
