/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
import {
  put,
  takeLatest,
  take,
  cancel,
  delay,
  takeEvery,
} from 'redux-saga/effects';
import { types } from './user_action';
import { apis } from 'services';
// data: any
export function* activeCode(data: any) {
  try {
    const response = yield apis.activeCodeAPI(data.params);
    if (response) {
      yield put({ type: types.CHECK_ACTIVECODE + '_SUCCESS', payload: response });
      data.cb && data.cb(null, response);
    } else {
      data.cb && data.cb(true, null);
    }
  } catch (error: any) {
    if (error && error.data) {
      data.cb && data.cb(error.data, null);
    } else {
      data.cb && data.cb(error, null);
    }
  }
}

export function* watchActiveCode() {
  while (true) {
    const watcher = yield takeEvery(types.CHECK_ACTIVECODE, activeCode);
    yield take(['LOGOUT', 'NETWORK']);
    yield cancel(watcher);
  }
}

export function* getOTP(data: any) {
  try {
    const response = yield apis.getOTP(data.params);
    if (response && response.data) {
      yield put({ type: types.GET_OTP + '_SUCCESS', payload: response.data });
      data.cb && data.cb(null, response.data);
    } else {
      data.cb && data.cb(response, null);
    }
  } catch (error: any) {
    if (error && error.data) {
      data.cb && data.cb(error.data, null);
    } else {
      data.cb && data.cb(error, null);
    }
  }
}

export function* watchGetOTP() {
  while (true) {
    const watcher = yield takeEvery(types.GET_OTP, getOTP);
    yield take(['LOGOUT', 'NETWORK']);
    yield cancel(watcher);
  }
}

export function* activate(data: any) {
  try {
    const response = yield apis.activate(data.params);
    if (response) {
      yield put({ type: types.ACTIVATE + '_SUCCESS', payload: response });
      data.cb && data.cb(null, response);
    } else {
      data.cb && data.cb(true, null);
    }
  } catch (error: any) {
    if (error && error.data) {
      data.cb && data.cb(error.data, null);
    } else {
      data.cb && data.cb(error, null);
    }
  }
}

export function* watchActivate() {
  while (true) {
    const watcher = yield takeEvery(types.ACTIVATE, activate);
    yield take(['LOGOUT', 'NETWORK']);
    yield cancel(watcher);
  }
}

export function* checkOTP(data: any) {
  try {
    const response = yield apis.checkOTP(data.params);
    if (response) {
      yield put({ type: types.CHECK_OTP + '_SUCCESS', payload: response });
      data.cb && data.cb(null, response);
    } else {
      data.cb && data.cb(true, null);
    }
  } catch (error: any) {
    if (error && error.data) {
      data.cb && data.cb(error.data, null);
    } else {
      data.cb && data.cb(error, null);
    }
  }
}

export function* watchCheckOTP() {
  while (true) {
    const watcher = yield takeEvery(types.CHECK_OTP, checkOTP);
    yield take(['LOGOUT', 'NETWORK']);
    yield cancel(watcher);
  }
}

export function* checkNumberStore(data: any) {
  try {
    const response = yield apis.checkNumberStore(data.params);
    if (response) {
      yield put({ type: types.CHECK_NUMBER_STORE + '_SUCCESS', payload: response });
      data.cb && data.cb(null, response);
    } else {
      data.cb && data.cb(true, null);
    }
  } catch (error: any) {
    if (error && error.data) {
      data.cb && data.cb(error.data, null);
    } else {
      data.cb && data.cb(error, null);
    }
  }
}

export function* watchCheckNumberStore() {
  while (true) {
    const watcher = yield takeEvery(types.CHECK_NUMBER_STORE, checkNumberStore);
    yield take(['LOGOUT', 'NETWORK']);
    yield cancel(watcher);
  }
}

export function* login(data: any) {
  try {
    const response = yield apis.login(data.params);
    if (response) {
      yield put({ type: types.LOGIN + '_SUCCESS', payload: response });
      data.cb && data.cb(null, response);
    } else {
      data.cb && data.cb(true, null);
    }
  } catch (error: any) {
    if (error && error.data) {
      data.cb && data.cb(error.data, null);
    } else {
      data.cb && data.cb(error, null);
    }
  }
}

export function* watchLogin() {
  while (true) {
    const watcher = yield takeLatest(types.LOGIN, login);
    yield take(['LOGOUT', 'NETWORK']);
    yield cancel(watcher);
  }
}

export function* register(data:any) {
   try {
     const response = yield apis.register(data.params);
     if (response) {
      yield put({ type: types.REGISTER + '_SUCCESS', payload: response });
       data.cb && data.cb(null, response);
     } else {
       data.cb && data.cb(true, null);
     }
   } catch (error: any) {
     if (error && error.data) {
       data.cb && data.cb(error.data, null);
     } else {
       data.cb && data.cb(error, null);
     }
  }
}

export function* watchRegister() {
  while (true) {
    const watcher = yield takeEvery(types.REGISTER, register);
    yield take(['LOGOUT', 'NETWORK']);
    yield cancel(watcher);
  }
}

export function* logout() {
  yield put({ type: types.LOGOUT_SUCCESS, payload: {} });
}

export function* watchLogout() {
  while (true) {
    yield takeLatest(types.LOGOUT, logout);
  }
}

export function* getInformation(data: any) {
  try {
    yield delay(300);
    const response = yield apis.getInformation();
    if (response) {
      yield put({
        type: types.GET_INFORMATION + '_SUCCESS',
        payload: response,
      });
      data.cb && data.cb(null, response);
    } else {
      data.cb && data.cb(true, null);
    }
  } catch (error: any) {
    if(error && error.status && error.status === 400){
      yield put({type: 'TOKEN_EXPIRE'});
      return;
    }
    if (error && error.data) {
      data.cb && data.cb(error.data, null);
    } else {
      data.cb && data.cb(error, null);
    }
  }
}

export function* watchGetInformation() {
  while (true) {
    const watcher = yield takeLatest(types.GET_INFORMATION, getInformation);
    yield take(['LOGOUT', 'NETWORK', 'TOKEN_EXPIRE']);
    yield cancel(watcher);
  }
}

export function* getStateAndCity(data: any) {
  try {
    yield delay(300);
    const response = yield apis.getStateAndCityAPI(data.params);
    if (response) {
      yield put({ type: types.GET_STATEANDCITY + '_SUCCESS', payload: response });
      data.cb && data.cb(null, response);
    }
    else {
      data.cb && data.cb(true, null);
    }
  } catch (error: any) {
    if(error && error.status && error.status === 400){
      yield put({type: 'TOKEN_EXPIRE'});
      return;
    }
    if (error && error.data) {
      data.cb && data.cb(error.data, null);
    } else {
      data.cb && data.cb(null, null);
    }
  }
}

export function* watchGetStateAndCity() {
  while (true) {
    const watcher = yield takeEvery(types.GET_STATEANDCITY, getStateAndCity);
    yield take(['LOGOUT', 'NETWORK', 'TOKEN_EXPIRE']);
    yield cancel(watcher);
  }
}

export function* updateAvatar(data: any) {
  try {
    yield delay(300);
    const response = yield apis.updateAvatarAPI(data.params);
    if(response){
      yield put({type: types.UPDATE_AVATAR + '_SUCCESS', payload: response});
      data.cb && data.cb(null, response);
    }
    else {
      data.cb && data.cb(true, null);
    }
  } catch (error: any) {
    if(error && error.status && error.status === 400){
      yield put({type: 'TOKEN_EXPIRE'});
      return;
    }
    if (error && error.data) {
      data.cb && data.cb(error.data, null);
    } else {
      data.cb && data.cb(error, null);
    }
  }
}

export function* watchUpdateAvatar() {
  while (true) {
    const watcher = yield takeLatest(types.UPDATE_AVATAR, updateAvatar);
    yield take(['LOGOUT', 'NETWORK', 'TOKEN_EXPIRE']);
    yield cancel(watcher);
  }
}

export function* updateFCMToken(data: any) {
  try {
    yield delay(300);
    // @ts-ignore
    const response = yield apis.updateFCMTokenAPI(data.params);
    if(response && response.data){
      yield put({type: types.UPDATE_FCM_TOKEN + '_SUCCESS', payload: response.data});
      data.cb && data.cb(null, response);
    }
    else {
      data.cb && data.cb(response, null);
    }
  } catch (error: any) {
    if(error && error.status && error.status === 400){
      yield put({type: 'TOKEN_EXPIRE'});
      return;
    }
    if (error && error.data) {
      data.cb && data.cb(error.data, null);
    } else {
      data.cb && data.cb(error, null);
    }
  }
}

export function* watchUpdateFCMToken() {
  while (true) {
    const watcher = yield takeLatest(types.UPDATE_FCM_TOKEN, updateFCMToken);
    yield take(['LOGOUT', 'NETWORK', 'TOKEN_EXPIRE']);
    yield cancel(watcher);
  }
}
