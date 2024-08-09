import TaskDialog from '@/app/_components/task-dialog';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const useDaftarTugas = () => {
  const [tasks] = useState([
    {
      id: 1,
      title: 'Task 1',
      startDate: '2023-08-01',
      endDate: '2023-08-15',
      points: 10,
    },
    {
      id: 2,
      title: 'Task 2',
      startDate: '2023-08-05',
      endDate: '2023-08-20',
      points: 15,
    },
    {
      id: 3,
      title: 'Task 3',
      startDate: '2023-08-05',
      endDate: '2023-08-20',
      points: 15,
    },
    {
      id: 4,
      title: 'Task 4',
      startDate: '2023-08-05',
      endDate: '2023-08-20',
      points: 15,
    },
    {
      id: 5,
      title: 'Task 5',
      startDate: '2023-08-05',
      endDate: '2023-08-20',
      points: 15,
    },
    {
      id: 6,
      title: 'Task 1',
      startDate: '2023-08-01',
      endDate: '2023-08-15',
      points: 10,
    },
    {
      id: 7,
      title: 'Task 2',
      startDate: '2023-08-05',
      endDate: '2023-08-20',
      points: 15,
    },
    {
      id: 8,
      title: 'Task 3',
      startDate: '2023-08-05',
      endDate: '2023-08-20',
      points: 15,
    },
    {
      id: 9,
      title: 'Task 4',
      startDate: '2023-08-05',
      endDate: '2023-08-20',
      points: 15,
    },
    {
      id: 10,
      title: 'Task 5',
      startDate: '2023-08-05',
      endDate: '2023-08-20',
      points: 15,
    },
    {
      id: 1111,
      title: 'Task 1',
      startDate: '2023-08-01',
      endDate: '2023-08-15',
      points: 10,
    },
    {
      id: 2213,
      title: 'Task 2',
      startDate: '2023-08-05',
      endDate: '2023-08-20',
      points: 15,
    },
    {
      id: 3123,
      title: 'Tbsk 3',
      startDate: '2023-08-05',
      endDate: '2023-08-20',
      points: 14,
    },
    {
      id: 421312,
      title: 'Tzsk 4',
      startDate: '2023-08-05',
      endDate: '2023-08-20',
      points: 13,
    },
    {
      id: 512321,
      title: 'Task 5',
      startDate: '2023-08-05',
      endDate: '2023-08-20',
      points: 11,
    },
    // Add more tasks here to test pagination
  ]);

  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const columns = [
    { key: 'title', header: 'Nama Task', sortable: true },
    { key: 'startDate', header: 'Tanggal Mulai', sortable: true },
    { key: 'endDate', header: 'Tanggal Berakhir', sortable: true },
    { key: 'points', header: 'Point', sortable: true },
    {
      key: 'actions',
      header: 'Aksi',
      render: (task) => (
        <>
          <TaskDialog task={task} openDialog={openDialog} setOpenDialog={setOpenDialog} />
          <Button variant="ghost" size="sm" onClick={() => router.push(`/tasks/${task.taskId}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      ),
    },
  ];

  return {
    tasks,
    columns,
  };
};

export default useDaftarTugas;
