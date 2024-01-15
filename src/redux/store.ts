import { configureStore } from '@reduxjs/toolkit';

import news from './news/slice';
import auth from './auth/slice';
import users from './about/slice';
import document from './document/slice';
import gallery from './gallery/slice';
// import documentTimeTable from './education/timeTable/slice';

export const store = configureStore({
  reducer: {
    news,
    auth,
    users,
    document,
    gallery,
    // documentTimeTable,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
