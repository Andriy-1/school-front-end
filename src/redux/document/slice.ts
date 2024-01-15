import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllData } from '../../components/types';
import { fetchCreateDoc, fetchCreateDocCircle, fetchCreateDocTimeTable, fetchDoc, fetchDocCircle, fetchDocTimeTable } from './thunk';

const initialState: any = {
  items: [],
  status: 'loading',
	errorMessage: '',
	dataFormItems: [],
};

export const docSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<AllData[]>) => {
      state.items = action.payload;
    },
    getError: (state) => {
      state.errorMessage = '';
	  },
	  setFormItemsDoc: (state, action: PayloadAction<any>) => {
		state.dataFormItems.push(action.payload);
	  },
	  delDocItems: (state,action: PayloadAction<number>) => {

		const data =  state.dataFormItems.filter((item: { data: string, id: number }) =>item.id !== action.payload)
		
		state.dataFormItems = data;
	},
	  delDocItemsAll: (state) => { 
		state.dataFormItems = [];
	}
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDoc.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchDoc.fulfilled, (state, action: PayloadAction<any>) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchDoc.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });

    //========================================================================================================================================================

    builder.addCase(fetchCreateDoc.pending, (state) => {
      state.status = 'loading';
        state.items = [];
    });
	  builder.addCase(fetchCreateDoc.fulfilled, (state, action: PayloadAction<any>) => {
		
		state.items = action.payload;
		state.status = 'success';
    });
    builder.addCase(fetchCreateDoc.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'error';
      console.log(action.payload.message);

      state.errorMessage = action.payload.message;
      // state.items = [];
	});
	  //?==================================================================================
	  builder.addCase(fetchDocTimeTable.pending, (state) => {
		state.status = 'loading';
		state.items = [];
	  });
	  builder.addCase(fetchDocTimeTable.fulfilled, (state, action: PayloadAction<any>) => {
		state.items = action.payload;
		state.status = 'success';
	  });
	  builder.addCase(fetchDocTimeTable.rejected, (state) => {
		state.status = 'error';
		state.items = [];
	  });
	  
	  builder.addCase(fetchCreateDocTimeTable.pending, (state) => {
		state.status = 'loading';
		//   state.items = [];
	  });
	  builder.addCase(fetchCreateDocTimeTable.fulfilled, (state, action: PayloadAction<any>) => {
		if (state.items) {
		  state.items.push(action.payload as any);
		}
		state.status = 'success';
	  });
	  builder.addCase(fetchCreateDocTimeTable.rejected, (state, action: PayloadAction<any>) => {
		state.status = 'error';
		console.log(action.payload.message);
		state.errorMessage = action.payload.message;
		// state.items = [];
	  });
	  //?=====================================================================================================
	  builder.addCase(fetchDocCircle.pending, (state) => {
		state.status = 'loading';
		state.items = [];
	  });
	  builder.addCase(fetchDocCircle.fulfilled, (state, action: PayloadAction<any>) => {
		state.items = action.payload;
		state.status = 'success';
	  });
	  builder.addCase(fetchDocCircle.rejected, (state) => {
		state.status = 'error';
		state.items = [];
	  });
	  
	  builder.addCase(fetchCreateDocCircle.pending, (state) => {
		state.status = 'loading';
		//   state.items = [];
	  });
	  builder.addCase(fetchCreateDocCircle.fulfilled, (state, action: PayloadAction<any>) => {
		if (state.items) {
		  state.items.push(action.payload as any);
		}
		state.status = 'success';
	  });
	  builder.addCase(fetchCreateDocCircle.rejected, (state, action: PayloadAction<any>) => {
		state.status = 'error';
		console.log(action.payload.message);
		state.errorMessage = action.payload.message;
		// state.items = [];
	  });
  },
});

export const { setItems,getError, setFormItemsDoc, delDocItemsAll, delDocItems } = docSlice.actions;
export default docSlice.reducer;
