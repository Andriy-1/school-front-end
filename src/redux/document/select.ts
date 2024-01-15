import { RootState } from '../store';

export const selectDoc = (state: RootState) => state.document;
export const selectDocFormItems = (state: RootState) => state.document.dataFormItems;

