"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const rewardSchema = z.object({
  name: z.string().min(1, { message: "Nama reward harus diisi" }),
  stock: z
    .string()
    .min(1, { message: "Stok reward harus diisi" })
    .regex(/^\d+$/, { message: "Stok harus berupa angka bulat positif" })
    .refine(
      (val) => {
        const num = parseInt(val, 10);
        return num > 0;
      },
      {
        message: "Stok harus lebih besar dari 0",
      }
    ),
  pointPrice: z
    .string()
    .min(1, { message: "Harga poin harus diisi" })
    .regex(/^\d+$/, { message: "Harga poin harus berupa angka bulat positif" })
    .refine(
      (val) => {
        const num = parseInt(val, 10);
        return num > 0;
      },
      {
        message: "Harga poin harus lebih besar dari 0",
      }
    ),
  image: z
    .any()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        return value instanceof File && SUPPORTED_FORMATS.includes(value.type);
      },
      { message: "Format file tidak valid" }
    ),
});

type RewardFormData = z.infer<typeof rewardSchema>;

const RewardForm = () => {
  const router = useRouter();
  const params = useParams();
  const isEditMode = params.id !== "form";

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<RewardFormData>({
    resolver: zodResolver(rewardSchema),
    defaultValues: {
      name: "",
      stock: "",
      pointPrice: "",
      image: null,
    },
  });

  const onSubmit = async (data: RewardFormData) => {
    console.log(data);
    const formattedData = {
      ...data,
      stock: parseInt(data.stock, 10),
      pointPrice: parseInt(data.pointPrice, 10),
      image: selectedImage,
    };
    console.log(formattedData);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-12">
        {isEditMode ? "Edit Reward" : "Tambah Reward Baru"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  Stok Reward <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pointPrice"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  Harga Poin <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    {...field}
                  />
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
                  Gambar Reward Baru
                </FormLabel>
                <FormControl>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      if (file) {
                        setSelectedImage(file);
                        field.onChange(file);
                      }
                    }}
                    className="border p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {isEditMode ? "Simpan Perubahan" : "Tambah Reward"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RewardForm;
