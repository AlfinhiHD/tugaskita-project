import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useDaftarTugas = () => {
  const [tasks] = useState([
    {
      id: 1,
      name: "Task 1",
      startDate: "2023-08-01",
      endDate: "2023-08-15",
      points: 10,
    },
    {
      id: 2,
      name: "Task 2",
      startDate: "2023-08-05",
      endDate: "2023-08-20",
      points: 15,
    },
    {
      id: 3,
      name: "Task 3",
      startDate: "2023-08-05",
      endDate: "2023-08-20",
      points: 15,
    },
    {
      id: 4,
      name: "Task 4",
      startDate: "2023-08-05",
      endDate: "2023-08-20",
      points: 15,
    },
    {
      id: 5,
      name: "Task 5",
      startDate: "2023-08-05",
      endDate: "2023-08-20",
      points: 15,
    },
    {
      id: 6,
      name: "Task 1",
      startDate: "2023-08-01",
      endDate: "2023-08-15",
      points: 10,
    },
    {
      id: 7,
      name: "Task 2",
      startDate: "2023-08-05",
      endDate: "2023-08-20",
      points: 15,
    },
    {
      id: 8,
      name: "Task 3",
      startDate: "2023-08-05",
      endDate: "2023-08-20",
      points: 15,
    },
    {
      id: 9,
      name: "Task 4",
      startDate: "2023-08-05",
      endDate: "2023-08-20",
      points: 15,
    },
    {
      id: 10,
      name: "Task 5",
      startDate: "2023-08-05",
      endDate: "2023-08-20",
      points: 15,
    },
    {
      id: 1111,
      name: "Task 1",
      startDate: "2023-08-01",
      endDate: "2023-08-15",
      points: 10,
    },
    {
      id: 2213,
      name: "Task 2",
      startDate: "2023-08-05",
      endDate: "2023-08-20",
      points: 15,
    },
    {
      id: 3123,
      name: "Task 3",
      startDate: "2023-08-05",
      endDate: "2023-08-20",
      points: 15,
    },
    {
      id: 421312,
      name: "Task 4",
      startDate: "2023-08-05",
      endDate: "2023-08-20",
      points: 15,
    },
    {
      id: 512321,
      name: "Task 5",
      startDate: "2023-08-05",
      endDate: "2023-08-20",
      points: 15,
    },
    // Add more tasks here to test pagination
  ]);

  const router = useRouter()

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDetailClick = (task) => {
    setSelectedTask(task);
    setIsDetailDialogOpen(true);
  };

  const columns = [
    { key: "name", header: "Nama Task", sortable: true },
    { key: "startDate", header: "Tanggal Mulai", sortable: true },
    { key: "endDate", header: "Tanggal Berakhir", sortable: true },
    { key: "points", header: "Point", sortable: true },
    {
      key: "actions",
      header: "Aksi",
      render: (task) => (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDetailClick(task)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => router.push(`/tasks/${task.taskId}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      ),
    },
  ];

  return {
    tasks,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedTask,
    columns,
    handleDetailClick,
  };
};

export default useDaftarTugas;
