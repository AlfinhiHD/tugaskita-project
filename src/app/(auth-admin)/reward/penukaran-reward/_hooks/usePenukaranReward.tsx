import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useState } from "react";

export const usePenukaranReward = () => {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const handleDetailClick = (reward) => {
    setSelectedReward(reward);
    setIsDetailDialogOpen(true);
  };

  const columns = [
    { key: "studentName", header: "Nama Lengkap Siswa", sortable: true },
    { key: "rewardName", header: "Reward", sortable: true },
    { key: "hargaItem", header: "Point Yang Dibutuhkan", sortable: true },
    { key: "date", header: "Tanggal", sortable: true },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (reward) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold
          ${
            reward.status === "Perlu Review"
              ? "bg-yellow-200 text-yellow-800"
              : reward.status === "Diterima"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {reward.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Aksi",
      render: (reward) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDetailClick(reward)}
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
      rewardName: "Penghapus",
      totalPoints: 10000,
      hargaItem: 500,
      date: "2023-08-15",
      status: "Perlu Review",
    },
    {
      id: 2,
      studentName: "John Doe",
      rewardName: "Penghapus",
      totalPoints: 10000,
      hargaItem: 500,
      date: "2023-08-15",
      status: "Diterima",
    },
    {
      id: 3,
      studentName: "John Doe",
      rewardName: "Penghapus",
      totalPoints: 10000,
      hargaItem: 500,
      date: "2023-08-15",
      status: "Ditolak",
    },
    {
      id: 4,
      studentName: "John Doe",
      rewardName: "Penghapus",
      totalPoints: 10000,
      hargaItem: 500,
      date: "2023-08-15",
      status: "Perlu Review",
    },
    {
      id: 5,
      studentName: "John Doe",
      rewardName: "Penghapus",
      totalPoints: 10000,
      hargaItem: 500,
      date: "2023-08-15",
      status: "Perlu Review",
    },
  ];

  const filteredData = dummyData.filter(
    (reward) =>
      reward.studentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || reward.status === statusFilter) &&
      (dateFilter === "" || reward.date === dateFilter)
  );

  return {
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedReward,
    setSelectedReward,
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
