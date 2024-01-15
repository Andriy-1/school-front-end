import { createAsyncThunk } from '@reduxjs/toolkit';
import instanse from '../../api';

export const fetchCreateUser = createAsyncThunk<any, any, any>(
  'users/fetchCreateUser',
  async (params, { rejectWithValue }) => {

    return await instanse
      .post<any>('/about/user', params)
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
export const fetchGetAllUsers = createAsyncThunk<any, void, any>(
  'users/fetchGetAllUsers',
  async () => {
    return await instanse
      .get<any>('/about/user')
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
);
export const fetchDeleteUser = createAsyncThunk<any, any>('users/fetchDeleteUser', async (id) => {
  return await instanse
    .delete<any>(`/about/user/${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
});
