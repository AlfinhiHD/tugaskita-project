'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import TugasService from '@/app/_services/tugas-service';

const taskSchema = z.object({
  title: z.string().min(1, { message: 'Nama tugas harus diisi' }),
  start_date: z.string().min(1, { message: 'Tanggal mulai harus diisi' }),
  end_date: z.string().min(1, { message: 'Tanggal selesai harus diisi' }),
  description: z.string().min(1, { message: 'Deskripsi tugas harus diisi' }),
  point: z.number().min(1, { message: 'Poin harus lebih besar dari 0' }),
});

type TaskFormData = z.infer<typeof taskSchema>;

const TaskForm = () => {
  const router = useRouter();
  const params = useParams();
  const isEditMode = params.id !== 'form';

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      start_date: '',
      end_date: '',
      description: '',
      point: 0,
    },
  });

  useEffect(() => {
    const fetchTaskData = async () => {
      if (isEditMode) {
        try {
          const taskData = await TugasService.getDetailTask(params.id);
          form.setValue('title', taskData.data.title);
          form.setValue('start_date', taskData.data.start_date);
          form.setValue('end_date', taskData.data.end_date);
          form.setValue('description', taskData.data.description);
          form.setValue('point', taskData.data.point);
        } catch (error) {
          console.error('Failed to fetch task data:', error);
          Swal.fire('Error', 'Gagal memuat data tugas', 'error');
        }
      }
    };

    fetchTaskData();
  }, [isEditMode, params.id, form]);

  const onSubmit = async (data: TaskFormData) => {
    try {
      const formattedData = {
        ...data,
      };

      if (isEditMode) {
        await TugasService.updateTugas(params.id, formattedData);
        Swal.fire('Success', 'Berhasil mengubah tugas!', 'success');
      } else {
        await TugasService.createTugas(formattedData);
        Swal.fire('Success', 'Berhasil menambahkan tugas baru!', 'success');
      }
      router.push('/tugas/daftar-tugas');
    } catch (error) {
      console.error('Error submitting task:', error);
      Swal.fire('Error', 'Terjadi kesalahan saat submit data tugas', 'error');
    }
  };

  return (
    <div className="w-full p-6">
      <h1 className="mt-14 text-3xl font-bold mb-6 lg:mb-12 lg:mt-0">{isEditMode ? 'Edit Tugas' : 'Tambah Tugas Baru'}</h1>
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
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{isEditMode ? 'Simpan Perubahan' : 'Tambah Tugas'}</Button>
        </form>
      </Form>
    </div>
  );
};

export default TaskForm;
