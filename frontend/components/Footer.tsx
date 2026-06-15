export default function Footer() {
  return (
    <footer className='border-t border-gray-200 dark:border-gray-800 mt-20 transition-colors'>
      <div className='max-w-5xl mx-auto px-6 py-8 flex justify-between items-center text-sm text-gray-500 dark:text-gray-500'>
        <span>© 2025 Rizki Nur Rokhim</span>
        <div className='flex gap-4'>
          <a
            href='https://github.com/rzkinr'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-gray-900 dark:hover:text-white transition-colors'>
            GitHub
          </a>
          <a
            href='https://www.linkedin.com/in/rizkinurrokhim/'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-gray-900 dark:hover:text-white transition-colors'>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
