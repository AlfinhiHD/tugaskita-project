import {
  PelanggaranType,
  ResponseDTO,
  TugasType,
} from "@/app/_constant/global-types";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import PelanggaranService from "@/app/_services/pelanggaran-service";
import { useRouter } from "next/navigation";
import PelanggaranDialog from "../_components/palanggaran-dialog";

export const usePelanggaran = () => {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(null);
  const [formattedPelanggaran, setFormattedPelanggaran] = useState<
    PelanggaranType[]
  >([]);

  const handleDetailClick = (reward) => {
    setSelectedReward(reward);
    setIsDetailDialogOpen(true);
  };

  const handleDeleteClick = async (pelanggaranId) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data pelanggaran yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus data pelanggaran!',
      cancelButtonText: 'Tidak, Batalkan!',
    });

    if (result.isConfirmed) {
      try {
        await PelanggaranService.deletePelanggaran(pelanggaranId);
        mutatePelanggaran();
        Swal.fire('Berhasil!', 'Data pelanggaran berhasil dihapus dengan sukses.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Terjadi kesalahan saat menghapus data siswa.', 'error');
      }
    }
  };

  const router = useRouter();

  const {
    data: pelanggaran,
    error: errorPelanggaran,
    mutate: mutatePelanggaran,
    isLoading: loadingPelanggaran,
  } = useSWR<ResponseDTO<PelanggaranType[]>, Error>(["admin-penalty"], () =>
    PelanggaranService.getPelanggaran()
  );

  useEffect(() => {
    if (errorPelanggaran) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error loading data. Please refresh the page and check your internet connection.",
      });
    }
  }, [errorPelanggaran]);

  const filteredData = useMemo(() => {
    return pelanggaran?.data?.filter(
      (reward) =>
        reward?.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (dateFilter === "" || reward.date === dateFilter)
    );
  }, [pelanggaran?.data, searchTerm, dateFilter]);

  const columns = [
    { key: "user_name", header: "Nama Lengkap Siswa", sortable: true },
    { key: "point", header: "Pengurangan Poin", sortable: true },
    {
      key: "date",
      header: "Tanggal Pelanggaran",
      sortable: true,
    },
    {
      key: "actions",
      header: "Aksi",
      render: (pelanggaran) => (
        <>
          <PelanggaranDialog
            pelanggaran={pelanggaran}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/pelanggaran/${pelanggaran?.id}`)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDeleteClick(pelanggaran?.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      ),
    },
  ];

  return {
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedReward,
    setSelectedReward,
    searchTerm,
    setSearchTerm,
    dateFilter,
    setDateFilter,
    handleDetailClick,
    columns,
    filteredData,
    openDialog,
    setOpenDialog,
    loadingPelanggaran,
    errorPelanggaran,
  };
};
