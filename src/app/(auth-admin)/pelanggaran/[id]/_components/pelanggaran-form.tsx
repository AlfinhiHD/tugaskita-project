"use client";

import React, { useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { usePelanggaranForm } from "../_hooks/usePelanggaranForm";
import { useParams, useRouter } from "next/navigation";
import PelanggaranService from "@/app/_services/pelanggaran-service";
import { PelanggaranFormSkeleton } from "@/app/_components/skeletons";
import Swal from "sweetalert2";

const PelanggaranForm = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const isEditMode = id !== "form";

  const {
    form,
    onSubmit,
    users,
    userError,
    userLoading,
    isSubmitting,
    setIsSubmitting,
  } = usePelanggaranForm(isEditMode, id);

  const router = useRouter();

  useEffect(() => {
    const fetchPelanggaranData = async () => {
      if (isEditMode) {
        setIsSubmitting(true);
        try {
          const pelanggaranData = await PelanggaranService.getSinglePelanggaran(
            id
          );
          form.setValue("user_id", pelanggaranData.data.user_id);
          form.setValue("point", pelanggaranData.data.point);
          form.setValue("description", pelanggaranData.data.description);
          form.setValue("date", pelanggaranData.data.date.split("T")[0]);

          const selectedUser = users.find(
            (user) => user.id === pelanggaranData.data.user_id
          );
          if (selectedUser) {
            form.setValue("user_id", selectedUser.id);
          }
        } catch (error) {
          console.error("Failed to fetch pelanggaran data:", error);
          Swal.fire("Error", "Gagal memuat data pelanggaran", "error");
          router.push("/pelanggaran");
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    fetchPelanggaranData();
  }, [isEditMode, id, form, setIsSubmitting, router, users]);

  if (userError) return <div>Failed to load users</div>;
  if (userLoading) return <PelanggaranFormSkeleton />;

  return (
    <div className="w-full p-6">
      <h1 className="mt-2 text-3xl font-bold mb-6 lg:mb-12 lg:mt-0">
        {isEditMode ? "Edit Pelanggaran" : "Tambah Pelanggaran Baru"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="user_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Siswa <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih siswa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  Point <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Deskripsi <span className="text-red-500">*</span>
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
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tanggal <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : isEditMode ? (
              "Simpan Perubahan"
            ) : (
              "Tambah Pelanggaran"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PelanggaranForm;
