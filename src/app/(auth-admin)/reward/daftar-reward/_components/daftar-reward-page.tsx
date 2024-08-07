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
import useDaftarReward from "../_hooks/useDaftarReward";

const RewardList = () => {

  const router = useRouter()

  const {
    rewards,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedReward,
    columns,
  } = useDaftarReward();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daftar Reward</h1>
        <Button onClick={() => router.push('/reward/daftar-reward/form')}>
          <Plus className="h-5 w-5 mr-2" />
          Tambah Reward Baru
        </Button>
      </div>

      <MainTable
        columns={columns}
        data={rewards}
        searchable={true}
        itemsPerPage={10}
      />

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Reward</DialogTitle>
          </DialogHeader>
          {selectedReward && (
            <div>
              <p>
                <strong>Nama:</strong> {selectedReward.name}
              </p>
              <p>
                <strong>Stok:</strong> {selectedReward.stok}
              </p>
              <p>
                <strong>Point:</strong> {selectedReward.points}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RewardList;