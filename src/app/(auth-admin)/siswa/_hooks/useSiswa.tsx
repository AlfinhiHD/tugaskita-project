import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ResponseDTO, SiswaType } from '@/app/_constant/global-types';
import SiswaService from '@/app/_services/siswa-service';
import useSWR from 'swr';
import SiswaDialog from '../_components/siswa-dialog';
import Swal from 'sweetalert2';
import { BASE_IMAGE_URL } from '@/app/_utils/axios.instance';

const useSiswa = () => {
  const {
    data: siswa,
    error: errorSiswa,
    mutate: mutateSiswa,
    isLoading: loadingSiswa,
  } = useSWR<ResponseDTO<SiswaType[]>, Error>(['/user/profile'], () => SiswaService.getAllSiswa());

  const [openDialog, setOpenDialog] = useState(null);
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    if(siswa) {
      const updatedDatas = siswa.data.map(user => ({
        ...user,
        image: `${BASE_IMAGE_URL}${user.image.replace('public/', '')}`
      }));

      console.log(updatedDatas)
      setUpdatedData(updatedDatas)
    }
  }, [siswa])

  const router = useRouter();

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState(null);

  const handleDetailClick = (siswa) => {
    setSelectedSiswa(siswa);
    setIsDetailDialogOpen(true);
  };

  useEffect(() => {
    if (errorSiswa) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error loading data. Please refresh the page and check your internet connection.",
      });
    }
  }, [errorSiswa]);

  const handleDeleteClick = async (siswaId) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data siswa yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus data siswa!',
      cancelButtonText: 'Tidak, Batalkan!',
    });

    if (result.isConfirmed) {
      try {
        await SiswaService.deleteSiswa(siswaId);
        mutateSiswa();
        Swal.fire('Berhasil!', 'Data siswa berhasil dihapus dengan sukses.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Terjadi kesalahan saat menghapus data siswa.', 'error');
      }
    }
  };

  const columns = [
    { key: 'name', header: 'Nama Siswa', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'point', header: 'Point Bulan Ini', sortable: true },
    { key: 'total_point', header: 'Total Point', sortable: true },
    {
      key: 'actions',
      header: 'Aksi',
      render: (siswa) => (
        <>
          <SiswaDialog siswa={siswa} openDialog={openDialog} setOpenDialog={setOpenDialog} />
          <Button variant="ghost" size="sm" onClick={() => router.push(`/siswa/${siswa.id}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(siswa.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      ),
    },
  ];

  return {
    siswa: updatedData,
    loadingSiswa,
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
