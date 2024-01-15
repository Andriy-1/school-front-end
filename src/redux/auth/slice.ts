import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../components/types';
import { fetchLogin, fetchMe } from './thunk';
import { Auth } from './types';

const initialState: Auth = {
  email: '',
  password: '',
  user: null,
  message: '',
  status: '',
  validate: {
    emailMessage: '',
    passwordMessage: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<any>) => {
      state.password = action.payload.password;
      state.email = action.payload.email;
    },
    setFromValue: (state, action: PayloadAction<{ email: string; password: string | number }>) => {
      state.password = action.payload.password;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMe.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchMe.fulfilled, (state, action: PayloadAction<User>) => {
      state.status = 'success';
      state.user = action.payload;
    });
    builder.addCase(fetchMe.rejected, (state, action: any) => {
      state.status = 'error';
      state.message = action.payload;
    });

    builder.addCase(fetchLogin.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchLogin.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.message = '';
    });
    builder.addCase(fetchLogin.rejected, (state, action: PayloadAction<any>) => {
		state.status = 'error';
		
      if (action.payload.message) {
        state.message = action.payload.message;
        state.validate.emailMessage = '';
        state.validate.passwordMessage = '';
      } else {
        //! Метод forEach не можна використовувати оскільки вони можуть змінювати стан reduxStore
        action.payload.forEach((fieldName: any) => {
          switch (fieldName.param) {
            case 'email':
              state.validate.emailMessage = fieldName.msg;
              state.validate.passwordMessage = '';
              state.message = '';
              break;
            case 'password':
              state.validate.passwordMessage = fieldName.msg;
              state.validate.emailMessage = '';
              state.message = '';
              break;
            default:
              break;
          }
        });
      }
    });
  },
});
export const { setValue, setFromValue,logout } = authSlice.actions;
export default authSlice.reducer;
