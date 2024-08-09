import React from 'react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { Eye } from 'lucide-react';
import Image from 'next/image';

const DaftarTugasDialog = ({ task, openDialog, setOpenDialog }) => {
  return (
    <Dialog open={openDialog ? task.id : null} onOpenChange={(open) => setOpenDialog(open ? task.id : null)}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-blue-100" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <Image src="/assets/images/dialog-header.png" alt="Dialog Header" className="" width={32} height={36} />
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-base/[32px]">
            <strong>Description:</strong> <br></br> <span className="text-sm/[20px] font-light">{task.description}</span>
          </p>
          <p className="text-base/[32px]">
            <strong>Points:</strong> {task.points}
          </p>
          <div className="flex text-justify justify-between mt-8">
            <p className="text-base">
              <strong>Tanggal Mulai:</strong> {task.points}
            </p>
            <p className="text-base">
              <strong>Tanggal Berakhir:</strong> {task.points}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DaftarTugasDialog;
