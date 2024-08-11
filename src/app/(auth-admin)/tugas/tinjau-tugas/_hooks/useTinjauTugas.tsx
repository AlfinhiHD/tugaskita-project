import TinjauTugasDialog from '@/app/(auth-admin)/tugas/tinjau-tugas/_components/tinjau-tugas-dialog';
import { ResponseDTO, TinjauTugasType } from '@/app/_constant/global-types';
import TugasService from '@/app/_services/tugas-service';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useState } from 'react';

export const useTinjauTugas = () => {
  const [activeTab, setActiveTab] = useState('Submission');
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const handleDetailClick = (task) => {
    setSelectedTask(task);
    setIsDetailDialogOpen(true);
  };

  const [openDialog, setOpenDialog] = useState(null);

  const columns = [
    { key: 'UserName', header: 'Nama Lengkap Siswa', sortable: true },
    { key: 'Title', header: 'Task', sortable: true },
    { key: 'Point', header: 'Point', sortable: true },
    { key: 'date', header: 'Tanggal', sortable: true },
    {
      key: 'Status',
      header: 'Status',
      sortable: true,
      render: (task: TinjauTugasType) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold
          ${
            task.Status === 'Perlu Review'
              ? 'bg-yellow-200 text-yellow-800'
              : task.Status === 'Diterima'
              ? 'bg-green-200 text-green-800'
              : 'bg-red-200 text-red-800'
          }`}
        >
          {task.Status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Aksi',
      render: (task: TinjauTugasType) => (
        <TinjauTugasDialog task={task} openDialog={openDialog} setOpenDialog={setOpenDialog} />
      ),
    },
  ];

  const {
    data: tasks,
    error: errorTasks,
    mutate: mutateTasks,
    isLoading: loadingTasks,
  } = useSWR<ResponseDTO<TinjauTugasType[]>, Error>(['/admin-task/user/request'], () => TugasService.getTinjauTugas());

  const filteredData = tasks?.data.filter(
    (task) =>
      task.UserName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || task.Status === statusFilter)
  );

  return {
    loadingTasks,
    activeTab,
    setActiveTab,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedTask,
    setSelectedTask,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    handleDetailClick,
    columns,
    filteredData,
    openDialog,
    setOpenDialog,
  };
};
