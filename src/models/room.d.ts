import { ERoomStatus } from "@/enums/room";

export interface IRoomImage {
  id: number;
  imageUrl: string;
}

export interface IRoomAmenity {
  id: number;
  name: string;
}

export interface IRoom {
  id: number;
  name: string;
  price: number;
  status: ERoomStatus;
  images: IRoomImage[];
  amenities: IRoomAmenity[];
}
