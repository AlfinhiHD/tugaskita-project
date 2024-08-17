import PenukaranRewardDialog from "@/app/(auth-admin)/reward/penukaran-reward/_components/penukaran-reward-dialog";
import {
  RedeemRewardType,
  ResponseDTO,
  TugasType,
} from "@/app/_constant/global-types";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import RewardService from "@/app/_services/reward-service";
import Swal from "sweetalert2";

export const usePenukaranReward = () => {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(null);
  const [formattedTinjauTugas, setFormattedTinjauTugas] = useState<
    RedeemRewardType[]
  >([]);

  const handleDetailClick = (reward) => {
    setSelectedReward(reward);
    setIsDetailDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const formatDateForFilter = (dateString: string) => {
    return dateString.split("T")[0];
  };

  const {
    data: rewards,
    error: errorRewards,
    mutate: mutateRewards,
    isLoading: loadingRewards,
  } = useSWR<ResponseDTO<RedeemRewardType[]>, Error>(
    ["/admin-reward/user"],
    () => RewardService.getRedeemReward()
  );

  useEffect(() => {
    if (errorRewards) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error loading data. Please refresh the page and check your internet connection.",
      });
    }
  }, [errorRewards]);

  useEffect(() => {
    if (rewards?.data) {
      setFormattedTinjauTugas(
        rewards.data.map((reward) => ({
          ...reward,
          created_at: reward.created_at,
          formatted_date: formatDate(reward.created_at),
          date_for_filter: formatDateForFilter(reward.created_at),
        }))
      );
    }
  }, [rewards]);

  const filteredData = rewards?.data.filter(
    (reward) =>
      reward?.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || reward.status === statusFilter) &&
      (dateFilter === "" || reward.date_for_filter === dateFilter)
  );

  const columns = [
    { key: "user_name", header: "Nama Lengkap Siswa", sortable: true },
    { key: "reward_name", header: "Reward", sortable: true },
    { key: "amount", header: "Jumlah Barang", sortable: true },
    { key: "total_price", header: "Point Yang Dibutuhkan", sortable: true },
    {
      key: "created_at",
      header: "Tanggal",
      sortable: true,
      render: (task: RedeemRewardType) => task.formatted_date,
    },
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
              : reward.status === "Done"
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
      render: (reward: RedeemRewardType) => (
        <PenukaranRewardDialog
          reward={reward}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      ),
    },
  ];

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
    setOpenDialog,
    loadingRewards,
    errorRewards,
  };
};
