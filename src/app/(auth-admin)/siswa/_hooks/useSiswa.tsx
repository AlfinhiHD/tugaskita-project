import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useSiswa = () => {
  const [siswa] = useState([
    {
      id: 1,
      name: "Jono",
      totalPoints: 5000,
      email: "jono@gmail.com",
      tugasSelesai: 25,
    },
    {
      id: 2,
      name: "Jono",
      totalPoints: 5000,
      email: "jono@gmail.com",
      tugasSelesai: 25,
    },
    {
      id: 3,
      name: "Jono",
      totalPoints: 5000,
      email: "jono@gmail.com",
      tugasSelesai: 25,
    },
    {
      id: 4,
      name: "Jono",
      totalPoints: 5000,
      email: "jono@gmail.com",
      tugasSelesai: 25,
    },
    {
      id: 5,
      name: "Jono",
      totalPoints: 5000,
      email: "jono@gmail.com",
      tugasSelesai: 25,
    },
  ]);

  const router = useRouter();

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState(null);

  const handleDetailClick = (siswa) => {
    setSelectedSiswa(siswa);
    setIsDetailDialogOpen(true);
  };

  const columns = [
    { key: "name", header: "Nama Siswa", sortable: true },
    { key: "email", header: "Email", sortable: true },
    { key: "totalPoints", header: "Total Point", sortable: true },
    {
      key: "actions",
      header: "Aksi",
      render: (siswa) => (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDetailClick(siswa)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/siswa/${siswa.id}`)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      ),
    },
  ];

  return {
    siswa,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedSiswa,
    columns,
    handleDetailClick,
  };
};

export default useSiswa;
