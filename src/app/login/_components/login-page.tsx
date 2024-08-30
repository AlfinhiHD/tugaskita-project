"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { LoginValue } from "@/app/_constant/global-types";
import instance from "@/app/_utils/axios.instance";
import { useAuth } from "@/app/_hooks/useAuth";
import Swal from "sweetalert2";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email tidak boleh kosong" })
    .email({ message: "Email tidak valid" }),
  password: z
    .string()
    .min(1, { message: "Password tidak boleh kosong" })
    .min(6, { message: "Password minimal 6 karakter" }),
  rememberMe: z.boolean().default(false),
});

export default function LoginPage() {
  const [authError, setAuthError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const auth = useAuth();
  const { login } = auth;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (values: LoginValue) => {
    setIsLoading(true);
    setAuthError("");
    console.log(values);
    const { email, password } = values;
    try {
      const response = await instance.post("/user/login", {
        email,
        password,
      });
      if (response.data.token) {
        login(response.data.token);
        Swal.fire("Success", "Berhasil login", "success");
      } else {
        setAuthError("Email atau password ada yang salah!");
      }
    } catch (error) {
      setAuthError("Email atau password ada yang salah!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-blue-600 flex flex-col p-20">
        <div className="flex items-center mb-8">
          <Image
            src="/assets/logo/logo-taruna-nusantara.png"
            alt="Tugas kita logo"
            width={50}
            height={50}
          />
          <h2 className="text-xl font-bold text-white ml-4">TugasKita</h2>
        </div>
        <Image
          src="/assets/images/login-image.png"
          alt="Login Image"
          width={400}
          height={400}
          className="mb-8 mx-auto"
        />
        <h1 className="text-2xl font-normal text-white my-4 md:px-12 px-6 sm:px-8 ">
          Selesaikan <b>tugas</b> dan dapatkan hadiah yang <b>menarik!</b>
        </h1>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center p-2">
        <div className="w-full px-14">
          <div className="mb-6 mt-3">
            <h2 className="text-2xl font-extrabold mb-1">Masuk</h2>
            <p className="mb-6 font-medium">
              Selamat datang, semangat bekerja dan semoga harimu menyenangkan!
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan email Anda" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukkan password Anda"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Remember me</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              {authError && <p className="text-red-500 text-sm">{authError}</p>}
              <Button
                type="submit"
                className="w-full"
                variant="default"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
