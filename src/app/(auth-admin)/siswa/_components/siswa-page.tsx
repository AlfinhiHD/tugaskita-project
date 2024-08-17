"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MainTable from "@/app/_components/main-table";
import { useRouter } from "next/navigation";
import useSiswa from "../_hooks/useSiswa";
import { SiswaPageSkeleton } from "@/app/_components/skeletons";

const SiswaPage = () => {
  const router = useRouter();

  const { siswa, columns, loadingSiswa } = useSiswa();

  if(loadingSiswa) {
    return <SiswaPageSkeleton />
  }

  return (
    <div className="page-wrapper">
      <div className="flex flex-col justify-between mb-4 mt-2 gap-y-4 lg:mt-0 lg:flex-row lg:mb-6">
        <h1 className="text-3xl font-bold">Daftar Siswa</h1>
        <Button onClick={() => router.push("/pelanggaran/form")}>
          <Plus className="h-5 w-5 mr-2" />
          Tambah Siswa Baru
        </Button>
      </div>

      <MainTable
        columns={columns}
        data={siswa}
        searchable={true}
        itemsPerPage={10}
      />
    </div>
  );
};

export default SiswaPage;
