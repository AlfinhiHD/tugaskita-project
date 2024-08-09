import DaftarRewardDialog from '../_components/daftar-reward-dialog';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { headers } from 'next/headers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const useDaftarReward = () => {
  const [rewards] = useState([
    {
      id: 1,
      name: 'Reward 1',
      stok: 15,
      image: '/assets/images/default-image.jpg',
      points: 10,
    },
    {
      id: 2,
      name: 'Reward 1',
      stok: 15,
      image: '/assets/images/default-image.jpg',
      points: 10,
    },
    {
      id: 3,
      name: 'Reward 1',
      stok: 15,
      image: '/assets/images/default-image.jpg',
      points: 10,
    },
    {
      id: 4,
      name: 'Reward 1',
      stok: 15,
      image: '/assets/images/default-image.jpg',
      points: 10,
    },
    {
      id: 5,
      name: 'Reward 1',
      stok: 15,
      image: '/assets/images/default-image.jpg',
      points: 10,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(null);

  const router = useRouter();

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  const handleDetailClick = (reward) => {
    setSelectedReward(reward);
    setIsDetailDialogOpen(true);
  };

  const columns = [
    { key: 'name', header: 'Nama Reward', sortable: true },
    { key: 'points', header: 'Point', sortable: true },
    { key: 'stok', header: 'Stok Reward', sortable: true },
    {
      key: 'actions',
      header: 'Aksi',
      render: (reward) => (
        <>
          <DaftarRewardDialog reward={reward} openDialog={openDialog} setOpenDialog={setOpenDialog}/>
          <Button variant="ghost" size="sm" onClick={() => router.push(`/reward/daftar-reward/${reward.rewardId}`)}>
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
    rewards,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedReward,
    columns,
    handleDetailClick,
  };
};

export default useDaftarReward;
