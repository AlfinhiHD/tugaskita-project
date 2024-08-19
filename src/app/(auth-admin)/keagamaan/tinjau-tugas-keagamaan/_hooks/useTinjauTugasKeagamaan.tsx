import { useEffect, useState, useMemo } from 'react';
import useSWR from 'swr';
import Swal from 'sweetalert2';
import KeagamaanService from '@/app/_services/keagamaan-service';
import { ResponseDTO, SubmitKeagamaanTaskType, RequestKeagamaanTaskType } from '@/app/_constant/global-types';
import TinjauTugasKeagamaanDialog from '../_components/tinjau-tugas-keagamaan-dialog';

export const useTinjauTugasKeagamaan = () => {
  const [activeTab, setActiveTab] = useState('Submit');
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [openDialog, setOpenDialog] = useState(null);
  const [formattedTinjauTugas, setFormattedTinjauTugas] = useState<(SubmitKeagamaanTaskType | RequestKeagamaanTaskType)[]>([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const formatDateForFilter = (dateString: string) => {
    return dateString.split('T')[0];
  };

  const {
    data: tasks,
    error: errorTasks,
    mutate: mutateTasks,
    isLoading: loadingTasks,
  } = useSWR<ResponseDTO<(SubmitKeagamaanTaskType | RequestKeagamaanTaskType)[]>, Error>(
    ['/admin-task/religion/user', '/admin-task/religion/user-req'],
    () => Promise.all([
      KeagamaanService.getAllUserSubmitReligionTugas(),
      KeagamaanService.getAllUserReqReligionTugas()
    ]).then(([submitTasks, requestTasks]) => ({
      data: [...submitTasks.data, ...requestTasks.data]
    }))
  );

  useEffect(() => {
    if (errorTasks) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error loading data. Please refresh the page and check your internet connection.',
      });
    }
  }, [errorTasks]);

  useEffect(() => {
    if (tasks?.data) {
      setFormattedTinjauTugas(tasks.data.map(task => ({
        ...task,
        created_at: task.created_at,
        formatted_date: formatDate(task.created_at),
        date_for_filter: formatDateForFilter(task.created_at)
      })));
    }
  }, [tasks]);

  const filteredData = useMemo(() => {
    return formattedTinjauTugas.filter(
      (task) =>
        (task.username?.toLowerCase().includes(searchTerm.toLowerCase()) || task.user_name?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "all" || task.status === statusFilter) &&
        (dateFilter === "" || task.date_for_filter === dateFilter) &&
        (activeTab === "Submit" ? 'task_name' in task : 'title' in task)
    );
  }, [formattedTinjauTugas, searchTerm, statusFilter, dateFilter, activeTab]);

  const columns = useMemo(() => [
    { 
      key: 'user_name', 
      header: 'Nama Lengkap Siswa', 
      sortable: true,
      render: (task: SubmitKeagamaanTaskType | RequestKeagamaanTaskType) => 'username' in task ? task.username : task.user_name
    },
    { 
      key: 'title', 
      header: 'Task', 
      sortable: true,
      render: (task: SubmitKeagamaanTaskType | RequestKeagamaanTaskType) => 'task_name' in task ? task.task_name : task.title
    },
    { 
      key: 'point', 
      header: 'Point', 
      sortable: true,
      render: (task: SubmitKeagamaanTaskType | RequestKeagamaanTaskType) => 'point' in task ? task.point : '-'
    },
    { 
      key: 'created_at', 
      header: 'Tanggal', 
      sortable: true,
      render: (task: SubmitKeagamaanTaskType | RequestKeagamaanTaskType) => formatDate(task.created_at)
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (task: SubmitKeagamaanTaskType | RequestKeagamaanTaskType) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap
          ${
            task.status === 'Perlu Review'
              ? 'bg-yellow-200 text-yellow-800'
              : task.status === 'Diterima'
              ? 'bg-green-200 text-green-800'
              : 'bg-red-200 text-red-800'
          }`}
        >
          {task.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Aksi',
      render: (task: SubmitKeagamaanTaskType | RequestKeagamaanTaskType) => (
        <TinjauTugasKeagamaanDialog task={task} openDialog={openDialog} setOpenDialog={setOpenDialog} />
      ),
    },
  ], [openDialog]);

  const handleDetailClick = (task) => {
    setSelectedTask(task);
    setIsDetailDialogOpen(true);
  };

  return {
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
    openDialog,
    setOpenDialog,
    handleDetailClick,
    columns,
    filteredData,
    loadingTasks,
    errorTasks,
  };
};