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
      <DialogContent className="w-[90vw] max-w-[500px] pb-12 sm:w-[80vw]">
        <DialogHeader className="flex flex-row">
          <Image src="/assets/images/dialog-header.png" alt="Dialog Header" width={32} height={36} />
          <DialogTitle className="text-center mt-2">{siswa.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-8 flex flex-col sm:flex-row gap-8">
          <div className="w-full sm:w-1/2 flex justify-center">
            <Image
              src={siswa.image ? siswa.image : "/assets/images/default-image.jpg"}
              alt="No pic found"
              width={140}
              height={140}
              className="w-auto h-auto max-w-full max-h-[140px] object-contain"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <p className="text-sm sm:text-base mt-2">
              <strong>Email : </strong>
              <span className="font-light break-all">{siswa.email}</span>
            </p>
            <p className="text-sm sm:text-base mt-2">
              <strong>Poin bulan ini : </strong>
              <span className="font-light">{siswa.point}</span>
            </p>
            <p className="text-sm sm:text-base mt-2">
              <strong>Total Poin : </strong>
              <span className="font-light">{siswa.total_point}</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SiswaDialog;