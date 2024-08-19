"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MainTable from "@/app/_components/main-table";
import useReligionTugas from "../_hooks/useReligionTugas";
import { useRouter } from "next/navigation";
import { TaskListSkeleton } from "@/app/_components/skeletons";
import AddReligionTaskDialog from "./add-tugas-religion-dialog";

const ReligionTaskList = () => {
  const router = useRouter();
  const { religionTasks, columns, loadingTasks, isDeleting, errorTasks } =
    useReligionTugas();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  if(errorTasks) {
    return null;
  }

  return (
    <div className="space-y-6 page-wrapper">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Daftar Tugas Keagamaan</h1>
        <Button onClick={() => setIsAddDialogOpen(true)} disabled={isDeleting}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Tugas Keagamaan
        </Button>
      </div>

      <AddReligionTaskDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddManual={() => router.push("/keagamaan/daftar-tugas-keagamaan/form")}
      />

      {loadingTasks || isDeleting ? (
        <TaskListSkeleton />
      ) : (
        <MainTable
          columns={columns}
          data={religionTasks}
          searchable={true}
          itemsPerPage={10}
        />
      )}
    </div>
  );
};

export default ReligionTaskList;
