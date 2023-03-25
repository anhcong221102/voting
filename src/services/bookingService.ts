/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IProductBooking, ServiceBooking } from 'types/booking';
import { ServiceApi } from './request';

const getBooking = (params: {
  date: string | Date;
  customerFrom: 'ALL' | 'STORE' | 'HOTLINE' | 'BEAUTY_SOCIAL';
}) => {
  return ServiceApi.Get(
    `booking/list-booking?date=${params.date}&customerFrom=${params.customerFrom}`,
  );
};

const getBookingWaiting = (params: string) => {
  return ServiceApi.Get(`booking/list-waiting?search=${params}`);
};

const getBookingServing = (params: string) => {
  return ServiceApi.Get(`booking/list-serving?search=${params}`);
};

const getBookingDetail = (params: string) => {
  return ServiceApi.Get(`booking/detail/${params}`);
};

const getTechnician = (serviceId: string) => {
  return ServiceApi.Get(`employee/list?serviceId=${serviceId}&limit=10000&`);
};

interface ICreateBooking {
  customerId: string;
  checkingTime: string | Date;
  services: ServiceBooking[];
  products: IProductBooking[];
  customerFrom: string;
  deposit: number;
}
interface PosTerminal {
  amount: number;
  last4: string;
  refNo: string;
  receiptPicture: string;
};
const createBooking = (params: ICreateBooking) => {
  return ServiceApi.Post(`booking/create`, params);
};

interface ICheckIn {
  bookingId: string;
  cashPayment: number;
  posPayment:PosTerminal[];
}

const checkIn = (params: ICheckIn) => {
  return ServiceApi.Post(`booking/check-in`, params);
};
const bookingUpdate = (params: any) => {
  return ServiceApi.Put(`booking/update/${params._id}`, params);
};

export default {
  getBooking,
  getBookingDetail,
  getBookingWaiting,
  getBookingServing,
  getTechnician,
  createBooking,
  checkIn,
  bookingUpdate,
};
