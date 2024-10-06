import { ReactNode } from "react";
import { User } from "./user.interface";

export interface AuthContextType {
    user: User | null;
    signIn: (email: string, password: string , username: string) => Promise<{ success: boolean; userData?: unknown }>;
    signUp: (email: string, password: string, username:string) => Promise<{ success: boolean; userData?: unknown, error?: string; }>;
  }


  export interface AuthProviderProps {
    children: ReactNode;
  }