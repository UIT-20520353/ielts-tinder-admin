import { IHotel } from "@/models/hotel";
import { HttpHeaders, HttpResponse } from "@/models/http";
import axiosClient, { handleRequest } from "./axiosClient";

const hotelApi = {
  getAllHotels: (headers: HttpHeaders): Promise<HttpResponse<IHotel[]>> => {
    const url = "/api/argent/properties";
    return handleRequest(axiosClient.get(url, { headers: { ...headers } }));
  },
  deleteHotel: (
    id: number,
    headers: HttpHeaders
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<HttpResponse<any>> => {
    const url = `/api/argent/properties/${id}`;
    return handleRequest(axiosClient.delete(url, { headers: { ...headers } }));
  },
};

export default hotelApi;
