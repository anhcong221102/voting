/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
import { put, takeLatest, take, cancel, delay } from 'redux-saga/effects';
import { types } from './main_action';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { network } from "services";
import { Config } from "utils";
import { allActions, store } from "redux_manager";
import { onLogout } from 'redux_manager/authentication/authenticationReducer';

export function* tokenExpire() {
    yield delay(300);
    Config.alertMess({ message: "Your session has expired. Please login again." });
    try {
        yield AsyncStorage.removeItem('access_token');
        yield AsyncStorage.removeItem('pinCode');
        network.setToken('');
        yield put({ type: 'GET_INFORMATION_SUCCESS', payload: null });
        yield put({ type: 'CLEAR_UNREAD_NOTIFICATION', payload: null });
        store?.dispatch(onLogout())
    }
    catch (e) {
        console.log("tokenExpire error", e);
    
       
    }
}

export function* watchTokenExpire() {
    yield takeLatest(types.TOKEN_EXPIRE, tokenExpire);
}
