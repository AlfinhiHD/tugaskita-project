import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ResponseDTO, SiswaType } from "@/app/_constant/global-types";
import SiswaService from "@/app/_services/siswa-service";
import useSWR from "swr";
import SiswaDialog from '../_components/siswa-dialog';

const useSiswa = () => {
  const {
    data: siswa,
    error: errorTasks,
    mutate: mutateTasks,
    isLoading: loadingTasks,
  } = useSWR<ResponseDTO<SiswaType[]>, Error>(['/admin-task'], () => SiswaService.getAllSiswa());

  const [openDialog, setOpenDialog] = useState(null);

  const router = useRouter();

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState(null);

  const handleDetailClick = (siswa) => {
    setSelectedSiswa(siswa);
    setIsDetailDialogOpen(true);
  };

  const columns = [
    { key: 'name', header: 'Nama Siswa', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'point', header: 'Total Point', sortable: true },
    {
      key: 'actions',
      header: 'Aksi',
      render: (siswa) => (
        <>
          <SiswaDialog siswa={siswa} openDialog={openDialog} setOpenDialog={setOpenDialog} />
          <Button variant="ghost" size="sm" onClick={() => router.push(`/siswa/${siswa.id}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      ),
    },
  ];

  return {
    siswa : siswa?.data,
    loadingTasks,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedSiswa,
    columns,
    handleDetailClick,
    openDialog,
    setOpenDialog,
  };
};

export default useSiswa;
