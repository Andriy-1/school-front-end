import { createAsyncThunk } from '@reduxjs/toolkit';

import instanse from '../../api';
import { AllData, NewsCategories } from '../../components/types';
import { RootState } from '../store';

//News Categories
export const fetchNewsCategories = createAsyncThunk<NewsCategories[], void, { state: RootState }>(
  'news/fetchNewsCategories',
  async () => {
    const { data } = await instanse.get<NewsCategories[]>('/posts-categories');
    return data;
  },
);
//Get from category news
export const fetchCategoryNews = createAsyncThunk<AllData[], number, { state: RootState }>(
  'news/fetchCategoryNews',
  async (id) => {
    const queryString = id ? `?categories_id=${id}` : '';
    const { data } = await instanse.get<any>('/posts-from-category' + queryString);
    return data;
  },
);

//News
export const fetchNews = createAsyncThunk<AllData[], void, { state: RootState }>(
  'news/fetchNews',
  async () => {
    const { data } = await instanse.get<AllData[]>('/posts');
    return data;
  },
);
export const fetchNewsThree = createAsyncThunk<AllData[], void, { state: RootState }>(
  'news/fetchNewsThree',
  async () => {
    const { data } = await instanse.get<AllData[]>('/posts/three');
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
export const fetchUpdateNewsLikes = createAsyncThunk<any, any, { state: RootState }>(
  'news/fetchUpdateNewsLikes',
  async ({ id, isLiked }, { rejectWithValue }) => {
    return await instanse
      .patch<any>(`/posts/likes/${id}`, { isLiked })
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

export const fetchUpdateNewsViews = createAsyncThunk<any, any, { state: RootState }>(
  'news/fetchUpdateNewsViews',
  async ({ id, isViews }, { rejectWithValue }) => {
    return await instanse
      .patch<any>(`/posts/views/${id}`, { isViews })
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
