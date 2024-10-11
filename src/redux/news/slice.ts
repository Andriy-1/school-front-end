import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionFetchNews, AllData, AllDataAction, NewsCategories } from '../../components/types';
import {
  fetchCategoryNews,
  fetchCreateNews,
  fetchNews,
  fetchNewsCategories,
  fetchNewsThree,
  fetchUpdateNewsLikes,
} from './thunk';
import { getIdStorage, NewsSliceState } from './types';
import { toast } from 'react-toastify';

const initialState: NewsSliceState = {
  items: [],
  categories: [],
  status: 'loading',
  likeCount: 0,
  viewsCount: 0,
  views: [],
  validate: {},
  isLiked: false,
  toast: null,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setZeroItems: (state) => {
      state.items = [];
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
    setLikes: (state, action: PayloadAction<any>) => {
      const { id, isLiked } = action.payload;
      state.isLiked = isLiked;
      if (state.items !== null && state.items !== undefined) {
        const index = state.items.findIndex((item) => item.id === id);

        if (index !== -1) {
          const updatedItem = {
            ...state.items[index],
            likeCount: state.items[index]?.likeCount ?? 0,
          };

          updatedItem.likeCount = isLiked ? updatedItem.likeCount - 1 : updatedItem.likeCount + 1;

          state.items = [...state.items];
          state.items[index] = updatedItem;
        }
      }
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
    builder.addCase(fetchNewsThree.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchNewsThree.fulfilled, (state, action: PayloadAction<AllData[]>) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchNewsThree.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    }); //========================================================================================================================================================

    builder.addCase(fetchCreateNews.pending, (state) => {
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
    builder.addCase(fetchCreateNews.fulfilled, (state, action: PayloadAction<AllDataAction>) => {
      if (state.items) {
        state.items.push(action.payload.post as AllData);
      }
      state.status = 'success';
      toast.update(state.toast, {
        render: action.payload.message as string,
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
    builder.addCase(fetchCreateNews.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'error';
      state.items = [];
      if (action.payload.message) {
        toast.update(state.toast, {
          render: (action.payload.message + ' ' + 'Додайте фото') as string,
          type: 'error',
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
        state.validate.message = action.payload.message;
        state.validate.titleMessage = '';
        state.validate.textMessage = '';
      } else {
        //! Метод forEach не можна використовувати оскільки вони можуть змінювати стан reduxStore
        action.payload.forEach((fieldName: any) => {
          switch (fieldName.param) {
            case 'title':
              toast.update(state.toast, {
                render: fieldName.msg as string,
                type: 'error',
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
              state.validate.titleMessage = fieldName.msg;
              state.validate.textMessage = '';
              state.validate.imageMessage = '';
              state.validate.message = '';
              break;
            case 'text':
              toast.update(state.toast, {
                render: fieldName.msg as string,
                type: 'error',
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
              state.validate.textMessage = fieldName.msg;
              state.validate.titleMessage = '';
              state.validate.imageMessage = '';
              state.validate.message = '';
              break;
            case 'imageUrl':
              toast.update(state.toast, {
                render: fieldName.msg as string,
                type: 'error',
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
    //===================================================================================================================================
    builder.addCase(fetchUpdateNewsLikes.pending, (state) => {
      //   state.status = 'loading';
    });
    builder.addCase(fetchUpdateNewsLikes.fulfilled, (state, action: PayloadAction<AllData[]>) => {
      console.log('update', action.payload);
      //   state.status = 'success';
    });
    builder.addCase(fetchUpdateNewsLikes.rejected, (state) => {
      state.status = 'error';
    });
    //========================================================================================================================================================
    builder.addCase(fetchNewsCategories.pending, (state) => {
      //   state.status = 'loading';
    });
    builder.addCase(
      fetchNewsCategories.fulfilled,
      (state, action: PayloadAction<NewsCategories[]>) => {
        state.categories = action.payload;
        state.status = 'success';
      },
    );
    builder.addCase(fetchNewsCategories.rejected, (state) => {
      state.status = 'error';
    });
    //========================================================================================================================================================
    builder.addCase(fetchCategoryNews.pending, (state) => {
      //   state.status = 'loading';
    });
    builder.addCase(fetchCategoryNews.fulfilled, (state, action: PayloadAction<any>) => {
      state.items = [];
      state.items = action.payload.posts;
      state.status = 'success';

      if (action.payload.message) {
        toast.update(state.toast, {
          render: action.payload.message as string,
          type: 'error',
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
    });
    builder.addCase(fetchCategoryNews.rejected, (state, action: PayloadAction<any>) => {
      state.items = [];
      state.status = 'error';
      if (action.payload.message) {
        toast.update(state.toast, {
          render: action.payload.message as string,
          type: 'error',
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
    });
  },
});

export const { setZeroItems, setViews, setViewsCount, setValid, setLikes } = newsSlice.actions;
export default newsSlice.reducer;
