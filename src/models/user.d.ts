import { ETestLevel } from "@/enums/test";
import { EUserStatus, EUserRole } from "@/enums/user";

export interface UserProfileProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  gender: string;
  age: number;
  description: string;
  avatar: string;
  token: string;
  level: ETestLevel;
}

export interface UserDetailProps {
  key?: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  gender: string;
  age: number;
  description: string;
  avatar: string;
  status: EUserStatus;
  role: EUserRole;
  level: ETestLevel;
}

export interface IPropertyArgent {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: EUserRole;
  status: EUserStatus;
}
