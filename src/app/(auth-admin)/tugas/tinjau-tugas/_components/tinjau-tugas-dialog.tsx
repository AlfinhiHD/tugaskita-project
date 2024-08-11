import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { Pencil } from 'lucide-react';
import Image from 'next/image';

const TinjauTugasDialog = ({ task, openDialog, setOpenDialog }) => {
  if (!task) return null;

  const formattedDate = isNaN(new Date(task.CreatedAt).getTime())
    ? 'Tanggal tidak valid'
    : new Date(task.CreatedAt).toISOString().split('T')[0];

  return (
    <Dialog open={openDialog === task.id} onOpenChange={(open) => setOpenDialog(open ? task.id : null)}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-blue-100" size="sm">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[50%]">
        <DialogHeader>
          <Image src="/assets/images/dialog-header.png" alt="Dialog Header" width={32} height={36} />
          <DialogTitle>{task.Title}</DialogTitle>
          <div
            className={`rounded-xl py-2 px-3 font-semibold ${
              task.Status === 'Diterima'
                ? 'bg-green-400 text-green-800'
                : task.Status === 'Perlu Review'
                ? 'bg-yellow-400 text-yellow-800'
                : task.Status === 'Ditolak'
                ? 'bg-red-400 text-red-800'
                : 'bg-gray-400'
            }`}
          >
            {task.Status}
          </div>
        </DialogHeader>
        <div className="mt-4 flex gap-8">
          <Image
            src={task.Image}
            alt="No pic found"
            width={140}
            height={100}
            className="w-full max-w-[400px] h-auto object-contain mx-auto"
          ></Image>
          <div>
            <p className="text-base/8">
              <strong>Nama Siswa : </strong>
              <span className="font-light">{task.UserName}</span>
            </p>
            <p className="text-base/8 mt-2">
              <strong>Tanggal Pengajuan : </strong>
              <span className="font-light">{formattedDate}</span>
            </p>
            <p className="text-base/8 mt-2">
              <strong>Keterangan Siswa : </strong> <br />
              <span className="text-sm font-light">{task.Description}</span>
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

export default TinjauTugasDialog;
