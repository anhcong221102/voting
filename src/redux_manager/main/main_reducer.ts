/* eslint-disable prettier/prettier */
import {types} from './main_action';
import {Animated} from "react-native";
import {device} from "device";

const initialState = {
  bottomTabOffset: (-2 * device.w) / 5
};

export default function (
  state = initialState,
  action = {type: '', payload: ''},
) {
  switch (action.type) {
    case types.BOTTOM_TAB_OFFSET_SUCCESS:
      return {
        ...state,
        bottomTabOffset: action.payload,
      };
    default:
      return state;
  }
}
