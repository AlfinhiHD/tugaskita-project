"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import {
  Home,
  ClipboardList,
  Gift,
  Users,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import NavItem from "./nav-item";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [tugasOpen, setTugasOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/dashboard")) {
      setActiveItem("dashboard");
    } else if (pathname.startsWith("/tugas/daftar-tugas")) {
      setActiveItem("tugas-daftar");
    } else if (pathname.startsWith("/tugas/tinjau-tugas")) {
      setActiveItem("tugas-pengajuan");
    } else if (pathname.startsWith("/reward")) {
      setActiveItem("reward");
    } else if (pathname.startsWith("/siswa")) {
      setActiveItem("siswa");
    }
  }, [pathname]);

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
          <NavItem
            icon={<Home />}
            label="Dashboard"
            active={activeItem === "dashboard"}
            onClick={() => setActiveItem("dashboard")}
            path="/dashboard"
          />
          <div>
            <NavItem
              icon={<ClipboardList />}
              label="Tugas"
              active={activeItem.startsWith("tugas")}
              onClick={() => setTugasOpen(!tugasOpen)}
              dropdown
              open={tugasOpen}
              noLink
            />
            {tugasOpen && (
              <ul className="ml-6 mt-2 space-y-2">
                <NavItem
                  icon={<ClipboardList />}
                  label="Daftar Tugas"
                  active={activeItem === "tugas-daftar"}
                  onClick={() => setActiveItem("tugas-daftar")}
                  path="/tugas/daftar-tugas"
                />
                <NavItem
                  icon={<ClipboardList />}
                  label="Pengajuan Tugas"
                  active={activeItem === "tugas-pengajuan"}
                  onClick={() => setActiveItem("tugas-pengajuan")}
                  path="/tugas/tinjau-tugas"
                />
              </ul>
            )}
          </div>
          <NavItem
            icon={<Gift />}
            label="Reward"
            active={activeItem === "reward"}
            onClick={() => setActiveItem("reward")}
            path="/reward"
          />
          <NavItem
            icon={<Users />}
            label="Siswa"
            active={activeItem === "siswa"}
            onClick={() => setActiveItem("siswa")}
            path="/siswa"
          />
          <NavItem
            icon={<LogOut />}
            label="Logout"
            onClick={() => console.log("Logout clicked")}
            path="/logout"
          />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;