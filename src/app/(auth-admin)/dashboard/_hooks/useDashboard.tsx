// hooks/useDashboard.js
import { useEffect, useState } from "react";
import TaskDialog from "../../../_components/task-dialog";
import {
  ResponseDTO,
  TopRankType,
  TugasType,
} from "@/app/_constant/global-types";
import useSWR from "swr";
import TugasService from "@/app/_services/tugas-service";
import { format, addDays, parseISO } from "date-fns";
import SiswaService from "@/app/_services/siswa-service";
import Swal from "sweetalert2";
import instance from "@/app/_utils/axios.instance";

const useDashboard = () => {
  const [openDialog, setOpenDialog] = useState(null);
  const [todaysTasks, setTodaysTasks] = useState<TugasType[]>([]);
  const [topRankSorted, setTopRankSorted] = useState<TopRankType[]>([])

  const {
    data: tasks,
    error: errorTasks,
    mutate: mutateTasks,
    isLoading: loadingTasks,
  } = useSWR<ResponseDTO<TugasType[]>, Error>(["/admin-task"], () =>
    TugasService.getTugas()
  );

  const {
    data: topRank,
    error: errortopRank,
    mutate: mutatetopRank,
    isLoading: loadingtopRank,
  } = useSWR<ResponseDTO<TopRankType[]>, Error>(["/user/rank"], () =>
    SiswaService.getTopRank()
  );

  // useEffect(() => {
  //   if (tasks?.data) {
  //     const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');

  //     const filteredTasks = tasks.data.filter(task => {
  //       const taskEndDate = format(parseISO(task.endDate), 'yyyy-MM-dd');
  //       return taskEndDate === tomorrow;
  //     });

  //     console.log(filteredTasks)
  //     setTodaysTasks(filteredTasks);
  //   }
  // }, [tasks]);

  const columns = [
    { key: "title", header: "Task Name", sortable: true },
    { key: "point", header: "Point", sortable: true },
    {
      key: "actions",
      header: "Detail",
      render: (task) => (
        <TaskDialog
          task={task}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      ),
    },
  ];

  const [canResetMonthlyPoints, setCanResetMonthlyPoints] = useState(false);

  useEffect(() => {
    const checkResetEligibility = () => {
      const now = new Date();
      const lastDayOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).getDate();
      const dayOfMonth = now.getDate();

      setCanResetMonthlyPoints(
        dayOfMonth >= lastDayOfMonth - 2 || dayOfMonth <= 3
      );
    };

    checkResetEligibility();
    const dailyCheck = setInterval(checkResetEligibility, 24 * 60 * 60 * 1000);

    return () => clearInterval(dailyCheck);
  }, []);

  useEffect(() => {
    const sortedTopRank = topRank?.data?.sort((a, b) => b.point - a.point) || [];
    setTopRankSorted(sortedTopRank)
  }, [topRank])

  const resetMonthlyPoints = async () => {
    if (!canResetMonthlyPoints) return;

    try {
      const result = await Swal.fire({
        title: "Reset Poin Bulanan",
        text: "Anda yakin ingin mereset poin bulanan?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, reset!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await instance.post("/user/monthly-reset");
        Swal.fire("Berhasil!", "Poin bulanan telah direset.", "success");
        mutatetopRank()
      }
    } catch (error) {
      console.error("Error resetting monthly points:", error);
      Swal.fire(
        "Error",
        "Terjadi kesalahan saat mereset poin bulanan.",
        "error"
      );
    }
  };

  const resetSemesterPoints = async () => {
    try {
      const result = await Swal.fire({
        title: "Reset Poin Semester",
        text: "Anda yakin ingin mereset poin semester?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, reset!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        const secondConfirmation = await Swal.fire({
          title: "Konfirmasi Ulang",
          text: "Apakah Anda benar-benar yakin? Tindakan ini tidak dapat dibatalkan.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, saya yakin!",
          cancelButtonText: "Batal",
        });

        if (secondConfirmation.isConfirmed) {
          await instance.post("/user/annual-reset");
          Swal.fire("Berhasil!", "Poin semester telah direset.", "success");
          mutatetopRank()
        }
      }
    } catch (error) {
      console.error("Error resetting semester points:", error);
      Swal.fire(
        "Error",
        "Terjadi kesalahan saat mereset poin semester.",
        "error"
      );
    }
  };

  


  return {
    todaysTasks: tasks?.data,
    topRank: topRankSorted,
    columns,
    loadingtopRank,
    loadingTasks,
    canResetMonthlyPoints,
    resetMonthlyPoints,
    resetSemesterPoints,
  };
};

export default useDashboard;
