'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import MainTable from '@/app/_components/main-table';
import useDaftarTugas from '../_hooks/useDaftarTugas';
import { useRouter } from 'next/navigation';
import { TaskListSkeleton } from '@/app/_components/skeletons';


const TaskList = () => {
  const router = useRouter();   
  const { todaysTasks, columns, loadingTasks, isDeleting } = useDaftarTugas();

  return (
    <div className="space-y-6 page-wrapper">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Daftar Tugas</h1>
        <Button onClick={() => router.push('/tugas/daftar-tugas/form')} disabled={isDeleting}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Tugas Baru
        </Button>
      </div>

      {loadingTasks || isDeleting ? (
        <TaskListSkeleton />
      ) : (
        <MainTable
          columns={columns}
          data={todaysTasks}
          searchable={true}
          itemsPerPage={10}
        />
      )}
    </div>
  );
};

export default TaskList;