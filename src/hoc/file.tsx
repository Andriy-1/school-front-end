import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { useLocation } from 'react-router-dom';
import { selectGallery } from '../redux/gallery/select';
import { selectDoc, selectDocumentActiveCategoriesId } from '../redux/document/select';
import { UseFormHandleSubmit, useForm } from 'react-hook-form';
import { delFormItems, delFormItemsAll, getError, setFormItems } from '../redux/gallery/slice';
import { fetchCreateGallery } from '../redux/gallery/thunk';
import { delDocItemsAll } from '../redux/document/slice';
import { fetchCreateDoc, fetchCreateDocCircle, fetchCreateDocTimeTable, fetchDoc, fetchDocCircle, fetchDocTimeTable } from '../redux/document/thunk';
import { toast } from 'react-toastify';

interface Props {
	error: String,
	onSubmit: any,
	handleSubmit: UseFormHandleSubmit<{
		file: never[];
	}>,
	handleFileUpload: any,
	errorMessage: string,
	dataFormItems: [string],
	wayToFile: string[],
}

type HOC = (
	Component: React.ComponentType<Props>
) => React.ComponentType<{ isActive?: boolean }>;

const withFileComponent: HOC = (Component) => {
	return (props: any) => {
		const dispatch = useAppDispatch();
		const location = useLocation();
		const { dataFormItems } = useAppSelector(selectGallery);
		const categoriesId = useAppSelector(selectDocumentActiveCategoriesId);
		const [wayToFile, setWayToFile] = React.useState<string[]>([]);

		const inputRef = React.useRef<any>(null);
		const progressRef = React.useRef<any>(null);
		const { errorMessage } = useAppSelector(selectGallery);
		const docData = useAppSelector(selectDoc);
		const [error, setError] = React.useState('');

		const { setValue, handleSubmit, register } = useForm({
			defaultValues: {
				file: [],
				title: '',
				seniors: false,
			},
			mode: 'onChange',
		});


		React.useEffect(() => {
			if (location.pathname === '/document') {
				// dispatch(fetchDoc(''));
			} else if (location.pathname === '/education/timetable') {
				dispatch(fetchDocTimeTable());
			} else if (location.pathname === '/education/circle') {
				dispatch(fetchDocCircle());
			}
		}, [dispatch, location.pathname, props.isActive]);

		//========================================================================================================================================================

		const handleFileUploadDoc = (event: any) => {

			const files = event.target.files;
			const fileContents: string[] = [];
			const fileForm: any = [];
			const fileSize = event.target.files[0].size;

			for (let i = 0; i < files.length; i++) {
				const reader = new FileReader();
				fileForm.push(files[i]);

				reader.readAsDataURL(event.target.files[i]);

				reader.onload = (event: any) => {
					const progressPercentage = Math.floor((event.loaded / fileSize) * 100);
					progressRef.current.style.right = `0%`;
					progressRef.current.style.width = `${progressPercentage}%`;
					progressRef.current.style.opacity = 1;
					fileContents.push(event.target.result);
					dispatch(setFormItems(event.target.result))
					setWayToFile(fileContents);
				};
				reader.onprogress = (event) => {
					if (event.lengthComputable) {
						const progressPercentage = Math.floor((event.loaded / fileSize) * 100);
						progressRef.current.style.opacity = progressPercentage === 100 ? 0 : 1;
						progressRef.current.style.width = `${progressPercentage}%`;
					}
				}
				reader.onloadend = () => {
					progressRef.current.style.width = `100%`;
					setTimeout(() => {
						progressRef.current.style.right = `-100%`;
						progressRef.current.style.right = `100%`;
					}, 2000);
				};
			}
			dispatch(getError());
			setError('');
			setValue('file', fileForm);
		};

		const onSubmitDoc = async (value: any) => {

			try {
				const formData: any = new FormData();
				if (value?.title) {
					if (value.file.length) {
						for (const image of value.file) {
							formData.append('file', image);
							setTimeout(() => {
								setWayToFile([]);
								setValue('file', []);
								setValue('title', '');
								setError('');
								dispatch(getError());
								dispatch(delDocItemsAll())
							}, 300);
						}
						formData.append('title', value.title);
						formData.append('categories_id', categoriesId);
						formData.append('seniors', props?.isActive);
						if (location.pathname === '/document') {
							dispatch(fetchCreateDoc(formData));
						} else if (location.pathname === '/education/timetable') {
							dispatch(fetchCreateDocTimeTable(formData));
						} else if (location.pathname === '/education/circle') {
							dispatch(fetchCreateDocCircle(formData));
						}
					} else {
						setError('Вставте PDF файл');
						toast.error('Завантажте документ у PDF-форматі ', {
							position: 'bottom-right',
							autoClose: 2500,
							hideProgressBar: false,
							closeOnClick: false,
							pauseOnHover: false,
							draggable: false,
							progress: undefined,
							theme: 'light',
							isLoading: false,
						  });
					}
				} else {
					setError('Поле не заповнене');
					toast.error('Задайте назву документа', {
						position: 'bottom-right',
						autoClose: 2500,
						hideProgressBar: false,
						closeOnClick: false,
						pauseOnHover: false,
						draggable: false,
						progress: undefined,
						theme: 'light',
						isLoading: false,
					  });
				}
			} catch (error) {
				console.log(error);
				setError('');
				toast.error('Помилка. Файл не завантажено', {
					position: 'bottom-right',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'light',
					isLoading: false,
				  });
				alert('Помилка. Файл не завантажено');
			}
		};
		//========================================================================================================================================================
		const handleFileUploadGallery = (event: any) => {
			const files = event.target.files;
			const fileContents: string[] = [];
			const fileForm: any = [];

			for (let i = 0; i < files.length; i++) {
				const reader = new FileReader();
				fileForm.push(files[i]);
				reader.readAsDataURL(event.target.files[i]);
				reader.onload = (event: any) => {
					fileContents.push(event.target.result);
					dispatch(setFormItems(event.target.result))
					setWayToFile(fileContents);
				};
			}
			dispatch(getError());
			setError('');
			setValue('file', fileForm);
		};

		const onSubmitGalley = async (value: any) => {
			try {
				if (value.file.length) {
					for (const image of value.file) {
						const formData: any = new FormData();
						formData.append('file', image);
						dispatch(fetchCreateGallery(formData));
						setTimeout(() => {
							setValue('file', []);
							setError('');
							dispatch(delFormItemsAll())
							dispatch(getError());
						}, 300);
					}
				} else {
					setError('Виберіть файл');
					toast.error('Виберіть зображення із фоматами(jpeg,jpg,png,webp,svg,ifif', {
						position: 'bottom-right',
						autoClose: 2500,
						hideProgressBar: false,
						closeOnClick: false,
						pauseOnHover: false,
						draggable: false,
						progress: undefined,
						theme: 'light',
						isLoading: false,
					  });
				}
			} catch (error) {
				console.log(error);
				toast.error('Помилка. Файл не завантажено', {
					position: 'bottom-right',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'light',
					isLoading: false,
				  });
				alert('Помилка. Файл не завантажено');
			}
		};

		const handleClickDel = (id: number,) => {
			dispatch(delFormItems(id))
		};

		const dataProps = {
			handleSubmit,
			handleFileUpload: location.pathname === '/' ? handleFileUploadGallery : handleFileUploadDoc,
			onSubmit: location.pathname === '/' ? onSubmitGalley : onSubmitDoc,
			inputRef,
			errorMessage,
			errorMessageDoc: docData.errorMessage,
			wayToFile,
			setWayToFile: setWayToFile,
			register: register('title'),
			error,
			dataFormItems,
			handleClickDel,
			progressRef,
		}
		return <Component {...dataProps} />
	}
}

export default withFileComponent;