'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import MainTable from '@/app/_components/main-table';
import useDaftarTugas from '../_hooks/useDaftarTugas';
import TaskDialog from '@/app/_components/task-dialog';
import { useRouter } from 'next/navigation';

const TaskList = () => {
  const router = useRouter();   
  const { todaysTasks, columns } = useDaftarTugas();

  return (
    <div className="p-8">
      <div className="flex flex-col justify-between mb-4 mt-14 gap-y-4 lg:mt-0 lg:flex-row lg:mb-6">
        <h1 className="text-3xl font-bold">Daftar Tugas</h1>
        <Button onClick={() => router.push('/tugas/daftar-tugas/form')}>
          <Plus className="h-5 w-5 mr-2" />
          Tambah Tugas Baru
        </Button>
      </div>

      <MainTable columns={columns} data={todaysTasks} searchable={true} itemsPerPage={10} />
    </div>
  );
};

export default TaskList;
