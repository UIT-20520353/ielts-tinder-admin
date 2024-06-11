export interface IBank {
  id: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  qrCode: string;
  isDefault: boolean;
  createAt: string;
}
