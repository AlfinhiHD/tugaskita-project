"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainTable from "@/app/_components/main-table";
import useDashboard from "../_hooks/useDashboard";
import {
  DashboardTaskSkeleton,
  DashboardTopRankSkeleton,
} from "@/app/_components/skeletons";

const Dashboard = () => {
  const { todaysTasks, topRank, columns, loadingTasks, loadingtopRank } =
    useDashboard();

  return (
    <div className="p-8 lg:px-0">
      <h1 className="font-bold text-3xl mb-8 mt-14 lg:mt-0 lg:pt-0">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="w-full bg-blue-200">
          <CardHeader>
            <CardTitle>Tugas Tersedia</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {loadingTasks ? (
              <DashboardTaskSkeleton />
            ) : (
              <MainTable
                columns={columns}
                data={todaysTasks}
                searchable={false}
                itemsPerPage={5}
              />
            )}
          </CardContent>
        </Card>

        <Card className="w-full bg-blue-200">
          <CardHeader>
            <CardTitle>Top 15 Siswa Bulan Ini</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingtopRank ? (
              <DashboardTopRankSkeleton />
            ) : (
              <ul className="space-y-4">
                {topRank?.map((student, index) => (
                  <li key={index} className="flex items-center gap-x-4">
                    <span className="w-6 text-gray-500">{index + 1}.</span>
                    <div className="w-10 h-10 rounded-full bg-gray-200 lg:flex items-center justify-center hidden">
                      {student?.name.charAt(0)}
                    </div>
                    <div className="flex-grow flex items-center justify-between">
                      <p className="font-semibold line-clamp-1">{student.name}</p>
                      <p className="text-sm text-gray-500 text-end min-w-[40%] lg:min-w-0">
                        {student?.point} poin
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
