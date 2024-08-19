import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import KeagamaanService from "@/app/_services/keagamaan-service";
import { SubmitKeagamaanTaskType, RequestKeagamaanTaskType } from "@/app/_constant/global-types";

const schema = z.object({
  message: z.string().min(1, "Pesan harus diisi"),
  points: z.number().min(0, "Poin tidak boleh negatif").optional(),
});

const TinjauTugasKeagamaanDialog = ({
  task,
  openDialog,
  setOpenDialog,
}: {
  task: SubmitKeagamaanTaskType | RequestKeagamaanTaskType;
  openDialog: string | null;
  setOpenDialog: (id: string | null) => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [actionType, setActionType] = useState<"accept" | "reject" | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  if (!task) return null;

  const handleAction = (type: "accept" | "reject") => {
    setActionType(type);
    setShowForm(true);
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsSubmitting(true);
    try {
      const payload = {
        message: data.message,
        status: actionType === "accept" ? "Diterima" : "Ditolak",
        ...(data.points !== undefined && { points: data.points }),
      };

      let response;
      if ('task_name' in task) {
        response = await KeagamaanService.updateStatusSubmitReligionTask(task.id, payload);
      } else {
        response = await KeagamaanService.updateStatusReqReligionTask(task.id, payload);
      }

      if (response.status === 200) {
        setOpenDialog(null);
        setShowForm(false);
        form.reset();

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: `Tugas telah ${actionType === "accept" ? "diterima" : "ditolak"}. Silahkan refresh browser anda.`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Terjadi kesalahan saat memperbarui tugas.`,
      });
    } finally {
      setOpenDialog(null);
      setShowForm(false);
      form.reset();
      setIsSubmitting(false);
      window.location.reload()
    }
  };

  return (
    <Dialog
      open={openDialog === task.id}
      onOpenChange={(open) => {
        setOpenDialog(open ? task.id : null);
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
      <DialogContent className="w-full max-w-[95vw] md:max-w-[80vw] lg:max-w-[60vw] xl:max-w-[50vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-col sm:flex-row items-center mb-4">
          <div className="flex items-center">
            <Image
              src="/assets/images/dialog-header.png"
              alt="Dialog Header"
              width={24}
              height={27}
            />
            <DialogTitle className="ml-2 text-base sm:text-lg">
              {'task_name' in task ? task.task_name : task.title}
            </DialogTitle>
          </div>
          <div
            className={`mt-2 sm:mt-0 rounded-xl py-1 px-2 font-semibold text-xs ${
              task.status === "Diterima"
                ? "bg-green-400 text-green-800"
                : task.status === "Perlu Review"
                ? "bg-yellow-400 text-yellow-800"
                : task.status === "Ditolak"
                ? "bg-red-400 text-red-800"
                : "bg-gray-400"
            }`}
          >
            {task.status}
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Image
            src={task.image}
            alt="No pic found"
            width={300}
            height={225}
            className="w-full max-w-[300px] h-auto object-contain mx-auto"
          />
          <div className="flex-1 text-sm">
            <p className="mb-1">
              <strong>Nama Siswa:</strong> {'username' in task ? task.username : task.user_name}
            </p>
            <p className="mb-1">
              <strong>Tanggal Pengajuan:</strong> {new Date(task.created_at).toLocaleString()}
            </p>
            {'point' in task && (
              <p className="mb-1">
                <strong>Point diajukan:</strong> {task.point}
              </p>
            )}
            <p className="mt-2">
              <strong>Keterangan Siswa:</strong>
              <br />
              <span className="text-xs">{task.description}</span>
            </p>
          </div>
        </div>
        {task.status === "Perlu Review" ? (
          !showForm ? (
            <div className="flex gap-x-2 justify-end mt-4">
              <Button
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1"
                onClick={() => handleAction("reject")}
              >
                Tolak
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1"
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
                        Pesan {actionType === "accept" ? "Penerimaan" : "Penolakan"}
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

                {'point' in task && (
                  <FormField
                    control={form.control}
                    name="points"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Poin</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Masukkan poin"
                            className="w-full text-black text-sm"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

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
          )
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default TinjauTugasKeagamaanDialog;