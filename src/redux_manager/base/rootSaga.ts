import { all } from 'redux-saga/effects';
import {
  watchLogin,
  watchRegister,
  watchGetInformation,
  watchLogout,
  watchGetStateAndCity,
  watchActiveCode,
  watchGetOTP,
  watchActivate,
  watchCheckOTP,
  watchCheckNumberStore,
  watchUpdateAvatar,
  watchUpdateFCMToken
} from '../user/user_saga';




import {watchTokenExpire} from 'redux_manager/main/main_saga';
import {watchGetBookingList} from 'redux_manager/checkin/checkin_saga';



export default function* rootSaga() {
  yield all([
    //user
    watchLogin(),
    watchRegister(),
    watchGetInformation(),
    watchLogout(),
    watchGetStateAndCity(),
    watchActiveCode(),
    watchGetOTP(),
    watchActivate(),
    watchCheckOTP(),
    watchCheckNumberStore(),
    watchUpdateAvatar(),
    watchUpdateFCMToken(),
    watchTokenExpire(),
    watchGetBookingList(),

  ]);
}
