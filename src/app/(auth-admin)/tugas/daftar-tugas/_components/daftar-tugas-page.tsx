"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import MainTable from '@/app/_components/main-table';

const TaskList = () => {
  const [tasks] = useState([
    { id: 1, name: 'Task 1', startDate: '2023-08-01', endDate: '2023-08-15', points: 10 },
    { id: 2, name: 'Task 2', startDate: '2023-08-05', endDate: '2023-08-20', points: 15 },
    { id: 3, name: 'Task 3', startDate: '2023-08-05', endDate: '2023-08-20', points: 15 },
    { id: 4, name: 'Task 4', startDate: '2023-08-05', endDate: '2023-08-20', points: 15 },
    { id: 5, name: 'Task 5', startDate: '2023-08-05', endDate: '2023-08-20', points: 15 },
  ]);

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDetailClick = (task) => {
    setSelectedTask(task);
    setIsDetailDialogOpen(true);
  };

  const columns = [
    { key: 'id', header: 'No', sortable: true },
    { key: 'name', header: 'Nama Task', sortable: true },
    { key: 'startDate', header: 'Tanggal Mulai', sortable: true },
    { key: 'endDate', header: 'Tanggal Berakhir', sortable: true },
    { key: 'points', header: 'Point', sortable: true },
    {
      key: 'actions',
      header: 'Aksi',
      render: (task) => (
        <>
          <Button variant="ghost" size="sm" onClick={() => handleDetailClick(task)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Tugas</h1>
        <Button>
          <Plus className="h-5 w-5 mr-2" />
          Tambah Tugas Baru
        </Button>
      </div>

      <MainTable columns={columns} data={tasks} searchable={true} />

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Tugas</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div>
              <p><strong>Nama:</strong> {selectedTask.name}</p>
              <p><strong>Tanggal Mulai:</strong> {selectedTask.startDate}</p>
              <p><strong>Tanggal Berakhir:</strong> {selectedTask.endDate}</p>
              <p><strong>Point:</strong> {selectedTask.points}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskList;