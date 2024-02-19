export interface GalleryItem {
	id: number;
	file: string;
}

export type Gallery = {
	oneCardTitle: string[];
	oneCardText: string;
	twoCardTitle: string[];
	twoCardText: string;
	items: GalleryItem[];
	dataFormItems: any;
	paginationCount: number;
	status: string;
	errorMessage: string;
	count: number;
	toast: any,
	
};
// interface DataFormItem {
// 	data: [];
// 	id: number;
//   }
  
//   // Припустимо, що тип для data - це, наприклад, string
//   interface RootState {
// 	count: number;
// 	dataFormItems: DataFormItem[];
//   }