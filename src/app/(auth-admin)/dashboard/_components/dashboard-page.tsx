"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainTable from "@/app/_components/main-table";
import useDashboard from "../_hooks/useDashboard";
import {
  DashboardTaskSkeleton,
  DashboardTopRankSkeleton,
} from "@/app/_components/skeletons";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Dashboard = () => {
  const {
    todaysTasks,
    topRank,
    columns,
    loadingTasks,
    loadingtopRank,
    canResetMonthlyPoints,
    resetMonthlyPoints,
    resetSemesterPoints,
    errorTasks,
    errortopRank,
  } = useDashboard();

  if (errorTasks || errortopRank) {
    return null;
  }

  return (
    <div className="p-8 lg:px-0">
      <h1 className="font-bold text-3xl mb-8 mt-2 lg:mt-0 lg:pt-0">
        Dashboard
      </h1>
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-lg shadow-lg mb-8">
        <div className="flex items-center gap-4">
          <Image
            src="/assets/logo/logo-taruna-nusantara.png"
            alt="Taruna Nusantara Logo"
            width={64}
            height={64}
          />
          <div>
            <h1 className="font-bold text-4xl mb-2">Selamat Datang</h1>
            <p className="text-xl">
              di Website Admin TugasKita SMA Taruna Nusantara
            </p>
          </div>
        </div>
      </div>
      <Card className="w-full bg-blue-200 mb-8">
        <CardHeader>
          <CardTitle>Reset Poin</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={resetMonthlyPoints}
            disabled={!canResetMonthlyPoints}
            className="w-full sm:w-auto"
          >
            Reset Poin Bulanan
          </Button>
          <Button onClick={resetSemesterPoints} className="w-full sm:w-auto">
            Reset Poin Semester
          </Button>
        </CardContent>
      </Card>

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
            <CardTitle>Top Poin 10 Siswa Bulan Ini</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingtopRank ? (
              <DashboardTopRankSkeleton />
            ) : (
              <ul className="space-y-4">
                {topRank?.slice(0, 10).map((student, index) => (
                  <li key={index} className="flex items-center gap-x-4">
                    <span className="w-6 text-gray-500">{index + 1}.</span>
                    <div className="w-10 h-10 rounded-full bg-gray-200 lg:flex items-center justify-center hidden">
                      {student?.name.charAt(0)}
                    </div>
                    <div className="flex-grow flex items-center justify-between">
                      <p className="font-semibold line-clamp-1">
                        {student.name}
                      </p>
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
