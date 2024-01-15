import { createAsyncThunk } from '@reduxjs/toolkit';
import instanse from '../../../api';
// import { AllData } from '../../components/types';
import { RootState } from '../../store';

export const fetchTimeTable = createAsyncThunk<any, void, { state: RootState }>(
  'education/fetchDoc',
  async () => {
    const { data } = await instanse.get<any>('/document');
    return data;
  },
);

// export const fetchCreateDoc = createAsyncThunk<
//   any,
//   Array<FormDataEntryValue>,
//   { state: RootState }
// >('document/fetchCreateDoc', async (params, { rejectWithValue }) => {
//   return await instanse
//     .post<any>('/document', params)
//     .then(({ data }) => {
//       return data;
//     })
//     .catch((error) => {
//       console.log(error);
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error.response.data);
//     });
// });
// export const fetchDeleteDoc = createAsyncThunk<any, number>(
//   'document/fetchDeleteDoc',
//   async (id) => {
//     return await instanse
//       .delete<any>(`/document/${id}`)
//       .then(({ data }) => {
//         return data;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   },
// );
