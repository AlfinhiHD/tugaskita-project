"use client";

// components/Sidebar.js
import React, { useState } from "react";
import {
  Home,
  ClipboardList,
  Gift,
  Users,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [tugasOpen, setTugasOpen] = useState(false);

  const NavItem = ({ icon, label, active, onClick, dropdown, path }) => (
    <Link
      href={path}
      className={`flex items-center p-2 rounded-lg cursor-pointer
        ${active ? "bg-white text-blue-600" : "text-white hover:bg-blue-700"}`}
      onClick={onClick}
    >
      {React.cloneElement(icon, { className: "w-6 h-6 mr-2" })}
      <span className="flex-1">{label}</span>
      {dropdown && (
        <span className="ml-auto">
          {tugasOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </span>
      )}
    </Link>
  );

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
            path="dashboard"
          />
          <div>
            <NavItem
              icon={<ClipboardList />}
              label="Tugas"
              active={activeItem.startsWith("tugas")}
              onClick={() => setTugasOpen(!tugasOpen)}
              dropdown
              path="tugas/tinjau-tugas"
            />
            {tugasOpen && (
              <ul className="ml-6 mt-2 space-y-2">
                <NavItem
                  icon={<ClipboardList />}
                  label="Daftar Tugas"
                  active={activeItem === "tugas-daftar"}
                  onClick={() => setActiveItem("tugas-daftar")}
                  path="tugas/daftar-tugas"
                />
                <NavItem
                  icon={<ClipboardList />}
                  label="Pengajuan Tugas"
                  active={activeItem === "tugas-pengajuan"}
                  onClick={() => setActiveItem("tugas-pengajuan")}
                  path="tugas/tinjau-tugas"
                />
              </ul>
            )}
          </div>
          <NavItem
            icon={<Gift />}
            label="Reward"
            active={activeItem === "reward"}
            onClick={() => setActiveItem("reward")}
            path="tugas/tinjau-tugas"
            
          />
          <NavItem
            icon={<Users />}
            label="Siswa"
            active={activeItem === "siswa"}
            onClick={() => setActiveItem("siswa")}
            path="tugas/tinjau-tugas"
          />
          <NavItem
            icon={<LogOut />}
            label="Logout"
            onClick={() => console.log("Logout clicked")}
            path="tugas/tinjau-tugas"
          />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
