// hooks/usePelanggaranForm.ts
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useSWR from "swr";
import PelanggaranService from "@/app/_services/pelanggaran-service";
import SiswaService from "@/app/_services/siswa-service";
import { ResponseDTO, SiswaType } from "@/app/_constant/global-types";

const pelanggaranSchema = z.object({
  user_id: z.string().uuid({ message: "Pilih siswa" }),
  point: z.number().min(1, { message: "Point harus lebih dari 0" }),
  description: z.string().min(1, { message: "Deskripsi harus diisi" }),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Format tanggal tidak valid",
  }),
});

type PelanggaranFormData = z.infer<typeof pelanggaranSchema>;

export const usePelanggaranForm = (isEditMode: boolean, id?: string) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PelanggaranFormData>({
    resolver: zodResolver(pelanggaranSchema),
    defaultValues: {
      user_id: "",
      point: 0,
      description: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const {
    data: users,
    error: userError,
    isLoading: userLoading,
  } = useSWR<ResponseDTO<SiswaType[]>, Error>("/user", () =>
    SiswaService.getAllSiswa()
  );

  const onSubmit = async (data: PelanggaranFormData) => {
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await PelanggaranService.updatePelanggaran(id!, data);
        Swal.fire("Success", "Berhasil mengubah data pelanggaran", "success");
      } else {
        await PelanggaranService.createPelanggaran(data);
        Swal.fire("Success", "Berhasil menambahkan pelanggaran", "success");
      }
      router.push("/pelanggaran");
    } catch (error) {
      console.error("Error submitting pelanggaran:", error);
      Swal.fire(
        "Error",
        "Terjadi kesalahan saat submit data pelanggaran",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    users: users?.data || [],
    userError,
    userLoading,
    isSubmitting,
    setIsSubmitting,
  };
};