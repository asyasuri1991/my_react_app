import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS, getStorageItem } from '../../utils/storage';
import { postAuthData } from './effects';

export interface UserInfo {
  fullName: string;
  email: string;
  avatar: string;
  token: string;
  id: number;
}

interface StateStore {
  user: UserInfo;
  // theme: "theme-dark" | "theme-light";
  isLoading: boolean;
  error: string | null;
  isAuth: boolean;
}

const initialState: StateStore = {
  user: {} as UserInfo,
  isLoading: false,
  error: null,
  // theme: "theme-light",
  isAuth: false,
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    clearUserData: () => initialState,
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
  selectors: {
    getToken: state => state.user.token,
    getIsLoading: state => state.isLoading,
    getUserAvatar: state => state.user.avatar,
    getUserId: state => state.user.id,
    getIsAuth: state => state.isAuth,
    getName: state => state.user.fullName,
  },
  extraReducers: builder => {
    builder
      .addCase(postAuthData.pending, state => {
        state.isLoading = true;
      })
      .addCase(postAuthData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(postAuthData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Что-то пошло не так';
      });
  },
});

export const { clearUserData, setIsAuth, setUserInfo } = userDataSlice.actions;

export const { getIsLoading, getToken, getUserAvatar, getUserId, getIsAuth, getName } = userDataSlice.selectors;

export const defineUserDataFromStorage = (): StateStore => {
  const user = getStorageItem(STORAGE_KEYS.USER_DATA);
  const initState = userDataSlice.getInitialState();

  if (user) {
    return { ...initState, user };
  }

  return initState;
};
