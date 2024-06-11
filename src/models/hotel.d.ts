import { EHotelStatus } from "@/enums/hotel";
import { IPropertyProvince } from "./province";
import { IRoom } from "./room";
import { IPropertyArgent } from "./user";

export interface IHotelImage {
  id: number;
  imageUrl: string;
}

export interface IHotelAmenity {
  id: number;
  name: string;
}

export interface IHotel {
  key?: number | string;
  id: number;
  name: string;
  description: string;
  address: string;
  longitude: number;
  latitude: number;
  depositPercent: number;
  status: EHotelStatus;
  images: IHotelImage[];
  amenities: IHotelAmenity[];
  province: IPropertyProvince;
  argent: IPropertyArgent;
  rooms: IRoom[];
}
