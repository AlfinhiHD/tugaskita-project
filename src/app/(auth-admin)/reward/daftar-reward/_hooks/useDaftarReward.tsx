import DaftarRewardDialog from '../_components/daftar-reward-dialog';
import { ResponseDTO, RewardType } from "@/app/_constant/global-types";
import RewardService from "@/app/_services/reward-service";
import useSWR from "swr";
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { headers } from 'next/headers';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useDaftarReward = () => {
  const {
    data: rewards,
    error: errorTasks,
    mutate: mutateTasks,
    isLoading: loadingTasks,
  } = useSWR<ResponseDTO<RewardType[]>, Error>(["/admin-task"], () =>
    RewardService.getReward()
  );

  const [openDialog, setOpenDialog] = useState(null);

  const router = useRouter();

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  const handleDetailClick = (reward) => {
    setSelectedReward(reward);
    setIsDetailDialogOpen(true);
  };

  const columns = [
    { key: 'Name', header: 'Nama Reward', sortable: true },
    { key: 'Price', header: 'Harga (Poin)', sortable: true },
    { key: 'Stock', header: 'Stok Reward', sortable: true },
    {
      key: 'actions',
      header: 'Aksi',
      render: (reward) => (
        <>
          <DaftarRewardDialog reward={reward} openDialog={openDialog} setOpenDialog={setOpenDialog}/>
          <Button variant="ghost" size="sm" onClick={() => router.push(`/reward/daftar-reward/${reward?.Id}`)}>
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
    rewards : rewards?.data,
    loadingTasks,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedReward,
    columns,
    handleDetailClick,
  };
};

export default useDaftarReward;
