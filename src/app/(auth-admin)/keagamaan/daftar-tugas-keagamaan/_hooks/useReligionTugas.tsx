import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { ResponseDTO, KeagamaanTaskType } from "@/app/_constant/global-types";

import KeagamaanService from "@/app/_services/keagamaan-service";
import DetailReligionTaskDialog from "../_components/detail-tugas-religion-dialog";

const useReligionTugas = () => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: tasks,
    error: errorTasks,
    mutate: mutateTasks,
    isLoading: loadingTasks,
  } = useSWR<ResponseDTO<KeagamaanTaskType[]>, Error>(
    ["/admin-task/religion"],
    () => KeagamaanService.getAllReligionTugas()
  );

  const handleDelete = async (taskId) => {
    const result = await Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Tugas keagamaan yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus tugas!",
      cancelButtonText: "Tidak, Batalkan!",
    });

    if (result.isConfirmed) {
      setIsDeleting(true);
      try {
        await KeagamaanService.deleteReligionTugas(taskId);
        Swal.fire(
          "Berhasil!",
          "Tugas keagamaan berhasil dihapus dengan sukses.",
          "success"
        );
        mutateTasks();
      } catch (error) {
        Swal.fire("Error!", "Gagal menghapus tugas keagamaan.", "error");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  
  useEffect(() => {
    if (errorTasks) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error loading data. Please refresh the page and check your internet connection.",
      });
    }
  }, [errorTasks]);


  const createAutoTask = async (religion) => {
    try {
      await KeagamaanService.addReligionTugas({ religion });
      Swal.fire(
        "Berhasil!",
        "Tugas keagamaan otomatis berhasil dibuat.",
        "success"
      );
      mutateTasks();
    } catch (error) {
      Swal.fire("Error!", "Gagal membuat tugas keagamaan otomatis.", "error");
    }
  };

  const columns = [
    { key: "title", header: "Nama Task", sortable: true },
    { key: "religion", header: "Agama", sortable: true },
    { key: "point", header: "Point", sortable: true },
    {
      key: "actions",
      header: "Aksi",
      render: (task) => (
        <>
          <DetailReligionTaskDialog
            task={task}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/keagamaan/daftar-tugas-keagamaan/${task.id}`)}
            disabled={isDeleting}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(task.id)}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      ),
    },
  ];

  return {
    religionTasks: tasks?.data,
    columns,
    loadingTasks,
    isDeleting,
    handleDelete,
    createAutoTask,
    errorTasks
  };
};

export default useReligionTugas;
