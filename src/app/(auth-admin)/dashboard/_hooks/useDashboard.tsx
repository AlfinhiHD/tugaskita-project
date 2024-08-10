// hooks/useDashboard.js
import { useEffect, useState } from "react";
import TaskDialog from "../../../_components/task-dialog";
import { ResponseDTO, TopRankType, TugasType } from "@/app/_constant/global-types";
import useSWR from "swr";
import TugasService from "@/app/_services/tugas-service";
import { format, addDays, parseISO } from 'date-fns';
import SiswaService from "@/app/_services/siswa-service";

const useDashboard = () => {

  const [openDialog, setOpenDialog] = useState(null);
  const [todaysTasks, setTodaysTasks] = useState<TugasType[]>([]);

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

  return {
    todaysTasks : tasks.data,
    topRank,
    columns,
    loadingtopRank,
    loadingTasks
  };
};

export default useDashboard;
