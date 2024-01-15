import { createAsyncThunk } from '@reduxjs/toolkit';

import instanse from '../../api';
import { User } from '../../components/types';
import { RootState } from '../store';
import { LoginParams } from './types';

export const fetchMe = createAsyncThunk<User, void, { state: RootState }>(
  'auth/fetchMe',
  async () => {
    const { data } = await instanse.get<User>('/auth/me');
    return data;
  },
);

export const fetchLogin = createAsyncThunk<User, LoginParams>(
  'auth/fetchLogin',
  async (params, { rejectWithValue }) => {
    return await instanse
      .post<User>('/auth/login', params)
      .then(({ data }) => {
        return data;
      })
		.catch((error) => {
        return rejectWithValue(error.response.data);
      });
  },
);
