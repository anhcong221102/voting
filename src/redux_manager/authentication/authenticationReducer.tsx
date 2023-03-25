import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authenticationService from 'services/authenticationService';
import { IProfile } from 'types/profile';
import { IUser } from 'types/user';
interface State {
  isLoading: boolean;
  user?: IUser;
  profile: IProfile | {};
  token: string | '';
  isError: boolean;
  message: string | '';
  isSupport:boolean;
  biometryType:string;
}

export const loginAction = createAsyncThunk(
  'AUTHENTICATION/LOGIN',
  async (params: { storeNumber: number; pinCode: string }) => {
    const data = await authenticationService.login(params);
    return data;
  },
);

const initialAppState: State = {
  isLoading: false,
  user: {
    profile: {
      firstName: '',
      lastName: '',
      aliasName: '',
      avatar: null,
      phone: '',
      gender: 'FEMALE',
      birthday: null,
      address: '',
      workingLicense: '',
      joinedDate: null,
    },
    roles: [],
    logins: [],
    position: '',
    rating: 0,
    star: 0,
    isActive: true,
    isDeleted: false,
    _id: '',
    email: '',
    storeId: '',
    createdAt: '',
    updatedAt: '',
    services: [],
    __v: 0,
  },
  profile: {
    address: '',
    aliasName: '',
    avatar: null,
    birthday: null,
    firstName: '',
    gender: '',
    joinedDate: null,
    lastName: '',
    phone: '',
    workingLicense: '',
  },
  token: '',
  isError: false,
  message: '',
  isSupport:false,
  biometryType:'',
};

const AuthenticationSlice = createSlice({
  name: 'AUTHENTICATION',
  initialState: initialAppState,
  reducers: {
    onCloseModalAuthenticationMessage: state => {
      state.isError = false;
      return state;
    },
    onLogout: state => {
      state.token = '';
      state.profile = {};
      state.user = {};
      return state;
    },
    changeIsSupport(state, action: PayloadAction<boolean>) {
      state.isSupport = action.payload;
    },
    changeBiometryType(
      state,
      action: PayloadAction<string | 'TouchID' | 'FaceID'>,
    ) {
      state.biometryType = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAction.pending, state => {
      state.isLoading = true;
      state.user = {};
      return state;
    });

    builder.addCase(
      loginAction.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.isLoading = false;
        state.user = payload.data.user;
        state.token =/*  payload.data.token */'trinh';
        state.profile = payload.data.user.profile;
        state.isError = false;
        return state;
      },
    );

    builder.addCase(loginAction.rejected, (state, action) => {
      state.user = {};
      state.isLoading = false;
      state.isError = true;
      // state.message = action.error;
      return state;
    });
  },
});
export const categoryProductReducer = AuthenticationSlice.reducer;

export default AuthenticationSlice.reducer;
export const { onCloseModalAuthenticationMessage, onLogout,changeBiometryType,changeIsSupport } =
  AuthenticationSlice.actions;
