'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  getProfile,
  getSkills,
  getCertifications,
  type Profile,
  type Skill,
  type Certification,
} from '@/lib/api';
import { Download } from 'lucide-react';

const defaultExperiences = [
  {
    role: 'IT Support & GA',
    company: 'CV Sukses Jaya Abadi',
    period: 'Des 2025 — Feb 2026',
    desc: 'Instalasi, konfigurasi, dan troubleshooting hardware & software (Windows & Microsoft Office), printer, scanner, dan periferal kantor. Maintenance jaringan LAN/WiFi, sistem CCTV, serta pengelolaan inventaris aset IT.',
  },
  {
    role: 'Field Engineer',
    company: 'Freelance',
    period: 'Agu 2025',
    desc: 'Instalasi Fortinet dan Modem GSM di lokasi, memastikan jaringan internet terkoneksi dengan baik setelah pemasangan perangkat baru.',
  },
  {
    role: 'Staff TU',
    company: 'MI PSM Banaran',
    period: 'Agu 2022 — Nov 2024',
    desc: 'Mengajar komputer dasar kepada siswa, memberikan dukungan teknis kepada guru dan staf, serta berkolaborasi dalam integrasi teknologi ke dalam kurikulum.',
  },
  {
    role: 'Web Developer Intern',
    company: 'PT Sekawan Media',
    period: 'Jul 2020 — Okt 2020',
    desc: 'Pengujian website sebelum diserahkan ke pengguna akhir, pembuatan dan pemeliharaan data utama, serta terlibat dalam pengembangan proyek website menggunakan framework CodeIgniter.',
  },
];

const defaultEducation = [
  {
    degree: 'Sistem Informasi',
    school: 'Universitas Terbuka',
    period: '2023 — Sekarang',
  },
  {
    degree: 'Diploma Teknologi Informasi dan Komputer',
    school: 'Universitas Brawijaya',
    period: '2018 — 2021',
    gpa: 'IPK 3.7/4.0',
  },
];

export default function About() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProfile(), getSkills(), getCertifications()])
      .then(([p, s, c]) => {
        setProfile(p);
        setSkills(s);
        setCertifications(c);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className='min-h-screen px-6 pt-32 pb-20'>
      <div className='max-w-5xl mx-auto space-y-16'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-4'>
          <p className='text-xs text-gray-500 uppercase tracking-widest'>
            About Me
          </p>
          <h1 className='text-4xl font-bold text-white'>Who I Am</h1>
          {loading ?
            <div className='space-y-2 animate-pulse'>
              <div className='h-4 bg-gray-800 rounded w-full' />
              <div className='h-4 bg-gray-800 rounded w-3/4' />
            </div>
          : <>
              <p className='text-gray-400 text-lg max-w-2xl leading-relaxed'>
                {profile?.bio2 ||
                  'Berpengalaman di bidang web development, mobile development, dan IT Support. Saat ini fokus mendalami Golang dan backend architecture.'}
              </p>
            </>
          }
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          href='/resume.pdf'
          download='Rizki-Nur-Rokhim-CV.pdf'
          className='inline-flex items-center gap-2 bg-blue-400 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors w-fit'>
          <Download size={16} /> Lihat CV
        </motion.a>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='space-y-6'>
          <h2 className='text-2xl font-semibold text-white'>Skills</h2>
          {loading ?
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse'>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className='space-y-2'>
                  <div className='h-4 bg-gray-800 rounded w-1/3' />
                  <div className='h-4 bg-gray-800 rounded w-full' />
                </div>
              ))}
            </div>
          : skills.length === 0 ?
            <p className='text-gray-500'>Belum ada skill.</p>
          : <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {skills.map((skill) => (
                <div key={skill.id} className='space-y-3'>
                  <p className='text-sm text-blue-400 font-medium'>
                    {skill.category}
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {skill.items.split(',').map((item) => (
                      <span
                        key={item}
                        className='px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-md border border-gray-700'>
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          }
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='space-y-6'>
          <h2 className='text-2xl font-semibold text-white'>Experience</h2>
          <div className='space-y-4'>
            {defaultExperiences.map((exp, i) => (
              <div
                key={i}
                className='border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors'>
                <div className='flex justify-between items-start flex-wrap gap-2'>
                  <div>
                    <h3 className='text-white font-semibold'>{exp.role}</h3>
                    <p className='text-blue-400 text-sm'>{exp.company}</p>
                  </div>
                  <span className='text-gray-500 text-sm'>{exp.period}</span>
                </div>
                <p className='text-gray-400 text-sm mt-3 leading-relaxed'>
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='space-y-6'>
          <h2 className='text-2xl font-semibold text-white'>Education</h2>
          <div className='space-y-4'>
            {defaultEducation.map((edu, i) => (
              <div
                key={i}
                className='border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors'>
                <div className='flex justify-between items-start flex-wrap gap-2'>
                  <div>
                    <h3 className='text-white font-semibold'>{edu.degree}</h3>
                    <p className='text-blue-400 text-sm'>{edu.school}</p>
                  </div>
                  <div className='text-right'>
                    <span className='text-gray-500 text-sm block'>
                      {edu.period}
                    </span>
                    {edu.gpa && (
                      <span className='text-green-400 text-sm'>{edu.gpa}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='space-y-6'>
          <h2 className='text-2xl font-semibold text-white'>Certifications</h2>
          {loading ?
            <div className='space-y-3 animate-pulse'>
              {[1, 2].map((i) => (
                <div key={i} className='h-12 bg-gray-800 rounded-xl' />
              ))}
            </div>
          : certifications.length === 0 ?
            <p className='text-gray-500'>Belum ada sertifikasi.</p>
          : <div className='space-y-3'>
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className='flex justify-between items-center border border-gray-800 rounded-xl px-6 py-4 hover:border-gray-600 transition-colors'>
                  <div>
                    <p className='text-white text-sm font-medium'>
                      {cert.name}
                    </p>
                    <p className='text-blue-400 text-xs mt-1'>
                      {cert.issuer} · {cert.cert_id}
                    </p>
                  </div>
                  <span className='text-gray-500 text-sm'>{cert.year}</span>
                </div>
              ))}
            </div>
          }
        </motion.div>
      </div>
    </section>
  );
}
