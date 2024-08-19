import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

const DetailReligionTaskDialog = ({ task, openDialog, setOpenDialog }) => {
  return (
    <Dialog open={openDialog === task.id} onOpenChange={(open) => setOpenDialog(open ? task.id : null)}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-blue-100" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1E4395] border-none text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">{task.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm font-semibold">Agama:</p>
            <p className="text-lg">{task.religion}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Point:</p>
            <p className="text-lg">{task.point}</p>
          </div>
          {task.description && (
            <div>
              <p className="text-sm font-semibold">Deskripsi:</p>
              <p className="text-base">{task.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailReligionTaskDialog;