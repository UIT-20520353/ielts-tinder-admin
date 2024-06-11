import { IBank } from "@/models/bank";
import { HttpHeaders, HttpResponse } from "@/models/http";
import axiosClient, { handleRequest } from "./axiosClient";

const bankApi = {
  getBankList: (headers: HttpHeaders): Promise<HttpResponse<IBank[]>> => {
    return handleRequest(
      axiosClient.get("/api/banks", {
        headers: {
          ...headers,
        },
      })
    );
  },
};

export default bankApi;
