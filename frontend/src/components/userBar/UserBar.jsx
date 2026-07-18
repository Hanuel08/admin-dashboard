import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconSelector } from '@tabler/icons-react';

export function UserBar({ user, options }) {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative'>
      <div
        onClick={() => setOpen(!open)}
        className='flex items-center w-70 h-14 border border-gray-800 cursor-pointer mt-4 mb-6 rounded-md hover:bg-gray-900'
      >
        <article className='flex items-center w-full h-full'>
          <div className='flex items-center justify-center size-8 rounded-full ml-2'>
            <img src={user.avatar} alt="profile" className='size-full rounded-full object-cover' />
          </div>
          <div className='flex flex-col ml-2'>
            <p className='text-xs'>{user.name}</p>
            <span className='text-xs text-gray-400'>{user.email}</span>
          </div>
        </article>
        <IconSelector size={20} className='mr-2' />
      </div>

      {open && (
        <div className='absolute bottom-full left-0 w-70 mb-2 bg-black border border-gray-800 rounded-md shadow-lg overflow-hidden'>
          {options.map((option) => (
            <Link
              key={option.src}
              to={option.src}
              onClick={() => setOpen(false)}
              className='flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-gray-900 transition-colors'
            >
              {option.icon}
              <span>{option.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
