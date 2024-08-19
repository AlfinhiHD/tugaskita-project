"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TugasService from "@/app/_services/tugas-service";
import { Loader2 } from "lucide-react";
import KeagamaanService from "@/app/_services/keagamaan-service";

const religions = [
  "Islam",
  "Kristen",
  "Katolik",
  "Hindu",
  "Buddha",
  "Konghucu",
  "Lainnya",
];

const taskSchema = z.object({
  title: z.string().min(1, { message: "Nama tugas harus diisi" }),
  religion: z.string().min(1, { message: "Agama harus dipilih" }),
  point: z.number().min(1, { message: "Poin harus lebih besar dari 0" }),
  start_date: z.string().min(1, { message: "Tanggal mulai harus diisi" }),
  end_date: z.string().min(1, { message: "Tanggal berakhir harus diisi" }),
  description: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

const TaskForm = () => {
  const router = useRouter();
  const params = useParams();
  const isEditMode = params.id !== "form";

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      religion: "",
      point: 0,
      start_date: "",
      end_date: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchTaskData = async () => {
      if (isEditMode) {
        setIsLoading(true);
        try {
          const taskData = await KeagamaanService.getSpesificReligionTugas(params.id);
          form.reset(taskData.data);
        } catch (error) {
          console.error("Failed to fetch task data:", error);
          Swal.fire("Error", "Gagal memuat data tugas", "error");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTaskData();
  }, [isEditMode, params.id, form]);

  const onSubmit = async (data: TaskFormData) => {
    setIsLoading(true);
    try {
      if (isEditMode) {
        await KeagamaanService.updateReligionTugas(params.id, data);
        Swal.fire("Success", "Berhasil mengubah tugas!", "success");
      } else {
        await KeagamaanService.addReligionTugas(data);
        Swal.fire("Success", "Berhasil menambahkan tugas baru!", "success");
      }
      router.push("/keagamaan/daftar-tugas-keagamaan");
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        error.response?.data?.error || "Terjadi kesalahan",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-6">
      <h1 className="mt-2 text-3xl font-bold mb-6 lg:mb-12 lg:mt-0">
        {isEditMode ? "Edit Tugas" : "Tambah Tugas Baru"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nama Tugas <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="religion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Agama <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih agama" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {religions.map((religion) => (
                      <SelectItem key={religion} value={religion}>
                        {religion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    Tanggal Mulai <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    Tanggal Berakhir <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Tugas</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="point"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Jumlah Poin <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      const numericValue = value === "" ? 0 : Number(value);
                      field.onChange(numericValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : isEditMode ? (
              "Simpan Perubahan"
            ) : (
              "Tambah Tugas"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TaskForm;
