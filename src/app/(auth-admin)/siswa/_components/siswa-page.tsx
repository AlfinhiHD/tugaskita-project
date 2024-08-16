"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import MainTable from "@/app/_components/main-table";
import { useRouter } from "next/navigation";
import useSiswa from "../_hooks/useSiswa";

const SiswaPage = () => {

  const router = useRouter()

  const {
    siswa,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedSiswa,
    columns,
    loadingTasks
  } = useSiswa();

  return (
    <div className="p-8">
      <div className="flex flex-col justify-between mb-4 mt-14 gap-y-4 lg:mt-0 lg:flex-row lg:mb-6">
        <h1 className="text-3xl font-bold">Daftar Siswa</h1>
        <Button onClick={() => router.push('/siswa/form')}>
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

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Tugas</DialogTitle>
          </DialogHeader>
          {selectedSiswa && (
            <div>
              <p>
                <strong>Nama:</strong> {selectedSiswa.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedSiswa.email}
              </p>
              <p>
                <strong>Total Point:</strong> {selectedSiswa.totalPoints}
              </p>
              <p>
                <strong>Tugas yang diselesaikan:</strong> {selectedSiswa.tugasSelesai}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SiswaPage;