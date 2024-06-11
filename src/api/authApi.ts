import { LoginRequestProps, LoginResponseProps } from "@/models/api/login";
import { HttpResponse } from "@/models/http";
import axiosClient, { handleRequest } from "./axiosClient";
import { UserProfileProps } from "@/models/user";

const authApi = {
  login: (
    body: LoginRequestProps
  ): Promise<HttpResponse<LoginResponseProps>> => {
    const url = "/api/admin/login";
    return handleRequest(axiosClient.post(url, body));
  },
  getUserProfile: (
    accessToken: string
  ): Promise<HttpResponse<UserProfileProps>> => {
    const url = "/api/profile";
    return handleRequest(
      axiosClient.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    );
  },
};

export default authApi;
