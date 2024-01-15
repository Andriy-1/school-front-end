import { AllData } from '../../components/types';

export type NewsItem = {
  id: string;
  imageUrl: string;
  title: string;
  views?: [string];
};

export interface NewsSliceState {
  items: AllData[] | null;
  status: string;
  viewsCount: number;
  views: [number?];
  validate: Validate;
}

export type getIdStorage = {
  id: number;
  prevNewsId?: number;
  views?: [number];
};

export type Validate = {
  message?: string;
  imageMessage?: string;
  titleMessage?: string;
  textMessage?: string;
};
export type BackValid = {
  location: string;
  msg: string;
  param: string;
  value: string;
};
