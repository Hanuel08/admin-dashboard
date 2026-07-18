import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'

import { Navbar } from './components/navbar/Navbar.jsx'
import { Sidebar } from './components/sidebar/Sidebar.jsx'
import { Footer } from './components/footer/Footer.jsx'

import { Home } from './pages/Home.jsx'
import { Analytics } from './pages/Analytics.jsx'
import { Calendar } from './pages/Calendar.jsx'
import { Users } from './pages/Users.jsx'
import { Roles } from './pages/Roles.jsx'
import { Products } from './pages/Products.jsx'
import { Categories } from './pages/Categories.jsx'
import { Orders } from './pages/Orders.jsx'
import { Posts } from './pages/Posts.jsx'
import { Media } from './pages/Media.jsx'
import { Settings } from './pages/Settings.jsx'
import { Notifications } from './pages/Notifications.jsx'
import { Help } from './pages/Help.jsx'
import { Profile } from './pages/Profile.jsx'
import { Logout } from './pages/Logout.jsx'
import { NotFound } from './pages/NotFound.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className='flex'>
        <Sidebar />
        <main className='flex flex-col w-full bg-black'>
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/roles" element={<Roles />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/categories" element={<Categories />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/media" element={<Media />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/help" element={<Help />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App