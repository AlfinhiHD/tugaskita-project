"use client";

import MainTable from "@/app/_components/main-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePenukaranReward } from "../_hooks/usePenukaranReward";
import { PenukaranRewardSkeleton } from "@/app/_components/skeletons";

const PenukaranReward = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    columns,
    filteredData,
    loadingRewards,
    errorRewards,
  } = usePenukaranReward();

  if (loadingRewards) {
    return <PenukaranRewardSkeleton />;
  }

  if (errorRewards) {
    return null;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Penukaran Reward</h1>
      <div className="mt-8 flex justify-between">
        <Input
          placeholder="Cari nama siswa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex space-x-4">
          <Select onValueChange={setStatusFilter} value={statusFilter}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="Perlu Review">Perlu Review</SelectItem>
              <SelectItem value="Diterima">Diterima</SelectItem>
              <SelectItem value="Ditolak">Ditolak</SelectItem>
            </SelectContent>
          </Select>
          <Input
            className="w-40"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>
      <MainTable
        columns={columns}
        data={filteredData}
        searchable={false}
        itemsPerPage={10}
      />
    </div>
  );
};

export default PenukaranReward;
