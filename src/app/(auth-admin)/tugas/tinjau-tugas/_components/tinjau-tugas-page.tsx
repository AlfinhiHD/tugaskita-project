"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import MainTable from "@/app/_components/main-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTinjauTugas } from "../_hooks/useTinjauTugas";
import { TinjauTugasSkeleton } from "@/app/_components/skeletons";

const TinjauTugas = () => {
  const {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    columns,
    filteredData,
    loadingTasks,
    errorTasks,
  } = useTinjauTugas();

  if (loadingTasks) {
    return <TinjauTugasSkeleton />;
  }

  if (errorTasks) {
    return null;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">Tinjau Tugas</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-auto">
          <TabsTrigger value="Task" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Submit Tugas
          </TabsTrigger>
          <TabsTrigger value="Submission" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Pengajuan Tugas
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 md:mt-8 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <Input
            placeholder="Cari nama siswa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:max-w-sm"
          />
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Select onValueChange={setStatusFilter} value={statusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Perlu Review">Perlu Review</SelectItem>
                <SelectItem value="Diterima">Diterima</SelectItem>
                <SelectItem value="Ditolak">Ditolak</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full sm:w-auto"
            />
          </div>
        </div>

        <TabsContent value="Task">
          <div className="overflow-x-auto">
            <MainTable
              columns={columns}
              data={filteredData}
              searchable={false}
              itemsPerPage={10}
            />
          </div>
        </TabsContent>

        <TabsContent value="Submission">
          <div className="overflow-x-auto">
            <MainTable
              columns={columns}
              data={filteredData}
              searchable={false}
              itemsPerPage={10}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TinjauTugas;