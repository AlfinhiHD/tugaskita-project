import TaskDialog from '@/app/_components/task-dialog';
import { ResponseDTO, TugasType } from '@/app/_constant/global-types';
import TugasService from '@/app/_services/tugas-service';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

const useDaftarTugas = () => {
  const {
    data: tasks,
    error: errorTasks,
    mutate: mutateTasks,
    isLoading: loadingTasks,
  } = useSWR<ResponseDTO<TugasType[]>, Error>(['/admin-task'], () => TugasService.getTugas());

  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDelete = async (taskId) => {
    const result = await Swal.fire({
      title: 'Apakah kamu yakin?',
      text: 'Tugas yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus tugas!',
      cancelButtonText: 'Tidak, Batalkan!',
    });

    if (result.isConfirmed) {
      try {
        await TugasService.deleteTugas(taskId);
        Swal.fire('Berhasil!', 'Tugas berhasil dihapus dengan sukses.', 'success');
        mutateTasks();
      } catch (error) {
        Swal.fire('Error!', 'Gagal menghapus tugas.', 'error');
      }
    }
  };

  const columns = [
    { key: 'title', header: 'Nama Task', sortable: true },
    { key: 'startDate', header: 'Tanggal Mulai', sortable: true },
    { key: 'endDate', header: 'Tanggal Berakhir', sortable: true },
    { key: 'point', header: 'Point', sortable: true },
    {
      key: 'actions',
      header: 'Aksi',
      render: (task) => (
        <>
          <TaskDialog task={task} openDialog={openDialog} setOpenDialog={setOpenDialog} />
          <Button variant="ghost" size="sm" onClick={() => router.push(`/tugas/daftar-tugas/${task.id}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(task.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      ),
    },
  ];

  return {
    todaysTasks: tasks?.data,
    columns,
    loadingTasks,
  };
};

export default useDaftarTugas;
