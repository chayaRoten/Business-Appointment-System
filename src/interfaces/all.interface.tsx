/* eslint-disable @typescript-eslint/no-unused-vars */
interface BusinessDetails {
  name: string;
  address: string;
  phone: string;
  email: string;
}


interface Meeting {
  id: number;
  date: string;
  startTime: string;
  clientName: string;
  serviceType: string;
  clientEmail: string;
  note?: string;
}

interface Service {
  id: number;
  name: string;
  cost: number;
}


interface User {
  id: number;
  username: string;
  email?: string;
  password: string;
  role: string;
}


interface ServiceType {
  id: string;
  name: string;
  [key: string]: string;
}

interface Filters {
  serviceType: string;
}

interface ServiceTypes {
  [key: string]: string;
}

interface AuthContextProps {
  user: User | null;
  signIn: (email: string, password: string, username: string) => Promise<{ success: boolean; userData?: User | null }>;
  signUp: (email: string, password: string, username: string) => Promise<{ success: boolean; userData?: User | null }>;
}

interface ServicesResponse {
  data: Service[];
}