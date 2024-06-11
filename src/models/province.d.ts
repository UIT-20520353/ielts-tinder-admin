import { IPropertyDistrict } from "./district";

export interface IPropertyProvince {
  id: number;
  provinceName: string;
  provinceType: string;
  district: IPropertyDistrict;
}
