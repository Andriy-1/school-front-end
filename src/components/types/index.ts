export type StyleProps = {
  isAddBolean?: boolean;
  photoWebp?: string;
  photoJpg?: string;
  photoContacts?: string;
  items?: AllData[] | null;
  status?: string;
  text?: string;
  title?: any;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  passwordHash?: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  token?: number;
};

export type AllData = {
  id: number;
  title: string;
  text: string;
  viewscount?: number;
  likecount?: number;
  user_id: number;
  imageUrl: string;
  created_at?: DataView;
  updateLikes: void;
  isReset?: boolean;
};
export type AllDataAction = {
  post: AllData;
  message: string;
};
