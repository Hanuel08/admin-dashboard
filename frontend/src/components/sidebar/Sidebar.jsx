import { useState } from 'react'
import { SidebarItem } from './SidebarItem.jsx'
import { sidebarData } from '../../data/sidebarData.jsx'
import { UserBar } from '../userBar/UserBar.jsx'
import { userData } from '../../data/userData.jsx'

function IconSidebar({ toggleMode }) {

  const categories = Object.keys(sidebarData);

  return (
    <aside className='flex flex-col items-center w-16 h-screen sticky top-0 bg-black text-white border-r border-gray-800'>
      <div className='flex flex-col h-full'>

        <section onClick={toggleMode} className='flex items-center justify-center size-10 border border-gray-800 cursor-pointer mt-4 mb-8 rounded-md hover:bg-gray-900'>
          <img src="/assets/img/logo/menu-logo.png" alt="logo" className='size-8' />

        </section>

        <div className='flex flex-col h-full items-center'>
          {
            categories.map((category) => (
              <section key={crypto.randomUUID()} className='flex flex-col mb-8'>


                <ul>
                  {
                    sidebarData[category].map((item) => (
                      <SidebarItem
                        key={crypto.randomUUID()}
                        title={item.title}
                        src={item.src}
                        icon={item.icon}
                        mode="icon"
                        children={item.children}
                        toggleMode={toggleMode}
                      />
                    ))
                  }
                </ul>
              </section>
            ))
          }
        </div>

      </div>

      <div className='flex items-center justify-center size-8 rounded-full mb-4 cursor-pointer'>
        <img src="/assets/img/profile/profile.jpg" alt="profile" className='size-full rounded-full object-cover' />
      </div>
    </aside>
  )
}


function ExpandedSidebar({ toggleMode }) {

  const categories = Object.keys(sidebarData);

  return (
    <aside className='flex flex-col items-center w-78 h-screen sticky top-0 bg-black text-white px-8 border-r border-gray-800'>

      <div className='flex flex-col h-full'>
        <section onClick={toggleMode} className='flex items-center justify-center w-70 h-14 border border-gray-800 cursor-pointer mt-4 mb-8 rounded-md hover:bg-gray-900'>
          <img src="/assets/img/logo/menu-logo.png" alt="logo" className='size-8' />
          <h3 className='text-xl ml-2'>Dashboard</h3>
        </section>

        <div className='flex flex-col h-full'>
          {
            categories.map((category) => (
              <section key={crypto.randomUUID()} className='flex flex-col mb-8'>
                <h4 className='text-xs text-gray-400 ml-2 mb-2'>{category.toUpperCase()}</h4>

                <ul>
                  {
                    sidebarData[category].map((item) => (
                      <SidebarItem
                        key={crypto.randomUUID()}
                        title={item.title}
                        src={item.src}
                        icon={item.icon}
                        mode="expanded"
                        children={item.children}
                        toggleMode={toggleMode}
                      />
                    ))
                  }
                </ul>
              </section>
            ))
          }
        </div>
      </div>

      <UserBar user={userData} options={userData.options} />


    </aside>
  )
}

export function Sidebar() {
  const [mode, setMode] = useState('expanded')

  const toggleMode = () => {
    if (mode === 'expanded') setMode('icon');
    else setMode('expanded');
  }

  const renderMode = () => {
    if (mode === 'expanded') return <ExpandedSidebar toggleMode={toggleMode} />;
    else if (mode === 'icon') return <IconSidebar toggleMode={toggleMode} />;
    else return null;
  }

  return (
    <>
      {renderMode()}
    </>
  )
}















