import { createAsyncThunk } from '@reduxjs/toolkit';

import instanse from '../../api';
import { AllData } from '../../components/types';
import { RootState } from '../store';

export const fetchNews = createAsyncThunk<AllData[], void, { state: RootState }>(
  'news/fetchNews',
  async () => {
    const { data } = await instanse.get<AllData[]>('/posts');
    return data;
  },
);
export const fetchUpdateNews = createAsyncThunk<any, any, { state: RootState }>(
  'news/fetchUpdateNews',
  async (params) => {
    const { data } = await instanse.patch<any>('/posts', params);
    return data;
  },
);
export const fetchCreateNews = createAsyncThunk<any, any, { state: RootState }>(
  'news/fetchCreateNews',
  async (params, { rejectWithValue }) => {
    return await instanse
      .post<AllData[]>('/posts', params)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      });
  },
);
export const fetchDeleteNews = createAsyncThunk<AllData, number>(
  'users/fetchDeleteNews',
  async (id) => {
    return await instanse
      .delete<any>(`/posts/${id}`)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
);
