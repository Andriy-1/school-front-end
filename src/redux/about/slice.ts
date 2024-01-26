import { createSlice } from '@reduxjs/toolkit';
import { fetchCreateUser, fetchDeleteUser, fetchGetAllUsers } from './thunk';

const initialState: any = {
	oneCardTitle: [],
	oneCardText: `Тут починається ваша навчальна подорож у Копачинській гімназії! Ми - це спільнота вчителів, учнів та батьків, що об'єднана спільною метою - надати вам не лише якісну освіту, а й допомогти розкрити ваші найяскравіші таланти та можливості.
<br/>
	Копачинська гімназія - це місце, де кожна дитина оточена підтримкою та натхненням. Наші вчителі - це відданий колектив, який не лише передає знання, а й створює відкрите середовище для досліджень та творчості. У нас ви зможете знайти платформу для реалізації своїх ідей та проектів, будь то наукові дослідження, художні виставки чи спортивні досягнення.`,
	twoCardTitle: [],
	twoCardText: 'Покладаючи акцент на якість навчання, розвиток особистості та підготовку до майбутнього, ми створюємо умови для формування не лише успішних учнів, а й відповідальних громадян. Наші випускники - це лідери, які здатні змінювати світ навколо нас. <br/> Ми раді вас вітати у нашій спільноті та сподіваємось, що ваш час у Копачинській гімназії буде наповнений незабутніми враженнями, знаннями та дружніми стосунками. Разом ми будуємо освітню майстерність та готуємося до майбутнього, яке належить вам!',
  users: [],
  status: '',
  validate: {
    message: '',
    imageMessage: '',
    fullNameMessage: '',
    positionMessage: '',
  },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCreateUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCreateUser.fulfilled, (state, action: any) => {
      state.status = 'success';
      state.users.push(action.payload);
    });
    builder.addCase(fetchCreateUser.rejected, (state, action: any) => {
      state.status = 'error';
      if (action.payload.message) {
        state.validate.message = action.payload.message;
        state.validate.fullNameMessage = '';
        state.validate.positionMessage = '';
      } else {
        //! Метод forEach не можна використовувати оскільки вони можуть змінювати стан reduxStore
        action.payload.forEach((fieldName: any) => {
          switch (fieldName.param) {
            case 'fullName':
              state.validate.fullNameMessage = fieldName.msg;
              state.validate.positionMessage = '';
              state.validate.imageMessage = '';
              state.validate.message = '';
              break;
            case 'position':
              state.validate.positionMessage = fieldName.msg;
              state.validate.fullNameMessage = '';
              state.validate.imageMessage = '';
              state.validate.message = '';
              break;
            case 'imageUrl':
              state.validate.imageMessage = fieldName.msg;
              state.validate.fullNameMessage = '';
              state.validate.positionMessage = '';
              state.validate.message = '';
              break;
            default:
              break;
          }
        });
      }
      // state.message = action.payload;
	});
	  //========================================================================================================================================================
	  
    builder.addCase(fetchGetAllUsers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchGetAllUsers.fulfilled, (state, action: any) => {
      state.status = 'success';
      state.users = action.payload;
    });
    builder.addCase(fetchGetAllUsers.rejected, (state, action: any) => {
      state.status = 'error';
      // state.message = action.payload;
    });
//========================================================================================================================================================

    builder.addCase(fetchDeleteUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchDeleteUser.fulfilled, (state, action: any) => {
		state.status = 'success';
    });
    builder.addCase(fetchDeleteUser.rejected, (state, action: any) => {
      state.status = 'error';
      console.log(action.payload);

      // state.message = action.payload;
    });
  },
});

export default usersSlice.reducer;
