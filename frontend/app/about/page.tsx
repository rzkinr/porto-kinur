'use client';

import { motion } from 'framer-motion';

const experience = [
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

const education = [
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

const skills = {
  'Languages': ['HTML', 'CSS', 'PHP', 'JavaScript', 'Python', 'Go'],
  'Frontend': ['React', 'Next.js', 'Tailwind CSS'],
  'Backend': ['Node.js', 'CodeIgniter', 'REST API'],
  'Database': ['MySQL', 'PostgreSQL'],
  'Tools & Infra': ['Fortinet', 'LAN/WiFi', 'CCTV', 'Git', 'Linux'],
};

export default function About() {
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
          <h1 className='text-4xl font-bold text-white'>Who I am</h1>
          <p className='text-gray-400 text-lg max-w-2xl leading-relaxed'>
            Saya Rizki Nur Rokhim, developer asal Magetan, Indonesia. Lulusan
            Diploma Teknologi Informasi Universitas Brawijaya (IPK 3.7) dan
            sedang melanjutkan studi Sistem Informasi di Universitas Terbuka.
          </p>
          <p className='text-gray-400 text-lg max-w-2xl leading-relaxed'>
            Memiliki pengalaman di bidang IT Support, pengembangan web, dan
            otomasi. Saat ini sedang mendalami Golang dan backend architecture
            untuk memperluas kemampuan sebagai full-stack developer.
          </p>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='space-y-6'>
          <h2 className='text-2xl font-semibold text-white'>Skills</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className='space-y-3'>
                <p className='text-sm text-blue-400 font-medium'>{category}</p>
                <div className='flex flex-wrap gap-2'>
                  {items.map((item) => (
                    <span
                      key={item}
                      className='px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-md border border-gray-700'>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='space-y-6'>
          <h2 className='text-2xl font-semibold text-white'>Experience</h2>
          <div className='space-y-4'>
            {experience.map((exp, i) => (
              <div
                key={i}
                className='border border-gray-800 rounded-xl p-6 hover:bordergray-600 transition-colors'>
                <div className='flex justify-between items-start flex-wrap gap-2'>
                  <div>
                    <h3 className='text-white font semibold'>{exp.role}</h3>
                    <p className='text-blue-400 text-sm'>{exp.company}</p>
                  </div>
                  <span className='text-gray-500 text-sm'>{exp.period}</span>
                </div>
                <p className='text-gray-400 mt-3 text-sm leading-relaxed'>
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
          transition={{ duration: 0.5, delay: 0.6 }}
          className='space-y-6'>
          <h2 className='text-2xl font-semibold text-white'>Education</h2>
          <div className='space-y-4'>
            {education.map((edu, i) => (
              <div
                key={i}
                className='border border-gray-800 rounded-xl p-6 hover:border-gray 600 transition-colors'>
                <div className='flex justify-between items-start flex-wrap gap-2'>
                  <div>
                    <h3 className='text-white font semibold'>{edu.degree}</h3>
                    <p className='text-blue-400 text-sm'>{edu.school}</p>
                  </div>
                  <div className='text-right'>
                    <span className='text-gray-500 text-sm block'>
                      {edu.period}
                    </span>
                    {edu.gpa && (
                      <p className='text-gray-500 text-sm mt-1'>{edu.gpa}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='space-y-6'>
          <h2 className='text-2xl font-semibold text-white'>Certificates</h2>
          <div className='space-y-6'>
            {[
              {
                name: 'Belajar Dasar Pemrograman JavaScript',
                issuer: 'Dicoding',
                year: '2025',
                id: 'MRZM6Q9GRPYQ',
              },
              {
                name: 'Belajar Back-End Pemula dengan JavaScript',
                issuer: 'Dicoding',
                year: '2025',
                id: 'RVZKG5J9OXD5',
              },
            ].map((cert, i) => (
              <div
                key={i}
                className='flex justify-between items-center border border-gray-800 rounded-xl px-6 py-4 hover:border-gray-600 transition-colors'>
                <h3 className='text-white text-sm font-medium'>{cert.name}</h3>
                <p className='text-blue-400 text-xs mt-1'>
                  {cert.issuer} · {cert.id}{' '}
                </p>
                <p className='text-gray-500 text-sm'>{cert.year}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
