/* eslint-disable prettier/prettier */
import { types } from './user_action';

const initialState = {
  profile: null,
  state: null
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case types.GET_INFORMATION_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        token: false,
        profile: action.payload,
      };
    case types.GET_STATEANDCITY_SUCCESS:
      return {
        ...state,
        state: action.payload,
      };

    default:
      return state;
  }
}
