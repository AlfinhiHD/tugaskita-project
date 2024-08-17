"use client";

import MainTable from "@/app/_components/main-table";
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
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">Penukaran Reward</h1>
      <div className="mt-4 md:mt-8 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <Input
          placeholder="Cari nama siswa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:max-w-sm"
        />
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Select onValueChange={setStatusFilter} value={statusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
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
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full sm:w-auto"
          />
        </div>
      </div>
      <div className="mt-6 overflow-x-auto">
        <MainTable
          columns={columns}
          data={filteredData}
          searchable={false}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
};

export default PenukaranReward;