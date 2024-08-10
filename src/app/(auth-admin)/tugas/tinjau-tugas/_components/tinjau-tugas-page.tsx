'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import MainTable from '@/app/_components/main-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTinjauTugas } from '../_hooks/useTinjauTugas';

const TinjauTugas = () => {
  const {
    activeTab,
    setActiveTab,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedTask,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    columns,
    filteredData
  } = useTinjauTugas();

  console.log(filteredData)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Tinjau Tugas</h1>

      <Tabs defaultValue="submit" onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger
            value="submit"
            className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-blue-200 text-blue-800"
          >
            Submit Tugas
          </TabsTrigger>
          <TabsTrigger
            value="pengajuan"
            className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-blue-200 text-blue-800"
          >
            Pengajuan Tugas
          </TabsTrigger>
        </TabsList>

        <div className="mt-8 flex justify-between">
          <Input placeholder="Cari nama siswa..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-sm" />
          <div className="flex space-x-4">
            <Select onValueChange={setStatusFilter} value={statusFilter}>
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Perlu Review">Perlu Review</SelectItem>
                <SelectItem value="Diterima">Diterima</SelectItem>
                <SelectItem value="Ditolak">Ditolak</SelectItem>
              </SelectContent>
            </Select>
            <Input className="w-40" type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
          </div>
        </div>

        <TabsContent value="submit">
          <MainTable columns={columns} data={filteredData} searchable={false} itemsPerPage={10} />
        </TabsContent>

        <TabsContent value="pengajuan">
          <MainTable columns={columns} data={filteredData} searchable={false} itemsPerPage={10} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TinjauTugas;
