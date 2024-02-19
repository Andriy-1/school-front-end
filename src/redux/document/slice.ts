import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllData } from '../../components/types';
// import { configToast } from '../../config/toats';
import {
  fetchCreateDoc,
  fetchCreateDocCircle,
  fetchCreateDocTimeTable,
  fetchCreateDocumentCategories,
  fetchDeleteDocumentCategories,
  fetchDoc,
  fetchDocCircle,
  fetchDocTimeTable,
  fetchDocumentCategories,
  fetchUpdateDoc,
} from './thunk';
import { toast } from 'react-toastify';

const initialState: any = {
  items: [],
  categories: [],
  activeCategoriesId: null,
  message: '',
  status: 'loading',
  errorMessage: '',
  dataFormItems: [],
  toast: null,
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
    delDocItems: (state, action: PayloadAction<number>) => {
      const data = state.dataFormItems.filter(
        (item: { data: string; id: number }) => item.id !== action.payload,
      );
      state.dataFormItems = data;
    },
    delDocItemsAll: (state) => {
      state.dataFormItems = [];
    },
    setCategoriesId: (state, action: PayloadAction<any>) => {
      state.activeCategoriesId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDoc.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchDoc.fulfilled, (state, action: PayloadAction<any>) => {
      state.items = action.payload.document;
      state.status = 'success';
    });
    builder.addCase(fetchDoc.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });

    builder.addCase(fetchUpdateDoc.pending, (state) => {
      state.status = 'loading';
      state.toast = toast.loading('Завантаження...', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });
    });
    builder.addCase(fetchUpdateDoc.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = 'success';
      state.message = action.payload.message;
      toast.update(state.toast, {
        render: action.payload.message,
        type: 'success',
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
        isLoading: false,
      });
    });
    builder.addCase(fetchUpdateDoc.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'error';
      console.log(action.payload.message);
      state.message = action.payload.message;
      toast.update(state.toast, {
        render: action.payload.message,
        type: 'error',
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
        isLoading: false,
      });
      // state.items = [];
    });

    //==================================================================
    builder.addCase(fetchDocumentCategories.pending, (state) => {
      state.status = 'loading';
      state.categories = [];
    });
    builder.addCase(fetchDocumentCategories.fulfilled, (state, action: PayloadAction<any>) => {
      if (!state.categories?.length) {
        state.categories = action.payload.document_categories;
      }
      state.status = 'success';
    });
    builder.addCase(fetchDocumentCategories.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
    builder.addCase(fetchCreateDocumentCategories.pending, (state) => {
      state.status = 'loading';
      state.toast = toast.loading('Завантаження...', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });
    });
    builder.addCase(
      fetchCreateDocumentCategories.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.categories = [...state.categories, ...action.payload.document_categories];
        console.log('fetchCreateDocumentCategories', action.payload);
        state.status = 'success';
        toast.update(state.toast, {
          render: action.payload.message,
          type: 'success',
          position: 'bottom-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
          isLoading: false,
        });
      },
    );
    builder.addCase(fetchCreateDocumentCategories.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'error';
      console.log(action.payload.message);

      state.errorMessage = action.payload.message;
      // state.items = [];
    });

    builder.addCase(fetchDeleteDocumentCategories.pending, (state) => {
      state.status = 'loading';
      state.toast = toast.loading('Завантаження...', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });
    });
    builder.addCase(
      fetchDeleteDocumentCategories.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload.success) {
          const newArray = state.categories.filter(
            (item: any) => item.id !== state.activeCategoriesId,
          );
          state.categories = newArray;
          state.status = 'success';
          toast.update(state.toast, {
            render: action.payload.message,
            type: 'success',
            position: 'bottom-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'light',
            isLoading: false,
          });
        }
      },
    );
    builder.addCase(fetchDeleteDocumentCategories.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'error';
      toast.update(state.toast, {
        render: action.payload.message,
        type: 'error',
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
        isLoading: false,
      });
    });

    //================================================================

    builder.addCase(fetchCreateDoc.pending, (state) => {
      state.status = 'loading';
      state.items = [];
      state.toast = toast.loading('Завантаження...', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });
    });
    builder.addCase(fetchCreateDoc.fulfilled, (state, action: PayloadAction<any>) => {
      state.items = action.payload.document;
      state.status = 'success';
      toast.update(state.toast, {
        render: action.payload.message,
        type: 'success',
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
        isLoading: false,
      });
    });
    builder.addCase(fetchCreateDoc.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'error';
      console.log(action.payload.message);
      toast.update(state.toast, {
        render: action.payload.message,
        type: 'error',
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
        isLoading: false,
      });
      state.errorMessage = action.payload.message;
      // state.items = [];
    });
    //==================================================================

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

export const { setItems, getError, setFormItemsDoc, delDocItemsAll, delDocItems, setCategoriesId } =
  docSlice.actions;
export default docSlice.reducer;
