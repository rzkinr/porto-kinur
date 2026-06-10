'use client';

import { useEffect, useState } from 'react';
import {
  getSkills,
  adminCreateSkill,
  adminUpdateSkills,
  adminDeleteSkill,
  type Skill,
} from '../../../lib/api';

const emptyForm = { category: '', items: '', sort_order: 0 };

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => getSkills().then(setSkills);
  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(editId, form);
    if (editId) {
      await adminUpdateSkills(editId, form);
    } else {
      await adminCreateSkill(form);
      console.log(form);
    }
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
    load();
  };

  const handleEdit = (s: Skill) => {
    setForm({ category: s.category, items: s.items, sort_order: s.sort_order });
    setEditId(s.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus skill ini?')) return;
    await adminDeleteSkill(id);
    load();
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-white'>Skills</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setForm(emptyForm);
          }}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm  transition-colors'>
          + Add Category
        </button>
      </div>

      {showForm && (
        <div className='border border-gray-700 rounded-xl p-6 space-y-4 max-w-lg'>
          <h2 className='text-white font-semibold'>
            {editId ? 'Edit Skill' : 'Add Skill'}
          </h2>
          <form onSubmit={handleSubmit} className='space-y-3'>
            <input
              type='text'
              placeholder='Category (e.g. Languages)'
              name='category'
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 text-sm focus:outline-none foucus:border-blue-500'
            />
            <input
              type='text'
              placeholder='Items (comma separated)'
              name='items'
              value={form.items}
              onChange={(e) => setForm({ ...form, items: e.target.value })}
              className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 text-sm focus:outline-none foucus:border-blue-500'
            />
            <input
              type='number'
              placeholder='Sort Order (1, 2, 3....)'
              name='sort_order'
              value={form.sort_order}
              onChange={(e) =>
                setForm({ ...form, sort_order: Number(e.target.value) })
              }
              className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 text-sm focus:outline-none foucus:border-blue-500'
            />
            <div className='flex gap-3'>
              <button
                type='submit'
                className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm  transition-colors'>
                {editId ? 'Update' : 'Save'}
              </button>
              <button
                type='button'
                onClick={() => setShowForm(false)}
                className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm  transition-colors'>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className='space-y-3'>
        {skills.map((s) => (
          <div
            key={s.id}
            className='border border-gray-700 rounded-lg p-4 flex justify-between items-center'>
            <div>
              <h3 className='text-white font-medium'>{s.category}</h3>
              <p className='text-gray-400 text-sm'>{s.items}</p>
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() => handleEdit(s)}
                className='bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm  transition-colors'>
                Edit
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm  transition-colors'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
