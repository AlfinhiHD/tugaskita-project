import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { Eye } from 'lucide-react';
import Image from 'next/image';

const TaskDialog = ({ task, openDialog, setOpenDialog }) => {
  if (!task) return null; // Ensure task is not null before rendering

  return (
    <Dialog open={openDialog === task.id} onOpenChange={(open) => setOpenDialog(open ? task.id : null)}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-blue-100" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <Image src="/assets/images/dialog-header.png" alt="Dialog Header" width={32} height={36} />
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {/* <p className="text-base">
            <strong>Description:</strong> <br />
            <span className="text-sm font-light">{task.description}</span>
          </p> */}
          <p className="text-base mt-2">
            <strong>Points:</strong> {task.point}
          </p>
          <div className="flex justify-between mt-8">
            <p className="text-base">
              <strong>Tanggal Mulai:</strong> {task.startDate}
            </p>
            <p className="text-base">
              <strong>Tanggal Berakhir:</strong> {task.endDate}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
