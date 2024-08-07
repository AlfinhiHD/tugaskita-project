"use client"
import { useContext } from "react";
import { AuthContext } from "../_context/AuthContext";


export const useAuth = () => useContext(AuthContext);
