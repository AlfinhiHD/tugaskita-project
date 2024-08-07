"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MainTable from "@/app/_components/main-table";

const Dashboard = () => {
  const [openDialog, setOpenDialog] = useState(null);

  // Dummy data untuk tugas hari ini
  const todaysTasks = [
    {
      id: 1,
      title: "Matematika: Persamaan Kuadrat 1",
      points: 100,
      description: "Selesaikan 10 soal persamaan kuadrat",
    },
    {
      id: 2,
      title: "Matematika: Persamaan Kuadrat 2",
      points: 200,
      description: "Selesaikan 10 soal persamaan kuadrat",
    },
    {
      id: 3,
      title: "Matematika: Persamaan Kuadrat 3",
      points: 150,
      description: "Selesaikan 10 soal persamaan kuadrat",
    },
    // ... other tasks
  ];

  // Dummy data untuk top 15 siswa
  const topStudents = [
    { id: 1, name: "Andi Pratama", points: 1250, avatar: "/avatars/andi.png" },
    { id: 2, name: "Andi Pratama", points: 1250, avatar: "/avatars/andi.png" },
    { id: 3, name: "Andi Pratama", points: 1250, avatar: "/avatars/andi.png" },
    { id: 4, name: "Andi Pratama", points: 1250, avatar: "/avatars/andi.png" },
    { id: 5, name: "Andi Pratama", points: 1250, avatar: "/avatars/andi.png" },
    // ... other students
  ];

  const columns = [
    { key: "id", header: "No", sortable: true },
    { key: "title", header: "Task Name", sortable: true },
    { key: "points", header: "Point", sortable: true },
    {
      key: "actions",
      header: "Detail",
      render: (task) => (
        <Dialog
          open={openDialog === task.id}
          onOpenChange={(open) => setOpenDialog(open ? task.id : null)}
        >
          <DialogTrigger asChild>
            <Button variant="ghost" className="hover:bg-blue-100" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{task.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p>
                <strong>Points:</strong> {task.points}
              </p>
              <p>
                <strong>Description:</strong> {task.description}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
  ];

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
