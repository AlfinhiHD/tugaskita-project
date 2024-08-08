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

const studentSchema = z
  .object({
    name: z.string().min(1, { message: "Nama siswa harus diisi" }),
    email: z.string().email({ message: "Email tidak valid" }),
    password: z
      .string()
      .min(6, { message: "Kata sandi harus minimal 6 karakter" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Kata sandi harus minimal 6 karakter" }),
    image: z
      .any()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;
          return (
            value instanceof File && SUPPORTED_FORMATS.includes(value.type)
          );
        },
        { message: "Format file tidak valid" }
      ),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password tidak sama",
        path: ["confirmPassword"],
      });
    }
  });

type StudentFormData = z.infer<typeof studentSchema>;

const StudentForm = () => {
  const router = useRouter();
  const params = useParams();
  const isEditMode = params.id !== "form";

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: null,
    },
  });

  const onSubmit = async (data: StudentFormData) => {
    console.log(data);
    const formattedData = {
      ...data,
      image: selectedImage,
    };
    console.log(formattedData);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-12">
        {isEditMode ? "Edit Siswa" : "Tambah Siswa Baru"}
      </h1>
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
                  <Input type="password" {...field} />
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
                  <Input type="password" {...field} />
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
                <FormLabel>Gambar Profil Siswa</FormLabel>
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
            {isEditMode ? "Simpan Perubahan" : "Tambah Siswa"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StudentForm;
