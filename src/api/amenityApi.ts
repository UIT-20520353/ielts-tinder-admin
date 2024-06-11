/* eslint-disable @typescript-eslint/no-explicit-any */
import { AmenityProps } from "@/models/amenity";
import { HttpHeaders, HttpResponse } from "@/models/http";
import axiosClient, { handleRequest } from "./axiosClient";
import { PaginationProps } from "@/models/pagination";
import { EAmenityType } from "@/enums/amenity";

const amenityApi = {
  deleteAmenity: (
    id: number,
    headers: HttpHeaders
  ): Promise<HttpResponse<any>> => {
    const url = `/api/amenities/${id}`;
    return handleRequest(
      axiosClient.delete(url, {
        headers: {
          ...headers,
        },
      })
    );
  },
  getAllAmenities: (
    headers: HttpHeaders,
    pageable: PaginationProps,
    filter: { id: string; name: string; type: EAmenityType[] }
  ): Promise<HttpResponse<AmenityProps[]>> => {
    const url = "/api/amenities";
    return handleRequest(
      axiosClient.get(url, {
        headers: {
          ...headers,
        },
        params: {
          size: pageable.size,
          sort: pageable.sort,
          page: pageable.page - 1,
          "id.equals": filter.id || null,
          "name.contains": filter.name || null,
          "type.in": filter.type.length ? filter.type.join(",") : null,
        },
      })
    );
  },
  createAmenity: (
    name: string,
    type: EAmenityType,
    headers: HttpHeaders
  ): Promise<HttpResponse<any>> => {
    const url = "/api/amenities";
    return handleRequest(
      axiosClient.post(url, { name, type }, { headers: { ...headers } })
    );
  },
  updateAmenity: (
    id: number,
    name: string,
    type: EAmenityType,
    headers: HttpHeaders
  ): Promise<HttpResponse<any>> => {
    const url = `/api/amenities/${id}`;
    return handleRequest(
      axiosClient.patch(url, { name, type }, { headers: { ...headers } })
    );
  },
};

export default amenityApi;
