import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { Pencil } from 'lucide-react';
import Image from 'next/image';

const PenukaranRewardDialog = ({ reward, openDialog, setOpenDialog }) => {
  if (!reward) return null; // Ensure reward is not null before rendering

  return (
    <Dialog open={openDialog === reward.id} onOpenChange={(open) => setOpenDialog(open ? reward.id : null)}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-blue-100" size="sm">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Image src="/assets/images/dialog-header.png" alt="Dialog Header" width={32} height={36} />
          <DialogTitle>{reward.rewardName}</DialogTitle>
          <div
            className={`rounded-xl py-2 px-3 font-semibold ${
              reward.status === 'Diterima'
                ? 'bg-green-400 text-green-800'
                : reward.status === 'Perlu Review'
                ? 'bg-yellow-400 text-yellow-800'
                : reward.status === 'Ditolak'
                ? 'bg-red-400 text-red-800'
                : 'bg-gray-400'
            }`}
          >
            {reward.status}
          </div>
        </DialogHeader>
        <div className="mt-4">
          <div>
            <p className="text-base/8">
              <strong>Nama Siswa : </strong>
              <span className="font-light">{reward.studentName}</span>
            </p>
            <p className="text-base/8 mt-2">
              <strong>Tanggal Pengajuan : </strong>
              <span className="font-light">{reward.date}</span>
            </p>
            <p className="text-base/8 mt-2">
              <strong>Harga Item : </strong>
              <span className="font-light">{reward.hargaItem}</span>
            </p>
            <p className="text-base/8 mt-2">
              <strong>Harga Item : </strong>
              <span className="font-light">{reward.totalPoints}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-x-6 justify-end mt-6">
          <button className="py-2 px-6 bg-red-500 rounded hover:cursor-pointer hover:opacity-75">Tolak</button>
          <button className="py-2 px-6 bg-green-500 rounded hover:cursor-pointer hover:opacity-75">Terima</button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PenukaranRewardDialog;
