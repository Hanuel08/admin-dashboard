import { IconUser, IconSettings, IconHelp, IconLogout } from "@tabler/icons-react";

export const userData = {
  name: "Hanuel",
  email: "hanuelmartinez35@gmail.com",
  avatar: "/assets/img/profile/profile.jpg",
  options: [
    { title: "Profile", src: "/profile", icon: <IconUser size={16} /> },
    { title: "Settings", src: "/settings", icon: <IconSettings size={16} /> },
    { title: "Help", src: "/help", icon: <IconHelp size={16} /> },
    { title: "Logout", src: "/logout", icon: <IconLogout size={16} /> },
  ],
};