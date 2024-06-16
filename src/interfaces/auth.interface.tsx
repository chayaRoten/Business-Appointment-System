import { ReactNode } from "react";
import { User } from "./user.interface";

export interface AuthContextType {
    user: User | null;
    signIn: (email: string, password: string , username: string) => Promise<void>;
    signUp: (email: string, password: string, username:string) => Promise<void>;
  }


  export interface AuthProviderProps {
    children: ReactNode;
  }