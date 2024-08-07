"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextType {
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const pathname = usePathname();
  console.log("pathname", pathname.split("/")[1]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (
//       !token &&
//       pathname.split("/")[1] !== "landing" &&
//       pathname.split("/")[1] !== "register" &&
//       pathname.split("/")[1] !== ""
//     ) {
//       router.push("/login");
//     } else {
//     }
//   }, []);

  const login = (token: string) => {
    console.log(token);
    localStorage.setItem("token", token);
    router.push("/admin");
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
