
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainTable from "@/app/_components/main-table";
import useDashboard from "../_hooks/useDashboard";

const Dashboard = () => {
  const { todaysTasks, topStudents, columns } = useDashboard();

  return (
    <div>
      <h1 className="font-bold text-3xl mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tugas Hari Ini */}
        <Card className="w-full bg-blue-200">
          <CardHeader>
            <CardTitle>Tugas Hari Ini</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <MainTable
              columns={columns}
              data={todaysTasks}
              searchable={false}
              itemsPerPage={5}
            />
          </CardContent>
        </Card>

        {/* Top 15 Siswa */}
        <Card className="w-full bg-blue-200">
          <CardHeader>
            <CardTitle>Top 15 Siswa Bulan Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {topStudents.map((student, index) => (
                <li key={student.id} className="flex items-center">
                  <span className="w-6 text-gray-500">{index + 1}.</span>
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {student.name.charAt(0)}
                  </div>
                  <div className="ml-4 flex-grow flex items-center justify-between">
                    <p className="font-semibold">{student.name}</p>
                    <p className="text-sm text-gray-500">
                      {student.points} poin
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;