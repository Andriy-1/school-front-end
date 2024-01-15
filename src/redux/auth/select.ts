import { RootState } from '../store';
export const selectAuth = (state: RootState) => Boolean(state.auth.user);
export const selectAuthDataUser = (state: RootState) =>  state.auth.user?.fullName;
