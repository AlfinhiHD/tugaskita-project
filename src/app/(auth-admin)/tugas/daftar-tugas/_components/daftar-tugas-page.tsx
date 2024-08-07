"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import MainTable from "@/app/_components/main-table";
import useDaftarTugas from "../_hooks/useDaftarTugas";
import { useRouter } from "next/navigation";

const TaskList = () => {

  const router = useRouter()

  const {
    tasks,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedTask,
    columns,
  } = useDaftarTugas();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daftar Tugas</h1>
        <Button onClick={() => router.push('/tugas/daftar-tugas/form')}>
          <Plus className="h-5 w-5 mr-2" />
          Tambah Tugas Baru
        </Button>
      </div>

      <MainTable
        columns={columns}
        data={tasks}
        searchable={true}
        itemsPerPage={10}
      />

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Tugas</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div>
              <p>
                <strong>Nama:</strong> {selectedTask.name}
              </p>
              <p>
                <strong>Tanggal Mulai:</strong> {selectedTask.startDate}
              </p>
              <p>
                <strong>Tanggal Berakhir:</strong> {selectedTask.endDate}
              </p>
              <p>
                <strong>Point:</strong> {selectedTask.points}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskList;