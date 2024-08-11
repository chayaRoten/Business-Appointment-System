import { ReactNode } from "react";
import { User } from "./user.interface";

export interface AuthContextType {
    user: User | null;
    signIn: (email: string, password: string , username: string) => Promise<{ success: boolean; userData?: any }>;
    signUp: (email: string, password: string, username:string) => Promise<{ success: boolean; userData?: any }>;
  }


  export interface AuthProviderProps {
    children: ReactNode;
  }