import DaftarRewardDialog from '../_components/daftar-reward-dialog';
import { ResponseDTO, RewardType } from "@/app/_constant/global-types";
import RewardService from "@/app/_services/reward-service";
import useSWR from "swr";
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const useDaftarReward = () => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  const {
    data: rewards,
    error: errorRewards,
    mutate: mutateRewards,
    isLoading: loadingRewards,
  } = useSWR<ResponseDTO<RewardType[]>, Error>(["/admin-task"], () =>
    RewardService.getReward()
  );

  const handleDetailClick = (reward) => {
    setSelectedReward(reward);
    setIsDetailDialogOpen(true);
  };

  const handleDeleteClick = async (rewardId) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Reward yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus reward!',
      cancelButtonText: 'Tidak, Batalkan!'
    });

    if (result.isConfirmed) {
      try {
        await RewardService.deleteReward(rewardId);
        mutateRewards();
        Swal.fire('Berhasil!', 'Reward berhasil dihapus dengan sukses.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Terjadi kesalahan saat menghapus reward.', 'error');
      }
    }
  };

  useEffect(() => {
    if (errorRewards) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error loading data. Please refresh the page and check your internet connection.",
      });
    }
  }, [errorRewards]);


  const columns = [
    { key: 'name', header: 'Nama Reward', sortable: true },
    { key: 'price', header: 'Harga (Poin)', sortable: true },
    { key: 'stock', header: 'Stok Reward', sortable: true },
    {
      key: 'actions',
      header: 'Aksi',
      render: (reward) => (
        <>
          <DaftarRewardDialog reward={reward} openDialog={openDialog} setOpenDialog={setOpenDialog}/>
          <Button variant="ghost" size="sm" onClick={() => router.push(`/reward/daftar-reward/${reward?.id}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDeleteClick(reward.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      ),
    },
  ];

  return {
    rewards : rewards?.data,
    loadingRewards,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedReward,
    columns,
    handleDetailClick,
  };
};

export default useDaftarReward;
