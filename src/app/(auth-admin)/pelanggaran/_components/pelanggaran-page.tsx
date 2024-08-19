"use client";

import MainTable from "@/app/_components/main-table";
import { Input } from "@/components/ui/input";
import { usePelanggaran } from "../_hooks/usePelanggaran";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { PelanggaranSkeleton } from "@/app/_components/skeletons";

const PelanggaranPage = () => {
  const router = useRouter();

  const {
    searchTerm,
    setSearchTerm,
    dateFilter,
    setDateFilter,
    columns,
    filteredData,
    loadingPelanggaran,
    errorPelanggaran,
  } = usePelanggaran();

  if (loadingPelanggaran) {
    return <PelanggaranSkeleton />;
  }

  if (errorPelanggaran) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Daftar Pelanggaran Siswa</h1>
        <Button
          onClick={() => router.push("/pelanggaran/form")}
          className="w-full sm:w-auto"
        >
          <Plus className="h-5 w-5 mr-2" />
          Laporkan Pelanggaran Siswa
        </Button>
      </div>
      <div className="mt-4 md:mt-8 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <Input
          placeholder="Cari nama siswa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:max-w-sm"
        />
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full sm:w-auto"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
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

export default PelanggaranPage;
