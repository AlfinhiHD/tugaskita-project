'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import SiswaService from '@/app/_services/siswa-service';
import Image from 'next/image';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const studentSchema = z
  .object({
    name: z.string().min(1, { message: 'Nama siswa harus diisi' }),
    email: z.string().email({ message: 'Email tidak valid' }),
    password: z.string().min(6, { message: 'Kata sandi harus diisi' }),
    confirmPassword: z.string().min(6, { message: 'Konfirmasi kata sandi harus diisi' }),
    image: z
      .any()
      .refine((files) => files?.length == 1, 'Harus upload satu gambar.')
      .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Ukuran maksimum adalah 5MB.`)
      .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), 'Format file tidak valid'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password && confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password tidak sama',
        path: ['confirmPassword'],
      });
    }
  });

type StudentFormData = z.infer<typeof studentSchema>;

const StudentForm = () => {
  const router = useRouter();
  const params = useParams();
  const isEditMode = params.id !== 'form';

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      image: undefined,
    },
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      if (isEditMode) {
        try {
          const studentData = await SiswaService.getSingleSiswa(params.id);
          form.setValue('name', studentData.data.name);
          form.setValue('email', studentData.data.email);
          setPreviewUrl(studentData.imageUrl);
        } catch (error) {
          console.error('Failed to fetch student data:', error);
          Swal.fire('Error', 'Gagal memuat data siswa', 'error');
        }
      }
    };

    fetchStudentData();
  }, [isEditMode, params.id, form]);

  const onSubmit = async (data: StudentFormData) => {
    const { confirmPassword, ...submitData } = data;

    const formData = new FormData();
    formData.append('name', submitData.name);
    formData.append('email', submitData.email);

    if (submitData.password) {
      formData.append('password', submitData.password);
    }

    formData.append('image', submitData.image[0]);

    try {
      if (isEditMode) {
        await SiswaService.updateSiswa(params.id, formData);
        Swal.fire('Success', 'Berhasil mengubah data siswa', 'success');
      } else {
        await SiswaService.createSiswa(formData);
        Swal.fire('Success', 'Berhasil menambahkan siswa baru', 'success');
      }
      router.push('/siswa');
    } catch (error) {
      console.error('Error submitting student:', error);
      Swal.fire('Error', 'Terjadi kesalahan saat submit data siswa', 'error');
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      form.setValue('image', [file]);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="w-full p-6">
      <h1 className="mt-14 text-3xl font-bold mb-6 lg:mb-12 lg:mt-0">{isEditMode ? 'Edit Siswa' : 'Tambah Siswa Baru'}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nama Siswa <span className="text-red-500">*</span>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className="text-red-500">*</span>
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Kata Sandi <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Konfirmasi Kata Sandi <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Upload Gambar Siswa <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center justify-center w-full">
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="h-full object-contain" />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, JPEG, WEBP (MAX. 5MB)</p>
                        </div>
                      )}
                    </label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        handleImageChange(event);
                        field.onChange(event.target.files);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{isEditMode ? 'Simpan Perubahan' : 'Tambah Siswa'}</Button>
        </form>
      </Form>
    </div>
  );
};

export default StudentForm;
