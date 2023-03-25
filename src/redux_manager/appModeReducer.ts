import { createSlice } from '@reduxjs/toolkit';

interface State {
  isLoading: boolean;
  displayTabBottom: 'none' | 'flex';
}

const initialAppState: State = {
  isLoading: false,
  displayTabBottom: 'flex',
};

const AppModeSlice = createSlice({
  name: 'APP_MODE',
  initialState: initialAppState,
  reducers: {
    onShowTabBottom: state => {
      state.displayTabBottom = 'flex';
      return state;
    },
    onHideTabBottom: state => {
      state.displayTabBottom = 'none';
      return state;
    },
  },
  extraReducers: () => {},
});
export const AppModeReducer = AppModeSlice.reducer;
export default AppModeSlice.reducer;
export const { onHideTabBottom, onShowTabBottom } = AppModeSlice.actions;
