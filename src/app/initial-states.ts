import { EAmenityType } from "@/enums/amenity";
import { ETestLevel } from "@/enums/test";
import { EUserRole, EUserStatus } from "@/enums/user";
import { AmenityProps } from "@/models/amenity";
import { PaginationProps } from "@/models/pagination";
import { ITestDetail } from "@/models/test";
import { UserDetailProps, UserProfileProps } from "@/models/user";

export const initialUserProfile: UserProfileProps = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  gender: "",
  age: 0,
  description: "",
  avatar: "",
  token: "",
  level: ETestLevel.B2,
};

export const initialUserDetail: UserDetailProps = {
  key: "",
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  gender: "",
  age: 0,
  description: "",
  avatar: "",
  status: EUserStatus.BLOCKED,
  role: EUserRole.USER,
  level: ETestLevel.B2,
};

export const initialPagination: PaginationProps = {
  size: 10,
  page: 1,
  sort: "id,asc",
};

export const initialHotelService: AmenityProps = {
  id: -1,
  name: "",
  type: EAmenityType.PROPERTY,
};

export const initialTestDetail: ITestDetail = {
  id: 0,
  title: "",
  difficultyLevel: ETestLevel.A2,
  createdAt: "",
  questions: [],
};
