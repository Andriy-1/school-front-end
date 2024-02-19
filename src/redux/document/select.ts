import { RootState } from '../store';

export const selectDoc = (state: RootState) => state.document;
export const selectDocumentCategories = (state: RootState) => state.document.categories;
export const selectDocFormItems = (state: RootState) => state.document.dataFormItems;

