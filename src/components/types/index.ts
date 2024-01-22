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
  //   user: User;
  //   createdAt?: string;
  //   updatedAt?: string;
  //   views?: [string?];
  //   __v?: number;
  //   handleClick?: () => void;
};

// export type ViewsArr = {
// 	views: [string?];
// }
