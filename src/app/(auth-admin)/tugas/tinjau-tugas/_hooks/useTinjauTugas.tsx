import { useEffect, useState, useMemo } from "react";
import useSWR from "swr";
import Swal from "sweetalert2";
import TugasService from "@/app/_services/tugas-service";
import { ResponseDTO, TinjauReqTugasType, TinjauSubmitTugasType } from "@/app/_constant/global-types";
import TinjauTugasDialog from "../_components/tinjau-tugas-dialog";

export const useTinjauTugas = () => {
  const [activeTab, setActiveTab] = useState("Submission");
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(null);
  const [formattedTinjauTugasReq, setFormattedTinjauTugasReq] = useState<
    TinjauReqTugasType[]
  >([]);
  const [formattedTinjauTugasSubmit, setFormattedTinjauTugasSubmit] = useState<
    TinjauSubmitTugasType[]
  >([]);


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const formatDateForFilter = (dateString: string) => {
    return dateString.split("T")[0];
  };

  const {
    data: tasksReq,
    error: errorTasksReq,
    mutate: mutateTasksReq,
    isLoading: loadingTasksReq,
  } = useSWR<ResponseDTO<TinjauReqTugasType[]>, Error>(
    ["/admin-task/user/request"],
    () => TugasService.getTinjauTugas()
  );

  const {
    data: tasksSubmit,
    error: errorTasksSubmit,
    mutate: mutateTasksSubmit,
    isLoading: loadingTasksSubmit,
  } = useSWR<ResponseDTO<TinjauSubmitTugasType[]>, Error>(
    ["/admin-task/user"],
    () => TugasService.getTinjauTugasSubmit()
  );
  

  useEffect(() => {
    if (errorTasksReq || errorTasksSubmit) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error loading data. Please refresh the page and check your internet connection.",
      });
    }
  }, [errorTasksReq, errorTasksSubmit]);

  useEffect(() => {
    if (tasksReq?.data) {
      setFormattedTinjauTugasReq(
        tasksReq.data.map((task) => ({
          ...task,
          created_at: task.created_at,
          formatted_date: formatDate(task.created_at),
          date_for_filter: formatDateForFilter(task.created_at),
        }))
      );
    }
  }, [tasksReq]);

  useEffect(() => {
    if (tasksSubmit?.data) {
      setFormattedTinjauTugasSubmit(
        tasksSubmit.data.map((task) => ({
          ...task,
          created_at: task.created_at,
          formatted_date: formatDate(task.created_at),
          date_for_filter: formatDateForFilter(task.created_at),
        }))
      );
    }
  }, [tasksSubmit]);

  const filteredDataReq = useMemo(() => {
    return formattedTinjauTugasReq.filter(
      (task) =>
        task.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "all" || task.status === statusFilter) &&
        (dateFilter === "" || task.date_for_filter === dateFilter) 
    );
  }, [formattedTinjauTugasReq, searchTerm, statusFilter, dateFilter, activeTab]);

  const filteredDataSubmit = useMemo(() => {
    return formattedTinjauTugasSubmit.filter(
      (task) =>
        task.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "all" || task.status === statusFilter) &&
        (dateFilter === "" || task.date_for_filter === dateFilter)
    );
  }, [formattedTinjauTugasSubmit, searchTerm, statusFilter, dateFilter, activeTab]);

  const ReqColumns = useMemo(
    () => [
      { key: "user_name", header: "Nama Lengkap Siswa", sortable: true },
      { key: "title", header: "Task", sortable: true },
      { key: "point", header: "Point", sortable: true },
      {
        key: "created_at",
        header: "Tanggal",
        sortable: true,
        render: (task: TinjauReqTugasType) => task.formatted_date,
      },
      {
        key: "Status",
        header: "Status",
        sortable: true,
        render: (task: TinjauReqTugasType) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap
          ${
            task.status === "Perlu Review"
              ? "bg-yellow-200 text-yellow-800"
              : task.status === "Diterima"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
          >
            {task.status}
          </span>
        ),
      },
      {
        key: "actions",
        header: "Aksi",
        render: (task: TinjauReqTugasType) => (
          <TinjauTugasDialog
            task={task}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        ),
      },
    ],
    [openDialog]
  );

  const SubmitColumns = useMemo(
    () => [
      { key: "user_name", header: "Nama Lengkap Siswa", sortable: true },
      { key: "task_name", header: "Task", sortable: true },
      {
        key: "created_at",
        header: "Tanggal",
        sortable: true,
        render: (task: TinjauSubmitTugasType) => task.formatted_date,
      },
      {
        key: "Status",
        header: "Status",
        sortable: true,
        render: (task: TinjauSubmitTugasType) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap
          ${
            task.status === "Perlu Review"
              ? "bg-yellow-200 text-yellow-800"
              : task.status === "Diterima"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
          >
            {task.status}
          </span>
        ),
      },
      {
        key: "actions",
        header: "Aksi",
        render: (task: TinjauSubmitTugasType) => (
          <TinjauTugasDialog
            task={task}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        ),
      },
    ],
    [openDialog]
  );
  

  const handleDetailClick = (task) => {
    setSelectedTask(task);
    setIsDetailDialogOpen(true);
  };

  return {
    activeTab,
    setActiveTab,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedTask,
    setSelectedTask,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    openDialog,
    setOpenDialog,
    handleDetailClick,
    SubmitColumns,
    ReqColumns,
    filteredDataSubmit,
    filteredDataReq,
    loadingTasksSubmit,
    loadingTasksReq,
    errorTasksReq,
    errorTasksSubmit
  };
};
