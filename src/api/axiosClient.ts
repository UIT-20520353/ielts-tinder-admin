import AxiosResponseData from "@/models/api/axios";
import { BadRequestFieldError, HttpResponse } from "@/models/http";
import { isEmptyObject } from "@/utils/common-util";
import axios, { AxiosResponse } from "axios";
// import parse from "parse-link-header";

const axiosClient = axios.create({
  // baseURL: "http://54.255.249.131:8080/",
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  // @ts-expect-error: we want to return the different data type
  (response: AxiosResponse<AxiosResponseData>) => {
    const { status, data: responseData, headers } = response;

    const data: HttpResponse<object> = {
      status,
      ok: true,
      body: responseData,
    };

    if (headers.link) {
      data.pagination = {
        // paging: parse(String(headers.link)),
        total: Number(headers["x-total-count"]),
      };
    }

    return data;
  },
  ({ response }) => {
    const { status, data } = response as AxiosResponse;
    const fieldErrors: BadRequestFieldError = {};

    if (data?.fieldErrors?.length) {
      data.fieldErrors.forEach(
        ({ field, messageCode }: { field: string; messageCode: string }) => {
          if (fieldErrors[field]) {
            fieldErrors[field].push(messageCode);
          } else {
            fieldErrors[field] = [messageCode];
          }
        }
      );
    }

    const error: HttpResponse = {
      status,
      ok: false,
      error: {
        unauthorized: status === 401,
        badRequest: status === 400,
        notFound: status === 404,
        clientError: status >= 400 && status <= 499,
        serverError: status >= 500 && status <= 599,
        message: data.detail,
        title: `${data.detail}-title`,
        fieldErrors: isEmptyObject(fieldErrors) ? undefined : fieldErrors,
        errors: data.errors,
        detail: data.detail,
        data: data.data,
      },
    };

    return Promise.reject(error);
  }
);

const handleRequest = (promise: Promise<HttpResponse>) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promise.then((res) => res).catch((err) => err as HttpResponse<any>);

export default axiosClient;

export { handleRequest };
