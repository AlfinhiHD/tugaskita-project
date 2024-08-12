'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import NavItem from './nav-item';
import { navigationItems } from '../_constant/list';
import { LogOut, Menu } from 'lucide-react';
import { useAuth } from '../_hooks/useAuth';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [openItems, setOpenItems] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const auth = useAuth();
  const { logout } = auth;

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
    logout()
  };

  const toggleOpen = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            setIsMenuOpen(false);
          }}
          dropdown={!!item.subItems}
          open={openItems[item.id]}
          noLink={!!item.subItems || item.id === 'logout'}
          path={item.path}
        />
        {item.subItems && openItems[item.id] && <ul className={`ml-6 mt-2 space-y-2`}>{renderNavItems(item.subItems, level + 1)}</ul>}
      </div>
    ));
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/assets/logo/logo-tugaskita.png" alt="TugasKita logo" width={30} height={30} />
            <h1 className="text-xl font-bold ml-2">TugasKita</h1>
          </div>
          <button onClick={toggleMenu} className="text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Sidebar / Mobile Menu */}
      <div className={`
        lg:block lg:static lg:min-h-screen lg:w-64
        fixed top-0 left-0 right-0 bottom-0 z-40
        bg-blue-600 text-white
        transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-y-0' : '-translate-y-full lg:translate-y-0'}
      `}>
        <div className="p-4 lg:block hidden">
          <div className="flex items-center mb-8">
            <Image src="/assets/logo/logo-tugaskita.png" alt="TugasKita logo" width={40} height={40} />
            <h1 className="text-2xl font-bold ml-2">TugasKita</h1>
          </div>
        </div>

        <nav className="flex-grow overflow-y-auto mt-16 lg:mt-0">
          <ul className="space-y-2 px-4">{renderNavItems(navigationItems)}</ul>
        </nav>

        <div className="p-4 mt-auto">
          <NavItem icon={<LogOut />} label="Logout" onClick={handleLogout} noLink={true} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;