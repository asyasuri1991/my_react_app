import { createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../../transport';
import { STORAGE_KEYS, setStorageItem } from '../../utils/storage';
import { AuthFormData, AuthResponse } from './types';

export const postAuthData = createAsyncThunk('userData/postAuth', async (payload: AuthFormData) => {
  const {
    data: { data, token },
  } = await post<AuthResponse>(`/auth`, payload);

  const userData = { ...data, token };

  localStorage.setItem('token', token);

  return userData;
});
