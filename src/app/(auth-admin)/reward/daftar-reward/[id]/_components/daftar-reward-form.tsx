'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Swal from 'sweetalert2';
import RewardService from '@/app/_services/reward-service';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const rewardSchema = z.object({
  name: z.string().min(1, { message: 'Nama reward harus diisi' }),
  stock: z
    .string()
    .min(1, { message: 'Stok reward harus diisi' })
    .regex(/^\d+$/, { message: 'Stok harus berupa angka bulat positif' })
    .refine((val) => parseInt(val, 10) > 0, {
      message: 'Stok harus lebih besar dari 0',
    }),
  price: z
    .string()
    .min(1, { message: 'Harga poin harus diisi' })
    .regex(/^\d+$/, { message: 'Harga poin harus berupa angka bulat positif' })
    .refine((val) => parseInt(val, 10) > 0, {
      message: 'Harga poin harus lebih besar dari 0',
    }),
  image: z
    .any()
    .refine((files) => files?.length == 1, 'Harus upload satu gambar.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Ukuran maksimum adalah 5MB.`)
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), 'Format file tidak valid'),
});

type RewardFormData = z.infer<typeof rewardSchema>;

const RewardForm = () => {
  const router = useRouter();
  const params = useParams();
  const isEditMode = params.id !== 'form';

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<RewardFormData>({
    resolver: zodResolver(rewardSchema),
    defaultValues: {
      name: '',
      stock: '',
      price: '',
      image: undefined,
    },
  });

  const onSubmit = async (data: RewardFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('stock', data.stock);
    formData.append('price', data.price);
    formData.append('image', data.image[0]);

    try {
      if (isEditMode) {
        await RewardService.updateReward(params.id, formData);
        Swal.fire('Success', 'Reward berhasil diperbarui', 'success');
      } else {
        await RewardService.createReward(formData);
        Swal.fire('Success', 'Reward berhasil ditambahkan', 'success');
      }
      router.push('/reward/daftar-reward');
    } catch (error) {
      Swal.fire('Error', 'Terjadi kesalahan saat submit reward', 'error');
      console.error('Error submitting reward:', error);
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
    // Cleanup URL object on unmount
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-12">{isEditMode ? 'Edit Reward' : 'Tambah Reward Baru'}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nama Reward <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Stock Field */}
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  Stok Reward <span className="text-red-500">*</span>
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
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  Harga Poin <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload Field */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Gambar Reward</FormLabel>
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
                    <Input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{isEditMode ? 'Simpan Perubahan' : 'Tambah Reward'}</Button>
        </form>
      </Form>
    </div>
  );
};

export default RewardForm;
