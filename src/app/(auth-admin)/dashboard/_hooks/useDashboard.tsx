// hooks/useDashboard.js
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const useDashboard = () => {
  const [openDialog, setOpenDialog] = useState(null);

  const todaysTasks = [
    {
      id: 1,
      title: "Matematika: Persamaan Kuadrat 1",
      points: 100,
      description: "Selesaikan 10 soal persamaan kuadrat",
    },
    {
      id: 2,
      title: "Matematika: Persamaan Kuadrat 2",
      points: 200,
      description: "Selesaikan 10 soal persamaan kuadrat",
    },
    {
      id: 3,
      title: "Matematika: Persamaan Kuadrat 3",
      points: 150,
      description: "Selesaikan 10 soal persamaan kuadrat",
    },
  ];

  const topStudents = [
    { id: 1, name: "Andi Pratama", points: 1250, avatar: "/avatars/andi.png" },
    { id: 2, name: "Andi Pratama", points: 1250, avatar: "/avatars/andi.png" },
    { id: 3, name: "Andi Pratama", points: 1250, avatar: "/avatars/andi.png" },
    { id: 4, name: "Andi Pratama", points: 1250, avatar: "/avatars/andi.png" },
    { id: 5, name: "Andi Pratama", points: 1250, avatar: "/avatars/andi.png" },
  ];

  const columns = [
    { key: "id", header: "No", sortable: true },
    { key: "title", header: "Task Name", sortable: true },
    { key: "points", header: "Point", sortable: true },
    {
      key: "actions",
      header: "Detail",
      render: (task) => (
        <Dialog
          open={openDialog === task.id}
          onOpenChange={(open) => setOpenDialog(open ? task.id : null)}
        >
          <DialogTrigger asChild>
            <Button variant="ghost" className="hover:bg-blue-100" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{task.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p>
                <strong>Points:</strong> {task.points}
              </p>
              <p>
                <strong>Description:</strong> {task.description}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
  ];

  return {
    openDialog,
    setOpenDialog,
    todaysTasks,
    topStudents,
    columns,
  };
};

export default useDashboard;
