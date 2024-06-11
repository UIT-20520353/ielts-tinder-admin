import { ITest, ITestDetail } from "@/models/test";
import axiosClient, { handleRequest } from "./axiosClient";
import { HttpHeaders, HttpResponse } from "@/models/http";
import { PaginationProps } from "@/models/pagination";
import { ETestLevel } from "@/enums/test";

const testApi = {
  getAllTest: (
    headers: HttpHeaders,
    pagination: PaginationProps,
    filter: { id: string; name: string; level: ETestLevel[] }
  ): Promise<HttpResponse<ITest[]>> => {
    const url = "/api/admin/tests";
    return handleRequest(
      axiosClient.get(url, {
        headers: {
          ...headers,
        },
        params: {
          size: pagination.size,
          sort: "createdAt,desc",
          page: pagination.page - 1,
          "testId.equals": filter.id || null,
          "name.contains": filter.name || null,
          "level.in": filter.level.length ? filter.level.join(",") : null,
        },
      })
    );
  },
  createTest: (
    headers: HttpHeaders,
    body: { name: string; level: ETestLevel }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<HttpResponse<any>> => {
    const url = "/api/admin/tests";
    return handleRequest(
      axiosClient.post(url, body, {
        headers: {
          ...headers,
        },
      })
    );
  },
  getTestById: (
    id: number,
    headers: HttpHeaders
  ): Promise<HttpResponse<ITestDetail>> => {
    const url = `/api/admin/tests/${id}`;
    return handleRequest(
      axiosClient.get(url, {
        headers: {
          ...headers,
        },
      })
    );
  },
};

export default testApi;
