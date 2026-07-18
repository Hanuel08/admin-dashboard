import { useState } from "react"


import { IconUser, IconSettings, IconHelp, IconLogout, IconDotsFilled } from "@tabler/icons-react";

import { Link } from "react-router-dom";



export function UserTableButton() {
  const [open, setOpen] = useState(false);


  const options = [
    { title: "Profile", src: "/profile", icon: <IconUser size={16} /> },
    { title: "Settings", src: "/settings", icon: <IconSettings size={16} /> },
    { title: "Help", src: "/help", icon: <IconHelp size={16} /> },
    { title: "Logout", src: "/logout", icon: <IconLogout size={16} /> },
  ]



  return (
    <>
      <div className="flex items-center justify-center relative">
        <button onClick={() => setOpen(!open)} className="hover:bg-gray-100 p-2 rounded-md transition-colors cursor-pointer">
          <IconDotsFilled size={16} />
        </button>


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
    </>
  )
}