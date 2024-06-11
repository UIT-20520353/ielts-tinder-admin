import { IPropertyWard } from "./ward";

export interface IPropertyDistrict {
  id: number;
  districtName: string;
  districtType: string;
  lat: number;
  lng: number;
  ward: IPropertyWard;
}
