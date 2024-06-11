import { HttpHeaders, HttpResponse } from "@/models/http";
import { UserDetailProps } from "@/models/user";
import axiosClient, { handleRequest } from "./axiosClient";
import { PaginationProps } from "@/models/pagination";
import { EUserStatus } from "@/enums/user";
import { ETestLevel } from "@/enums/test";

const userApi = {
  getUserList: (
    headers: HttpHeaders,
    pagination: PaginationProps,
    filter: {
      id: string;
      name: string;
      status: EUserStatus[];
      email: string;
      level: ETestLevel[];
    }
  ): Promise<HttpResponse<UserDetailProps[]>> => {
    const url = "/api/admin/users";
    return handleRequest(
      axiosClient.get(url, {
        headers: {
          ...headers,
        },
        params: {
          size: pagination.size,
          sort: pagination.sort,
          page: pagination.page - 1,
          "role.notEquals": "ADMIN",
          "id.equals": filter.id || null,
          "name.contains": filter.name || null,
          "status.in": filter.status.length ? filter.status.join(",") : null,
          "level.in": filter.level.length ? filter.level.join(",") : null,
        },
      })
    );
  },
  getUserDetail: (
    headers: HttpHeaders,
    userId: string
  ): Promise<HttpResponse<UserDetailProps>> => {
    const url = `/api/admin/users/${userId}`;
    return handleRequest(
      axiosClient.get(url, {
        headers: {
          ...headers,
        },
      })
    );
  },
  updateUserStatus: (
    headers: HttpHeaders,
    status: EUserStatus,
    userId: string
  ) => {
    const url = `/api/admin/users/${userId}`;
    return handleRequest(
      axiosClient.patch(
        url,
        { status },
        {
          headers: {
            ...headers,
          },
        }
      )
    );
  },
  blockUser: (
    headers: HttpHeaders,
    userId: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<HttpResponse<any>> => {
    const url = `/api/admin/users/${userId}/block`;
    return handleRequest(
      axiosClient.post(url, null, {
        headers: {
          ...headers,
        },
      })
    );
  },
  unblockUser: (
    headers: HttpHeaders,
    userId: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<HttpResponse<any>> => {
    const url = `/api/admin/users/${userId}/unblock`;
    return handleRequest(
      axiosClient.post(url, null, {
        headers: {
          ...headers,
        },
      })
    );
  },
};

export default userApi;
