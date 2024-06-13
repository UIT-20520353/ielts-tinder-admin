import { HttpResponse } from "@/models/http";
import axiosClient, { handleRequest } from "./axiosClient";

const questionApi = {
  createQuestion: (
    body: FormData,
    token: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<HttpResponse<any>> => {
    return handleRequest(
      axiosClient.post("/api/admin/questions", body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
    );
  },
};

export default questionApi;
