import PenukaranRewardDialog from "@/app/(auth-admin)/reward/penukaran-reward/_components/penukaran-reward-dialog";
import { RedeemRewardType, ResponseDTO, TugasType } from "@/app/_constant/global-types";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useState } from "react";
import RewardService from "@/app/_services/reward-service";

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

  const [openDialog, setOpenDialog] = useState(null);

  const columns = [
    { key: "UserName", header: "Nama Lengkap Siswa", sortable: true },
    { key: "RewardName", header: "Reward", sortable: true },
    { key: "Price", header: "Point Yang Dibutuhkan", sortable: true },
    { key: "Date", header: "Tanggal", sortable: true },
    {
      key: "Status",
      header: "Status",
      sortable: true,
      render: (reward) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold
          ${
            reward.Status === "Perlu Review"
              ? "bg-yellow-200 text-yellow-800"
              : reward.Status === "Done"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {reward.Status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Aksi",
      render: (reward) => <PenukaranRewardDialog reward={reward} openDialog={openDialog} setOpenDialog={setOpenDialog}/>,
    },
  ];

  const {
    data: rewards,
    error: errorTasks,
    mutate: mutateTasks,
    isLoading: loadingTasks,
  } = useSWR<ResponseDTO<RedeemRewardType[]>, Error>(["/admin-reward/user"], () =>
    RewardService.getRedeemReward()
  );

  const filteredData = rewards?.data.filter(
    (reward) =>
      reward?.UserName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || reward.Status === statusFilter)
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
    openDialog,
    setOpenDialog
  };
};
