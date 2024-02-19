import { createAsyncThunk } from '@reduxjs/toolkit';
import instanse from '../../api';
// import { AllData } from '../../components/types';
import { RootState } from '../store';

export const fetchDoc = createAsyncThunk<any, string>(
  'document/fetchDoc',
	async (query) => {
	  const queryString = query? `?${query}`: ''
    const { data } = await instanse.get<any>('/document' + queryString);
    return data;
  },
);



export const fetchCreateDoc = createAsyncThunk<
  any,
  Array<FormDataEntryValue>,
  { state: RootState }
>('document/fetchCreateDoc', async (params, { rejectWithValue }) => {
  return await instanse
    .post<any>('/document', params)
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
});
export const fetchDeleteDoc = createAsyncThunk<any, number>(
  'document/fetchDeleteDoc',
  async (id) => {
    return await instanse
      .delete<any>(`/document/${id}`)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
);
//========================================================================
export const fetchDocumentCategories = createAsyncThunk<any, string>(
	'document/fetchDocumentCategories',
	  async () => {
	  const { data } = await instanse.get<any>('/document-categories');
	  return data;
	},
  );

export const fetchCreateDocumentCategories = createAsyncThunk<
  any,
  Array<FormDataEntryValue>,
  { state: RootState }
>('document/fetchCreateDocumentCategories', async (params, { rejectWithValue }) => {
  console.log('par', params);

  return await instanse
    .post<any>('/document-categories', params)
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
});

//========================================================================

export const fetchDocTimeTable = createAsyncThunk<any, void, { state: RootState }>(
  'document/fetchDocTimeTable',
  async () => {
    const { data } = await instanse.get<any>('/timetable');
    return data;
  },
);

export const fetchCreateDocTimeTable = createAsyncThunk<
  any,
  Array<FormDataEntryValue>,
  { state: RootState }
>('document/fetchCreateDocTimeTable', async (params, { rejectWithValue }) => {
  return await instanse
    .post<any>('/timetable', params)
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
});

export const fetchDeleteDocTimeTable = createAsyncThunk<any, number>(
  'document/fetchDeleteDocTimeTable',
  async (id) => {
    return await instanse
      .delete<any>(`/timetable/${id}`)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
);

//========================================================================

export const fetchDocCircle = createAsyncThunk<any, void, { state: RootState }>(
  'document/fetchDocCircle',
  async () => {
    const { data } = await instanse.get<any>('/circle');
    return data;
  },
);

export const fetchCreateDocCircle = createAsyncThunk<
  any,
  Array<FormDataEntryValue>,
  { state: RootState }
>('document/fetchCreateDocCircle', async (params, { rejectWithValue }) => {
  return await instanse
    .post<any>('/circle', params)
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
});

export const fetchDeleteDocCircle = createAsyncThunk<any, number>(
  'document/fetchDeleteDocCircle',
  async (id) => {
    return await instanse
      .delete<any>(`/circle/${id}`)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
);
