import { ICustomer } from './customer';
import { IService } from './service';
export interface IBooking {
  id: number;
  code: string;
  customer: ICustomer;
  services?: IService[];
  products: any;
  customerFrom:string
}

