import { IconChevronRightFilled, IconChevronDownFilled } from '@tabler/icons-react';
import { Link } from 'react-router-dom'

import { useState } from 'react'

export function SidebarItem({ title, src, icon, mode = 'hidden', children = [], width = '70', toggleMode }) {
  const [open, setOpen] = useState(false)

  if (mode === 'hidden') {
    return null
  } else if (mode === 'icon') {
    return (
      <>
        {
          children?.length > 0 ? (
            <li onClick={toggleMode}>
              <Link to={src} className='flex items-center justify-center size-10 gap-2 p-2 hover:bg-gray-900 rounded-md'>
                {icon}
              </Link>
            </li>
          ) : (
            <li>
              <Link to={src} className='flex items-center justify-center size-10 gap-2 p-2 hover:bg-gray-900 rounded-md'>
                {icon}
              </Link>
            </li>
          )
        }
      </>
    )
  } else {

    if(children?.length > 0) {
      return (
        <li className='flex flex-col'>
          

          <div onClick={() => setOpen(!open)} className="flex justify-between items-center text-white gap-2 rounded-md py-1.5 p-2 mt-1 hover:bg-gray-900 text-sm cursor-pointer" style={{ width }}>
            <div className='flex items-center gap-2'>
              {icon}
              <span>{title}</span>
            </div>
            {open ? <IconChevronDownFilled size={20} /> : <IconChevronRightFilled size={20} />}
          </div>

          {
            open && <ul className='flex flex-col ml-6'>
              {
                children.map((item) => 
                  <SidebarItem
                    key={crypto.randomUUID()}
                    title={item.title}
                    src={item.src}
                    icon={item.icon}
                    mode="expanded"
                    width={'250px'}
                  />
                )
              }
            </ul>
          }

        </li>
      )
    }

    return (
      <li>
        <Link to={src} className="flex items-center text-white gap-2 rounded-md py-1.5 p-2 mt-1 hover:bg-gray-900 text-sm" style={{ width }}>
          {icon}
          <span>{title}</span>
        </Link>
      </li>
    )
  }
}