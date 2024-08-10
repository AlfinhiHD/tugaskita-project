import { Home, ClipboardList, Gift, Users, LogOut } from "lucide-react";

export const navigationItems = [
  {
    icon: Home,
    label: "Dashboard",
    path: "/dashboard",
    id: "dashboard",
  },
  {
    icon: ClipboardList,
    label: "Tugas",
    id: "tugas",
    subItems: [
      {
        icon: ClipboardList,
        label: "Daftar Tugas",
        path: "/tugas/daftar-tugas",
        id: "tugas-daftar",
      },
      {
        icon: ClipboardList,
        label: "Tinjau Tugas",
        path: "/tugas/tinjau-tugas",
        id: "tugas-pengajuan",
      },
    ],
  },
  {
    icon: Gift,
    label: "Reward",
    id: "reward",
    subItems: [
      {
        icon: Gift,
        label: "Daftar Reward",
        path: "/reward/daftar-reward",
        id: "reward-daftar",
      },
      {
        icon: Gift,
        label: "Penukaran Reward",
        path: "/reward/penukaran-reward",
        id: "reward-penukaran",
      },
    ],
  },
  {
    icon: Users,
    label: "Siswa",
    path: "/siswa",
    id: "siswa",
  }
];
