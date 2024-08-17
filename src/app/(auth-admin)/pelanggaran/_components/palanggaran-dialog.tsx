import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { format } from 'date-fns';

const PelanggaranDialog = ({ pelanggaran, openDialog, setOpenDialog }) => {
  if (!pelanggaran) return null;

  return (
    <Dialog open={openDialog === pelanggaran.id} onOpenChange={(open) => setOpenDialog(open ? pelanggaran.id : null)}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-blue-100" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[500px] pb-12 sm:w-[80vw]">
        <DialogHeader className="flex flex-row">
          <img src="/assets/images/dialog-header.png" alt="Dialog Header" width={32} height={36} />
          <DialogTitle className="text-center mt-2">Detail Pelanggaran</DialogTitle>
        </DialogHeader>
        <div className="mt-8 flex flex-col gap-4">
          <p className="text-sm sm:text-base">
            <strong>Nama Siswa: </strong>
            <span className="font-light">{pelanggaran.user_name}</span>
          </p>
          <p className="text-sm sm:text-base">
            <strong>Point: </strong>
            <span className="font-light">{pelanggaran.point}</span>
          </p>
          <p className="text-sm sm:text-base">
            <strong>Deskripsi: </strong>
            <span className="font-light">{pelanggaran.description}</span>
          </p>
          <p className="text-sm sm:text-base">
            <strong>Tanggal: </strong>
            <span className="font-light">{format(new Date(pelanggaran.date), 'dd MMMM yyyy')}</span>
          </p>
          <p className="text-sm sm:text-base">
            <strong>Dibuat pada: </strong>
            <span className="font-light">{format(new Date(pelanggaran.created_at), 'dd MMMM yyyy HH:mm:ss')}</span>
          </p>
          <p className="text-sm sm:text-base">
            <strong>Diperbarui pada: </strong>
            <span className="font-light">{format(new Date(pelanggaran.updated_at), 'dd MMMM yyyy HH:mm:ss')}</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PelanggaranDialog;