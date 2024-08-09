// hooks/useDashboard.js
import { useState } from 'react';
import TaskDialog from '../../../_components/task-dialog';

const useDashboard = () => {
  const [openDialog, setOpenDialog] = useState(null);

  const todaysTasks = [
    {
      id: 1,
      title: 'Matematika: Persamaan Kuadrat 1',
      points: 100,
      description: 'Selesaikan 10 soal persamaan kuadrat',
    },
    {
      id: 2,
      title: 'Matematika: Persamaan Kuadrat 2',
      points: 200,
      description: 'Selesaikan 10 soal persamaan kuadrat',
    },
    {
      id: 3,
      title: 'Matematika: Persamaan Kuadrat 3',
      points: 150,
      description: 'Selesaikan 10 soal persamaan kuadrat',
    },
  ];

  const topStudents = [
    { id: 1, name: 'Andi Pratama', points: 1250, avatar: '/avatars/andi.png' },
    { id: 2, name: 'Andi Pratama', points: 1250, avatar: '/avatars/andi.png' },
    { id: 3, name: 'Andi Pratama', points: 1250, avatar: '/avatars/andi.png' },
    { id: 4, name: 'Andi Pratama', points: 1250, avatar: '/avatars/andi.png' },
    { id: 5, name: 'Andi Pratama', points: 1250, avatar: '/avatars/andi.png' },
  ];

  const columns = [
    { key: 'id', header: 'No', sortable: true },
    { key: 'title', header: 'Task Name', sortable: true },
    { key: 'points', header: 'Point', sortable: true },
    {
      key: 'actions',
      header: 'Detail',
      render: (task) => <TaskDialog task={task} openDialog={openDialog} setOpenDialog={setOpenDialog} />,
    },
  ];

  return {
    todaysTasks,
    topStudents,
    columns,
  };
};

export default useDashboard;
