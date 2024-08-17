import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Image from "next/image";

const TinjauTugasDialog = ({ task, openDialog, setOpenDialog }) => {
  if (!task) return null;

  return (
    <Dialog
      open={openDialog === task.id}
      onOpenChange={(open) => setOpenDialog(open ? task.id : null)}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-blue-100" size="sm">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[90vw] md:max-w-[80vw] lg:max-w-[60vw] xl:max-w-[50vw]">
        <DialogHeader className="flex flex-col sm:flex-row items-center">
          <div className="flex items-center">
            <Image
              src="/assets/images/dialog-header.png"
              alt="Dialog Header"
              width={32}
              height={36}
            />
            <DialogTitle className="ml-2">{task.title}</DialogTitle>
          </div>
          <div
            className={`mt-2 sm:mt-0 rounded-xl py-2 px-3 font-semibold text-sm ${
              task.status === "Diterima"
                ? "bg-green-400 text-green-800"
                : task.status === "Perlu Review"
                ? "bg-yellow-400 text-yellow-800"
                : task.status === "Ditolak"
                ? "bg-red-400 text-red-800"
                : "bg-gray-400"
            }`}
          >
            {task.status}
          </div>
        </DialogHeader>
        <div className="mt-4 flex flex-col md:flex-row gap-8">
          <Image
            src={task.image}
            alt="No pic found"
            width={400}
            height={300}
            className="w-full max-w-[400px] h-auto object-contain mx-auto"
          />
          <div className="flex-1">
            <p className="text-base/8">
              <strong>Nama Siswa : </strong>
              <span className="font-light">{task.user_name}</span>
            </p>
            <p className="text-base/8 mt-2">
              <strong>Tanggal Pengajuan : </strong>
              <span className="font-light">{task.formatted_date}</span>
            </p>
            <p className="text-base/8 mt-2">
              <strong>Keterangan Siswa : </strong> <br />
              <span className="text-sm font-light">{task.description}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-x-4 justify-end mt-6">
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            Tolak
          </Button>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            Terima
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TinjauTugasDialog;
