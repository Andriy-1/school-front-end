import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectNewsItems = (state: RootState) => state.news.items;
export const selectNewsCategories = (state: RootState) => state.news.categories;
export const selectNews = (state: RootState) => state.news;
export const selectNewsIsLiked = (state: RootState) => state.news.isLiked;

export const getThreeItems = createSelector([selectNewsItems], (items) => items && items.slice(0, 3));
