import { RootState } from '../store';

export const selectDoc = (state: RootState) => state.document;
export const selectDocumentCategories = (state: RootState) => state.document.categories;
export const selectDocumentActiveCategoriesId = (state: RootState) => state.document.activeCategoriesId;
export const selectDocFormItems = (state: RootState) => state.document.dataFormItems;

