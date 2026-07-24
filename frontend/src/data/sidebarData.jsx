import { ICON_SIZE } from '../const/const.js';

import {
    IconLayoutDashboard,
    IconHome,
    IconUsers,
    IconUser,
    IconShieldLock,
    IconPackage,
    IconCategory,
    IconShoppingCart,
    IconFileText,
    IconChartBar,
    IconCalendarEvent,
    IconSettings,
    IconBell,
    IconHelp,
    IconDatabase,
  } from "@tabler/icons-react";
  

export const sidebarData = {
    dashboard: [
      {
        title: "Dashboard",
        src: "/",
        icon: <IconLayoutDashboard size={ICON_SIZE} />,
        children: [],
      },
    ],
  
    management: [
      {
        title: "Users",
        src: "/users",
        icon: <IconUsers size={ICON_SIZE} />,
        children: [
          {
            title: "All Users",
            src: "/users",
            icon: <IconUser size={ICON_SIZE} />,
            children: [],
          },
          {
            title: "Roles",
            src: "/users/roles",
            icon: <IconShieldLock size={ICON_SIZE} />,
            children: [],
          },
        ],
      },
      {
        title: "Products",
        src: "/products",
        icon: <IconPackage size={ICON_SIZE} />,
        children: [
          {
            title: "All Products",
            src: "/products",
            icon: <IconPackage size={ICON_SIZE} />,
            children: [],
          },
          {
            title: "Categories",
            src: "/products/categories",
            icon: <IconCategory size={ICON_SIZE} />,
            children: [],
          },
        ],
      },
    ],

  
    settings: [
      {
        title: "Settings",
        src: "/settings",
        icon: <IconSettings size={ICON_SIZE} />,
        children: [],
      },
    ],
  };