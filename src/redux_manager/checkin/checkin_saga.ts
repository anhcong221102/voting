/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
import {put, takeLatest, take, cancel, delay, takeEvery} from 'redux-saga/effects';
import {types} from './checkin_action';
import {apis} from "services";
import { Alert } from 'react-native';
import { dispatch } from 'navigation/RootNavigation';
import { store } from 'redux_manager/base/store';
import { onLogout } from 'redux_manager/authentication/authenticationReducer';
export function* getBookingList(data: any) {
    try {
      const response = yield apis.getBookingListAPI(data.params);
      if (response) {
        yield put({type: types.GET_BOOKING_LIST + '_SUCCESS', payload: response.data});
            data.cb && data.cb(null, response.data);
      } else {
        data.cb && data.cb(true, null);
      }
    } catch (error: any) {
      if (error && error.status && error.status === 400) {
        yield put({ type: 'TOKEN_EXPIRE' });
        store?.dispatch(onLogout());
        return;
      }
      if (error && error.data) {
        data.cb && data.cb(error.data, null);
      } else {
        data.cb && data.cb(error, null);
      }
    }
  }
  
  export function* watchGetBookingList() {
    while (true) {
      // @ts-ignore
      const watcher = yield takeEvery(types.GET_BOOKING_LIST, getBookingList);
      yield take(['LOGOUT', 'NETWORK', 'TOKEN_EXPIRE']);
      yield cancel(watcher);
    }
  }

