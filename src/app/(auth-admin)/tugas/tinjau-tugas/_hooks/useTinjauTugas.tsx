import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useState } from "react";

export const useTinjauTugas = () => {
  const [activeTab, setActiveTab] = useState("submit");
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const handleDetailClick = (task) => {
    setSelectedTask(task);
    setIsDetailDialogOpen(true);
  };

  const columns = [
    { key: "studentName", header: "Nama Lengkap Siswa", sortable: true },
    { key: "taskName", header: "Task", sortable: true },
    { key: "points", header: "Point", sortable: true },
    { key: "date", header: "Tanggal", sortable: true },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (task) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold
          ${
            task.status === "Perlu Review"
              ? "bg-yellow-200 text-yellow-800"
              : task.status === "Diterima"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {task.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Aksi",
      render: (task) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDetailClick(task)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const dummyData = [
    {
      id: 1,
      studentName: "John Doe",
      taskName: "Tugas Matematika",
      points: 10,
      date: "2023-08-15",
      status: "Perlu Review",
      type: "submit",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      taskName: "Tugas Bahasa Inggris",
      points: 15,
      date: "2023-08-16",
      status: "Diterima",
      type: "submit",
    },
    {
      id: 3,
      studentName: "Alice Johnson",
      taskName: "Tugas Sejarah",
      points: 12,
      date: "2023-08-17",
      status: "Ditolak",
      type: "pengajuan",
    },
  ];

  const filteredData = dummyData.filter(
    (task) =>
      task.type === activeTab &&
      task.studentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || task.status === statusFilter) &&
      (dateFilter === "" || task.date === dateFilter)
  );

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
    handleDetailClick,
    columns,
    filteredData,
  };
};