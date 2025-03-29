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
  viewsCount?: number;
  likeCount?: number;
  user_id?: number;
  imageUrl: string[];
  created_at?: DataView;
  updateLikes?: void;
  isReset?: boolean;
  postCategories_id?: number;
  published?: boolean;
};
export type AllDataAction = {
  post: AllData;
  message: string;
};

export type NewsCategories = {
  id: number;
  title: string;
};

export type ActionFetchNews = {
	posts: AllData[];
	message: string;
}