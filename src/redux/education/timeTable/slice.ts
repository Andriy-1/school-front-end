import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { fetchCreateDoc, fetchDoc } from './thunk';

const initialState: any = {
  items: [],
  status: 'loading',
  errorMessage: '',
};

export const docTimeTableSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<any>) => {
      state.items = action.payload;
    },
    getError: (state) => {
      state.errorMessage = '';
    },
  },

  extraReducers: (builder) => {
//     builder.addCase(fetchDoc.pending, (state) => {
//       state.status = 'loading';
//       state.items = [];
//     });
//     builder.addCase(fetchDoc.fulfilled, (state, action: PayloadAction<any>) => {
//       state.items = action.payload;
//       state.status = 'success';
//     });
//     builder.addCase(fetchDoc.rejected, (state) => {
//       state.status = 'error';
//       state.items = [];
//     });

//     //========================================================================================================================================================

//     builder.addCase(fetchCreateDoc.pending, (state) => {
//       state.status = 'loading';
//       //   state.items = [];
//     });
//     builder.addCase(fetchCreateDoc.fulfilled, (state, action: PayloadAction<any>) => {
//       if (state.items) {
//         state.items.push(action.payload as any);
//       }
//       state.status = 'success';
//     });
//     builder.addCase(fetchCreateDoc.rejected, (state, action: PayloadAction<any>) => {
//       state.status = 'error';
//       console.log(action.payload.message);

//       state.errorMessage = action.payload.message;
//       // state.items = [];
//     });
  },
});

export const { setItems,getError } = docTimeTableSlice.actions;
export default docTimeTableSlice.reducer;
