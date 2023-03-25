/* eslint-disable prettier/prettier */
export const types = {
    GET_BOOKING_LIST:'GET_BOOKING_LIST',
    GET_BOOKING_LIST_SUCCESS:'GET_BOOKING_LIST_SUCCESS'
};
const getBookingList = (params: any, cb: any) => {
  return {
    type: types.GET_BOOKING_LIST,
    params,
    cb
};
  };
export default {
    getBookingList
};
