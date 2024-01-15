import { createAsyncThunk } from '@reduxjs/toolkit';
import instanse from '../../api';
import { RootState } from '../store';

export const fetchGallery = createAsyncThunk<any, void, { state: RootState }>(
  'gallery/fetchGallery',
  async () => {
    const { data } = await instanse.get<any>('/gallery');
    return data;
  },
);

export const fetchCreateGallery = createAsyncThunk<any, any, { state: RootState }>(
  'gallery/fetchCreateGallery',
  async (params, { rejectWithValue }) => {
    return await instanse
      .post<any>('/gallery', params)
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

export const fetchDelGallery = createAsyncThunk<any, any, { state: RootState }>(
  'gallery/fetchDelGallery',
  async (id) => {
    const { data } = await instanse.delete<any>(`/gallery/${id}`);
    return data;
  },
);
