import { Link } from "react-router-dom"

import { 
  IconSettings,
  IconBell,
  IconUser,
  IconLayoutSidebar,
  IconHome,
  IconSun,
  IconMoon,
  IconChevronRight
 } from '@tabler/icons-react';


 

export function Navbar () {



  return (
    <header className="sticky w-full top-0 left-0 z-50">
      
      <nav className="flex justify-between py-4 px-2 align-center bg-black/30 backdrop-blur-md">
        <section className="flex ml-4">
          <div className="flex items-center gap-2">
            {/* <ul className="flex gap-4">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li><Link to="/users">Users</Link></li>
            </ul> */}

            <div className="flex justify-center items-center size-8 rounded-md cursor-pointer text-white hover:bg-gray-800">
              <IconLayoutSidebar className="size-5" />
            </div>

            <span className="text-white">|</span>

            <div className="flex justify-around items-center gap-2">
              <div className="flex justify-center items-center size-8 rounded-md cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800">
                <IconHome className="size-5" />
              </div>
              <IconChevronRight size={20} className="text-gray-400" />
              <span className="text-white text-sm">Users</span>
            </div>

            

          </div>
        </section>


        


        <section>

          <div></div>
          
          <div className="flex gap-4 mr-6">

            <div className="rounded-full size-8 bg-black text-white flex items-center justify-center cursor-pointer hover:bg-gray-800">
              <IconMoon size={20} />
            </div>

            <div className="rounded-full size-8 bg-black hover:bg-gray-800 text-white flex items-center justify-center cursor-pointer">
              <IconSettings size={20} />
            </div>

            <div className="flex items-center justify-center rounded-full size-8 bg-gray-200 cursor-pointer overflow-hidden">
              <img className="size-full object-cover" src="https://i.pravatar.cc/150?u=1" alt="user" />
            </div>
          </div>

        </section>
      </nav>

    </header>
  )
}