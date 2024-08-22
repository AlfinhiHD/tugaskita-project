"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from "sweetalert2";
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
import SiswaService from "@/app/_services/siswa-service";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BASE_IMAGE_URL } from "@/app/_utils/axios.instance";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const baseSchema = {
  name: z.string().min(1, { message: "Nama siswa harus diisi" }),
  email: z.string().email({ message: "Email tidak valid" }),
  address: z.string().min(1, { message: "Alamat harus diisi" }),
  school: z.string().min(1, { message: "Nama sekolah harus diisi" }),
  class: z.string().min(1, { message: "Kelas harus diisi" }),
  religion: z.string().min(1, { message: "Agama harus dipilih" }),
};

const createSchema = z
  .object({
    ...baseSchema,
    password: z.string().min(6, { message: "Kata sandi harus diisi" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Konfirmasi kata sandi harus diisi" }),
    image: z
      .any()
      .refine((files) => files?.length == 1, "Harus upload satu gambar.")
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `Ukuran maksimum adalah 5MB.`
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Format file tidak valid"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  })
  .refine(
    (data) =>
      ["Islam", "Kristen", "Katolik", "Hindu", "Buddha"].includes(
        data.religion
      ),
    {
      message: "Pilih salah satu agama yang tersedia",
      path: ["religion"],
    }
  );

const editSchema = z
  .object({
    ...baseSchema,
    password: z
      .string()
      .min(6, { message: "Kata sandi harus diisi" })
      .optional()
      .or(z.literal("")),
    confirmPassword: z
      .string()
      .min(6, { message: "Konfirmasi kata sandi harus diisi" })
      .optional()
      .or(z.literal("")),
    image: z
      .any()
      .optional()
      .refine(
        (files) =>
          !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
        `Ukuran maksimum adalah 5MB.`
      )
      .refine(
        (files) =>
          !files ||
          files.length === 0 ||
          ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Format file tidak valid"
      ),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  })
  .refine(
    (data) =>
      ["Islam", "Kristen", "Katolik", "Hindu", "Buddha"].includes(
        data.religion
      ),
    {
      message: "Pilih salah satu agama yang tersedia",
      path: ["religion"],
    }
  );

const StudentForm = () => {
  const router = useRouter();
  const params = useParams();
  const isEditMode = params.id !== "form";

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(isEditMode ? editSchema : createSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      school: "",
      class: "",
      password: "",
      confirmPassword: "",
      image: undefined,
      religion: "",
    },
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      if (isEditMode) {
        setIsLoading(true);
        try {
          const studentData = await SiswaService.getSingleSiswa(params.id);
          form.setValue("name", studentData.data.name);
          form.setValue("email", studentData.data.email);
          form.setValue("address", studentData.data.address);
          form.setValue("school", studentData.data.school);
          form.setValue("class", studentData.data.class);
          form.setValue("religion", studentData.data.religion || "");
          const fullImageUrl = studentData.data.image
            ? `${BASE_IMAGE_URL}${studentData.data.image.replace(
                "public/",
                ""
              )}`
            : null;

          setPreviewUrl(fullImageUrl);
        } catch (error) {
          console.error("Failed to fetch student data:", error);
          Swal.fire("Error", "Gagal memuat data siswa", "error");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchStudentData();
  }, [isEditMode, params.id, form]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("school", data.school);
    formData.append("class", data.class);
    formData.append("religion", data.religion);

    if (data.password) {
      formData.append("password", data.password);
    }

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      if (isEditMode) {
        await SiswaService.updateSiswa(params.id, formData);
        Swal.fire("Success", "Berhasil mengubah data siswa", "success");
      } else {
        await SiswaService.createSiswa(formData);
        Swal.fire("Success", "Berhasil menambahkan siswa baru", "success");
      }
      router.push("/siswa");
    } catch (error) {
      console.error("Error submitting student:", error);
      Swal.fire("Error", "Terjadi kesalahan saat submit data siswa", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      form.setValue("image", [file]);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="w-full p-6">
      <h1 className="mt-2 text-3xl font-bold mb-6 lg:mb-12 lg:mt-0">
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Alamat <span className="text-red-500">*</span>
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
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Sekolah <span className="text-red-500">*</span>
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
            name="class"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Kelas <span className="text-red-500">*</span>
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
                  value={field.value || undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Agama" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Islam">Islam</SelectItem>
                    <SelectItem value="Kristen">Kristen</SelectItem>
                    <SelectItem value="Katolik">Katolik</SelectItem>
                    <SelectItem value="Hindu">Hindu</SelectItem>
                    <SelectItem value="Buddha">Buddha</SelectItem>
                  </SelectContent>
                </Select>
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
                  Kata Sandi{" "}
                  {!isEditMode && <span className="text-red-500">*</span>}
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
                  Konfirmasi Kata Sandi{" "}
                  {!isEditMode && <span className="text-red-500">*</span>}
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
                <FormLabel>
                  Upload Gambar Siswa{" "}
                  {!isEditMode && <span className="text-red-500">*</span>}
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center justify-center w-full">
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      {previewUrl ? (
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          width={200}
                          height={200}
                          className="h-full object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Klik untuk upload
                            </span>{" "}
                            atau drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG, WEBP (MAX. 5MB)
                          </p>
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

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : isEditMode ? (
              "Simpan Perubahan"
            ) : (
              "Tambah Siswa"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StudentForm;
