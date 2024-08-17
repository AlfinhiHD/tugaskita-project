"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MainTable from "@/app/_components/main-table";

import { useRouter } from "next/navigation";
import useDaftarReward from "../_hooks/useDaftarReward";
import { RewardListSkeleton } from "@/app/_components/skeletons";

const RewardList = () => {
  const router = useRouter();

  const {
    rewards,
    loadingRewards,
    columns,
  } = useDaftarReward();

  if (loadingRewards) {
    return <RewardListSkeleton />;
  }

  return (
    <div className="page-wrapper">
      <div className="flex flex-col justify-between mb-4 mt-14 gap-y-4 lg:mt-0 lg:flex-row lg:mb-6">
        <h1 className="text-3xl font-bold">Daftar Reward</h1>
        <Button onClick={() => router.push("/reward/daftar-reward/form")}>
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
    </div>
  );
};

export default RewardList;
