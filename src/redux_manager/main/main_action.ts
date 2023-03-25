/* eslint-disable prettier/prettier */
export const types = {
  TOKEN_EXPIRE: 'TOKEN_EXPIRE',

  BOTTOM_TAB_OFFSET: 'BOTTOM_TAB_OFFSET',
  BOTTOM_TAB_OFFSET_SUCCESS: 'BOTTOM_TAB_OFFSET_SUCCESS',
};

const tokenExpire = () => {
  return {
    type: types.TOKEN_EXPIRE,
  };
};

const setBottomTabOffset = (params: any) => {
  return {
    type: types.BOTTOM_TAB_OFFSET,
    params,
  };
};

export default {
  tokenExpire,
  setBottomTabOffset
};
