import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCreateGallery, fetchDelGallery, fetchGallery } from './thunk';

const initialState: any = {
	oneCardTitle: ['Наша','Гімназія'],
	oneCardText: `– це великий дружній дім, в якому живуть розумні і талановиті, ініціативні і творчі, умілі і спортивні учні. Вони всі різні, але кожен з них по-своєму любить і прагне зробити наш заклад освіти ще красивішим і кращим. <br/> – це згуртований педагогічний колектив. <br/> – це зацікавлені батьки, які готові завжди підтримати, бо знають, що вони довіряють вчителям найдорожче, що у них є, – своїх дітей.`,
	twoCardTitle: [],
	twoCardText: 'У нашому навчальному закладі ми віримо в силу знань, творчості та взаємодії. Тут кожен учень - це не лише носій книжкової мудрості, а й активний творець свого майбутнього. Ми надаємо вільну арену для розвитку талантів, де учні можуть експериментувати, дізнаватися, ділитися та рости. <br/>	Досягнення наших учнів, їхні розумові відкриття та успіхи в спорті, мистецтві та наукових проектах - ось що робить нас пишними. Цей сайт - наше відображення, наш віртуальний будинок зі скляними стінами, крізь які світить справжній блиск молодіжної допитливості.',
  items: [],
	dataFormItems: [],
	paginationCount: 0,
  	status: 'loading',
	errorMessage: '',
	count: 0
};

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    getError: (state) => {
      state.errorMessage = '';
    },
	  setFormItems: (state, action: PayloadAction<any>) => {
      state.dataFormItems.push({data: action.payload,id: state.count++});
    },
	  delFormItems: (state,action: PayloadAction<number>) => {

		  const data =  state.dataFormItems.filter((item: { data: string, id: number }) =>item.id !== action.payload)
		  
		  state.dataFormItems = data;
	  },
	  delFormItemsAll: (state) => { 
		  state.dataFormItems = [];
	  }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchGallery.pending, (state) => {
      state.status = 'loading';
		state.items = [];
		state.paginationCount = 0;
    });
    builder.addCase(fetchGallery.fulfilled, (state, action: any) => {
      state.status = 'success';
      state.items = action.payload.file;
      state.paginationCount = action.payload.paginationCount;
    });
    builder.addCase(fetchGallery.rejected, (state) => {
      state.status = 'error';
		state.items = [];
		state.paginationCount = 0;
    });
    //====================================================
    builder.addCase(fetchCreateGallery.pending, (state) => {
      state.status = 'loading';
		state.items = [];
		state.paginationCount = 0;
    });
	  builder.addCase(fetchCreateGallery.fulfilled, (state, action: PayloadAction<any>) => {	
		  
		state.items = action.payload.file;
		state.paginationCount = action.payload.paginationCount;
		  state.status = 'success';	  
    });
    builder.addCase(fetchCreateGallery.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'error';
      console.log(action.payload.message);
		state.errorMessage = action.payload.message;
		state.paginationCount = 0;
	});
	  
	  //=============================================
	  builder.addCase(fetchDelGallery.pending, (state) => {
		state.status = 'loading';
		state.items = [];
	  });
	  builder.addCase(fetchDelGallery.fulfilled, (state, action: any) => {
		  state.status = 'success';
	  });
	  builder.addCase(fetchDelGallery.rejected, (state) => {
		state.status = 'error';
		state.items = [];
	  });
	  
	  
  },
});
export const { getError, setFormItems, delFormItemsAll, delFormItems } = gallerySlice.actions;
export default gallerySlice.reducer;
