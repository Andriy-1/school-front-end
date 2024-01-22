import { GalleryItem } from "../../redux/gallery/types";

export type cardGallery = {
	items: GalleryItem[];
	status: string;
	paginationCount: number;
	isAuth?: boolean;
  };