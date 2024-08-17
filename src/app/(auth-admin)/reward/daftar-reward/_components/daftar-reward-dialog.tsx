import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import Image from 'next/image';

const DaftarRewardDialog = ({ reward, openDialog, setOpenDialog }) => {
  if (!reward) return null;

  return (
    <Dialog open={openDialog === reward.id} onOpenChange={(open) => setOpenDialog(open ? reward.id : null)}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-blue-100" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[30%] pb-12">
        <DialogHeader>
          <Image src="/assets/images/dialog-header.png" alt="Dialog Header" width={32} height={36} />
          <DialogTitle>Detail Reward</DialogTitle>
        </DialogHeader>
        <div className="mt-8 flex gap-8">
          <Image
            src={reward.image}
            alt="No pic found"
            width={70}
            height={70}
            className="w-3/5 h-auto object-contain rounded-2xl"
          ></Image>
          <div>
            <p className="text-xl/10">
              <strong>{reward.name}</strong>
            </p>
            <p className="text-base/8 mt-2">
              <strong>Poin : </strong>
              <span className="font-light">{reward.price}</span>
            </p>
            <p className="text-base/8 mt-2">
              <strong>Stok : </strong>
              <span className="font-light">{reward.stock}</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DaftarRewardDialog;
