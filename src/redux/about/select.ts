import { RootState } from "../store";
import { createSelector } from 'reselect';

export const selectUsers = (state: RootState) => state.users;

const selectOneCardText = (state: RootState) => state.users.oneCardText;
const selectOneCardTitle = (state: RootState) => state.users.oneCardTitle;
const selectTwoCardText = (state: RootState) => state.users.twoCardText;
const selectTwoCardTitle = (state: RootState) => state.users.twoCardTitle;

export const selectDefaultData = createSelector(
  selectOneCardText,
  selectOneCardTitle,
  selectTwoCardText,
  selectTwoCardTitle,
  (oneCardText, oneCardTitle, twoCardText, twoCardTitle) => [
    oneCardText,
    oneCardTitle,
    twoCardText,
    twoCardTitle
  ]
);