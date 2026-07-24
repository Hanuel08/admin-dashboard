import { Link, useLocation } from "react-router-dom"

import {
  IconSettings,
  IconBell,
  IconUser,
  IconLayoutSidebar,
  IconHome,
  IconMoon,
  IconChevronRight
 } from '@tabler/icons-react';


import { config } from '../../data/config.jsx';


export function Navbar () {

  const location = useLocation();

  const segments = location.pathname
    .split("/")
    .filter((segment) => segment !== "" && isNaN(parseFloat(segment)));

  return (
    <header className="sticky w-full top-0 left-0 z-50">

      <nav className="flex justify-between py-4 px-2 align-center bg-black/30 backdrop-blur-md">
        <section className="flex ml-4">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center size-8 rounded-md cursor-pointer text-white hover:bg-gray-800">
              <IconLayoutSidebar className="size-5" />
            </div>

            <span className="text-white">|</span>

            <div className="flex items-center gap-1">
              <Link
                to="/"
                className="flex justify-center items-center size-8 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <IconHome className="size-5" />
              </Link>

              {segments.map((segment, index) => {
                const path = "/" + segments.slice(0, index + 1).join("/");
                const isLast = index === segments.length - 1;

                return (
                  <div key={path} className="flex items-center gap-1">
                    <IconChevronRight size={16} className="text-gray-500" />
                    {isLast ? (
                      <span className="text-white text-sm capitalize">{segment}</span>
                    ) : (
                      <Link
                        to={path}
                        className="text-gray-400 text-sm capitalize hover:text-white transition-colors"
                      >
                        {segment}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>



        <section>

          <div></div>

          <div className="flex gap-4 mr-6">

            <div className="rounded-full size-8 bg-black hover:bg-gray-800 text-white flex items-center justify-center cursor-pointer">
              <IconBell size={20} />
            </div>

            <div className="rounded-full size-8 bg-black hover:bg-gray-800 text-white flex items-center justify-center cursor-pointer">
              <IconSettings size={20} />
            </div>

            <div className="flex items-center justify-center rounded-full size-8 bg-gray-200 cursor-pointer overflow-hidden">
              <img className="size-full object-cover" src={config.user.profile_img} alt="user-profile" />
            </div>
          </div>

        </section>
      </nav>

    </header>
  )
}
