import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Image from "next/image";

const TaskDialog = ({ task, openDialog, setOpenDialog }) => {
  if (!task) return null;

  return (
    <Dialog
      open={openDialog === task.id}
      onOpenChange={(open) => setOpenDialog(open ? task.id : null)}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-blue-100" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg mx-auto p-4 sm:p-6">
        <DialogHeader className="flex flex-row">
          <Image
            src="/assets/images/dialog-header.png"
            alt="Dialog Header"
            width={32}
            height={36}
            className="mb-2"
          />
          <DialogTitle className="text-lg sm:text-xl">
            {task.title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="text-base font-semibold mb-1">Description:</h3>
            <p className="text-sm sm:text-base font-light">
              {task.description}
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-1">Points:</h3>
            <p className="text-sm sm:text-base">{task.point}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
            <div>
              <h3 className="text-base font-semibold mb-1">Tanggal Mulai:</h3>
              <p className="text-sm sm:text-base">{task.startDate}</p>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-1">
                Tanggal Berakhir:
              </h3>
              <p className="text-sm sm:text-base">{task.endDate}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
