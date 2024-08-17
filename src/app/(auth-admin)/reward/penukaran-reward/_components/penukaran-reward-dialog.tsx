import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import instance from "@/app/_utils/axios.instance";
import Swal from "sweetalert2";

const submissionSchema = z.object({
  message: z.string().min(1, "Pesan harus diisi"),
});

const PenukaranRewardDialog = ({ reward, openDialog, setOpenDialog }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [actionType, setActionType] = useState(null);

  const form = useForm({
    resolver: zodResolver(submissionSchema),
  });

  const handleAction = (type) => {
    setActionType(type);
    setShowForm(true);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        message: data.message,
      };

      const response = await instance.put(
        `/admin-reward/user/${reward.id}`,
        payload
      );

      if (response.status === 200) {
        setOpenDialog(null);
        setShowForm(false);
        form.reset();

        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: `Reward telah ${
              actionType === "accept" ? "diterima" : "ditolak"
            }. Silahkan refresh browser anda.`,
          });
        }, 100);
      }
    } catch (error) {
      setOpenDialog(null);
      setShowForm(false);
      form.reset();
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Terjadi kesalahan saat memperbarui status reward.`,
      });
    } finally {
      setOpenDialog(null);
      setShowForm(false);
      form.reset();
      setIsSubmitting(false);
    }
  };

  if (!reward) return null;

  return (
    <Dialog
      open={openDialog === reward.id}
      onOpenChange={(open) => {
        setOpenDialog(open ? reward.id : null);
        if (!open) {
          setShowForm(false);
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-blue-100" size="sm">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Image
            src="/assets/images/dialog-header.png"
            alt="Dialog Header"
            width={32}
            height={36}
          />
          <DialogTitle>
            {reward.reward_name} {"("}
            {reward.amount}
            {") pcs"}{" "}
          </DialogTitle>
          <div
            className={`rounded-xl py-2 px-3 font-semibold ${
              reward.status === "Diterima"
                ? "bg-green-400 text-green-800"
                : reward.status === "Perlu Review"
                ? "bg-yellow-400 text-yellow-800"
                : reward.status === "Ditolak"
                ? "bg-red-400 text-red-800"
                : "bg-gray-400"
            }`}
          >
            {reward.status}
          </div>
        </DialogHeader>
        <div className="mt-4">
          <div>
            <p className="text-base/8">
              <strong>Nama Siswa : </strong>
              <span className="font-light">{reward.user_name}</span>
            </p>
            <p className="text-base/8 mt-2">
              <strong>Tanggal Pengajuan : </strong>
              <span className="font-light">{reward.created_at}</span>
            </p>
            <p className="text-base/8 mt-2">
              <strong>Harga Item : </strong>
              <span className="font-light">{reward.price}</span>
            </p>
            <p className="text-base/8 mt-2">
              <strong>Jumlah Item : </strong>
              <span className="font-light">{reward.amount}</span>
            </p>
            <p className="text-base/8 mt-2">
              <strong>Total Harga : </strong>
              <span className="font-light">{reward.total_price}</span>
            </p>
          </div>
        </div>
        {reward.status === "Perlu Review" &&
          (!showForm ? (
            <div className="flex gap-x-6 justify-end mt-6">
              <Button
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={() => handleAction("reject")}
              >
                Tolak
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => handleAction("accept")}
              >
                Terima
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4 space-y-4"
              >
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Pesan{" "}
                        {actionType === "accept" ? "Penerimaan" : "Penolakan"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={`Masukkan pesan ${
                            actionType === "accept" ? "penerimaan" : "penolakan"
                          }`}
                          className="w-full text-black text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-x-2 justify-end mt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Mengirim..." : "Kirim"}
                  </Button>
                </div>
              </form>
            </Form>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default PenukaranRewardDialog;
