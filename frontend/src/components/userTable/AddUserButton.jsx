import { IconUserPlus } from "@tabler/icons-react";

//import { Link } from "react-router-dom";



export function AddButton() {
  const [open, setOpen] = useState(false);


  const options = [
    { title: "Profile", src: "/profile", icon: <IconUser size={16} /> },
    { title: "Settings", src: "/settings", icon: <IconSettings size={16} /> },
    { title: "Help", src: "/help", icon: <IconHelp size={16} /> },
    { title: "Logout", src: "/logout", icon: <IconLogout size={16} /> },
  ]



  return (
    <button className='flex items-center justify-center w-34 h-10 p-4 bg-white text-black rounded-md hover:bg-gray-100 gap-2 cursor-pointer'>
      <IconUserPlus size={20} />
      <span className='font-medium'>Add User</span>
    </button>
  )
}