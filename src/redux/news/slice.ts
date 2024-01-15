import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllData } from '../../components/types';
import { fetchCreateNews, fetchNews } from './thunk';
import { getIdStorage, NewsSliceState } from './types';

const initialState: NewsSliceState = {
  items: [],
  status: 'loading',
  viewsCount: 0,
  views: [],
  validate: {},
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<AllData[]>) => {
      state.items = action.payload;
    },
    setViews: (state, action: PayloadAction<getIdStorage>) => {
      state.views.push(action.payload.id);
    },
    setValid: (state) => {
      state.validate = {};
    },
    setViewsCount: (state) => {
      (localStorage as any).setItem('viewsNewsCount', JSON.stringify(state.views));
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchNews.fulfilled, (state, action: PayloadAction<AllData[]>) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchNews.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
    //========================================================================================================================================================

    builder.addCase(fetchCreateNews.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCreateNews.fulfilled, (state, action: PayloadAction<AllData[]>) => {
      if (state.items) {
        state.items.push(action.payload as any);
      }
      state.status = 'success';
    });
    builder.addCase(fetchCreateNews.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'error';
      state.items = [];
      if (action.payload.message) {
        state.validate.message = action.payload.message;
        state.validate.titleMessage = '';
        state.validate.textMessage = '';
      } else {
        //! Метод forEach не можна використовувати оскільки вони можуть змінювати стан reduxStore
        action.payload.forEach((fieldName: any) => {
          switch (fieldName.param) {
            case 'title':
              state.validate.titleMessage = fieldName.msg;
              state.validate.textMessage = '';
              state.validate.imageMessage = '';
              state.validate.message = '';
              break;
            case 'text':
              state.validate.textMessage = fieldName.msg;
              state.validate.titleMessage = '';
              state.validate.imageMessage = '';
              state.validate.message = '';
              break;
            case 'imageUrl':
              state.validate.imageMessage = fieldName.msg;
              state.validate.titleMessage = '';
              state.validate.textMessage = '';
              state.validate.message = '';
              break;
            default:
              break;
          }
        });
      }
    });
  },
});

export const { setItems, setViews, setViewsCount, setValid } = newsSlice.actions;
export default newsSlice.reducer;
