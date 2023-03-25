/* eslint-disable prettier/prettier */
export const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',

  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

  LOGIN_SUCCESS: 'LOGIN_SUCCESS',

  GET_INFORMATION: 'GET_INFORMATION',
  GET_INFORMATION_SUCCESS: 'GET_INFORMATION_SUCCESS',

  REGISTER: 'REGISTER',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',

  GET_STATEANDCITY:'GET_STATEANDCITY',
  GET_STATEANDCITY_SUCCESS:'GET_STATEANDCITY_SUCCESS',

  CHECK_ACTIVECODE:'CHECK_ACTIVECODE',
  CHECK_ACTIVECODE_SUCCESS:'CHECK_ACTIVECODE_SUCCESS',

  GET_OTP:'GET_OTP',
  GET_OTP_SUCCESS:'GET_OTP_SUCCESS',

  ACTIVATE:'ACTIVATE',
  ACTIVATE_SUCCESS:'ACTIVATE_SUCCESS',

  CHECK_OTP:'CHECK_OTP',
  CHECK_OTP_SUCCESS:'CHECK_OTP_SUCCESS',

  CHECK_NUMBER_STORE:'CHECK_NUMBER_STORE',
  CHECK_NUMBER_STORE_SUCCESS:'CHECK_NUMBER_STORE_SUCCESS',

  UPDATE_AVATAR:'UPDATE_AVATAR',
  UPDATE_AVATAR_SUCCESS:'UPDATE_AVATAR_SUCCESS',

  UPDATE_FCM_TOKEN: 'UPDATE_FCM_TOKEN',
  UPDATE_FCM_TOKEN_SUCCESS: 'UPDATE_FCM_TOKEN_SUCCESS'
};

const login = (params: any, cb: any) => {
  return {
    type: types.LOGIN,
    params,
    cb,
  };
};

const register = (params: any, cb: any) => {
  return {
    type: types.REGISTER,
    params,
    cb,
  };
};

const getInformation = (params: any, cb: any) => {
  return {
    type: types.GET_INFORMATION,
    params,
    cb,
  };
};
const getStateAndCity = (params: any, cb: any) => {
  return {
    type: types.GET_STATEANDCITY,
    params,
    cb,
  };
};
const activeCode = (params: any, cb: any) => {
  return {
    type: types.CHECK_ACTIVECODE,
    params,
    cb,
  };
};
const getOTP = (params: any, cb: any) => {
  return {
    type: types.GET_OTP,
    params,
    cb,
  };
};
const activate = (params: any, cb: any) => {
  return {
    type: types.ACTIVATE,
    params,
    cb,
  };
};
const checkOTP = (params: any, cb: any) => {
  return {
    type: types.CHECK_OTP,
    params,
    cb,
  };
};
const checkNumberStore = (params: any, cb: any) => {
  return {
    type: types.CHECK_NUMBER_STORE,
    params,
    cb,
  };
};

const updateAvatar = (params: any, cb: any) => {
  return {
    type: types.UPDATE_AVATAR,
    params,
    cb,
  };
};

const logout = () => {
  return {
    type: types.LOGOUT,
  };
};

const updateFCMToken = (params: any) => {
  return {
    type: types.UPDATE_FCM_TOKEN,
    params,
  };
};

export default {
  login,
  register,
  getInformation,
  logout,
  getStateAndCity,
  activeCode,
  getOTP,
  activate,
  checkOTP,
  checkNumberStore,
  updateAvatar,
  updateFCMToken,
};
