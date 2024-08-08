"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import Image from "next/image";
import NavItem from "./nav-item";
import { navigationItems } from "../_constant/list";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [openItems, setOpenItems] = useState({});
  const pathname = usePathname();

  useEffect(() => {
    const setActiveItemFromPath = (items) => {
      for (let item of items) {
        if (pathname.startsWith(item.path)) {
          setActiveItem(item.id);
          return;
        }
        if (item.subItems) {
          setActiveItemFromPath(item.subItems);
        }
      }
    };

    setActiveItemFromPath(navigationItems);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
  };


  const toggleOpen = (id) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderNavItems = (items, level = 0) => {
    return items.map((item) => (
      <div key={item.id}>
        <NavItem
          icon={<item.icon />}
          label={item.label}
          active={activeItem === item.id || activeItem.startsWith(item.id)}
          onClick={() => {
            if (item.subItems) {
              toggleOpen(item.id);
            } else if (item.id === 'logout') {
              handleLogout();
            } else {
              setActiveItem(item.id);
            }
          }}
          dropdown={!!item.subItems}
          open={openItems[item.id]}
          noLink={!!item.subItems || item.id === 'logout'}
          path={item.path}
        />
        {item.subItems && openItems[item.id] && (
          <ul className={`ml-6 mt-2 space-y-2`}>
            {renderNavItems(item.subItems, level + 1)}
          </ul>
        )}
      </div>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-600 text-white w-64">
      <div className="p-4">
        <div className="flex items-center mb-8">
          <Image
            src="/assets/logo/logo-tugaskita.png"
            alt="TugasKita logo"
            width={40}
            height={40}
          />
          <h1 className="text-2xl font-bold ml-2">TugasKita</h1>
        </div>

        <div className="mb-4">
          <p className="text-md">
            Halo, <b>Admin 1</b>
          </p>
        </div>
      </div>

      <nav className="flex-grow overflow-y-auto">
        <ul className="space-y-2 px-4">
          {renderNavItems(navigationItems)}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;