import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import Image from 'next/image';

const SiswaDialog = ({ siswa, openDialog, setOpenDialog }) => {
  if (!siswa) return null;

  return (
    <Dialog open={openDialog === siswa.id} onOpenChange={(open) => setOpenDialog(open ? siswa.id : null)}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-blue-100" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[40%] pb-12">
        <DialogHeader>
          <Image src="/assets/images/dialog-header.png" alt="Dialog Header" width={32} height={36} />
          <DialogTitle>{siswa.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-8 flex gap-8">
          <Image
            src="/assets/images/default-image.jpg"
            alt="No pic found"
            width={70}
            height={70}
            className="w-1/2 h-auto object-contain"
          ></Image>
          <div>
            <p className="text-base/8 mt-2">
              <strong>Email : </strong>
              <span className="font-light">{siswa.email}</span>
            </p>
            <p className="text-base/8 mt-2">
              <strong>Total Poin : </strong>
              <span className="font-light">{siswa.totalPoints}</span>
            </p>
            <p className="text-base/8 mt-2">
              <strong>Tugas Diselesaikan : </strong>
              <span className="font-light">{siswa.tugasSelesai}</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SiswaDialog;
