"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

const taskSchema = z.object({
  name: z.string().min(1, { message: "Nama tugas harus diisi" }),
  startDate: z.string().min(1, { message: "Tanggal mulai harus diisi" }),
  endDate: z.string().min(1, { message: "Tanggal selesai harus diisi" }),
  description: z.string().min(1, { message: "Deskripsi tugas harus diisi" }),
  points: z
    .string()
    .min(1, { message: "Poin harus diisi" })
    .regex(/^\d+$/, { message: "Poin harus berupa angka bulat positif" })
    .refine(
      (val) => {
        const num = parseInt(val, 10);
        return num > 0;
      },
      {
        message: "Poin harus lebih besar dari 0",
      }
    ),
});

type TaskFormData = z.infer<typeof taskSchema>;

const TaskForm = () => {
  const router = useRouter();
  const params = useParams();
  const isEditMode = params.id !== "form";

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
      startDate: "",
      endDate: "",
      description: "",
      points: "",
    },
  });

  useEffect(() => {
    if (isEditMode) {
      console.log(params.id);
    }
  }, [isEditMode, params.id, form]);

  const onSubmit = async (data: TaskFormData) => {
    console.log(data);
    const formattedData = {
      ...data,
      points: parseInt(data.points, 10),
    };
    console.log(formattedData);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-12">
        {isEditMode ? "Edit Tugas" : "Tambah Tugas Baru"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
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

          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="startDate"
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
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    Tanggal Selesai <span className="text-red-500">*</span>
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
                <FormLabel>
                  Deskripsi Tugas <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="points"
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
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {isEditMode ? "Simpan Perubahan" : "Tambah Tugas"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TaskForm;
