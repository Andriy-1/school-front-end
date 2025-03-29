import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import { TextField } from '@mui/material';
import qs from 'qs';


import { fetchCategoryNews, fetchCreateNews, fetchNews } from '../redux/news/thunk';
import { selectNews } from '../redux/news/select';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { setValid, setZeroItems } from '../redux/news/slice';
import { selectAuth } from '../redux/auth/select';
import { Helmet } from 'react-helmet';
import PostCards from '../components/Post';

const News: React.FC = () => {

	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectAuth);
	const location = useLocation();

	const { status, validate } = useAppSelector(selectNews);

	const [clickBnt, setClickBnt] = useState(false);
	const [deleteCard, setDeleteCard] = React.useState(false);
	const [wayToPhoto, setWayToPhoto] = React.useState('');

	// const threeItems = items ? items?.slice(0, 3) : [];
	const inputRef = React.useRef<any>(null);



	// Парсинг запиту
	const searchParams = new URLSearchParams(location.search);
	const categoriesId = searchParams.get('categories_id');

	const categoriesIdNumber: number | undefined = categoriesId ? Number(categoriesId) : undefined;

	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			imageUrl: '',
			title: '',
			text: '',
		},
		mode: 'onChange',
	});

	React.useEffect(() => {
		if (categoriesIdNumber) {
			dispatch(fetchCategoryNews(categoriesIdNumber));
		}
		// dispatch(fetchNews());
		window.scroll(0, 0);
		return () => {
			// dispatch(setZeroItems())
		}
	}, [categoriesIdNumber, dispatch]);

	const handleClickBtn = () => {
		dispatch(fetchNews());
		setClickBnt(true);
	};

	;

	const handleFileUpload = (event: any) => {
		const file = event.target.files[0];
		setValue('imageUrl', file);
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (event: any) => {
			const fileContents = event.target.result;
			setWayToPhoto(fileContents);
		};
	};
	const onSubmit = async (value: any) => {
		try {
			const formData: any = new FormData();
			formData.append('imageUrl', value.imageUrl);
			formData.append('title', value.title);
			formData.append('text', value.text);
			dispatch(fetchCreateNews(formData));
			if (value.title && value.text && value.imageUrl) {
				setTimeout(() => {
					setWayToPhoto('');
					setDeleteCard(!deleteCard);
					dispatch(fetchNews());
					setValue('title', '');
					setValue('text', '');
					dispatch(setValid());
				}, 300);
			}
		} catch (error) {
			console.log(error);
			alert('Помилка. Файл не завантажено');
		}
	};


	return (
		<div className='cover-news'>
			{/* <Title isAddBolean={true} items={items} status={status} /> */}
			<Helmet>
				<title>Новини</title>
			</Helmet>
			{/* <CoverContent /> */}
			{/* {isAuth ? (
				<section className="section-news-card">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="form-create-user"
						encType="multipart/form-data">
						<div id="newsCard" className="section-news-card__row">
							<div className="section-news-card__photo">
								{wayToPhoto && (
									<Link onClick={() => setWayToPhoto('')} to={'#'} className={'btn-del btn'}>
										Видалити це фото
									</Link>
								)}
								{wayToPhoto ? (
									<img className="section-news-card__img" src={wayToPhoto} alt="news" />
								) : (
									<>
										<input
											ref={inputRef}
											type="file"
											accept=".jpeg, .jpg, .png, .svg, .ifif. .webp"
											className="form-create-user__file"
											name="imageUrl"
											onChange={handleFileUpload}
										/>
										<div
											onClick={() => inputRef.current.click()}
											className="btn section-news-card__btn">
											Вибрать фотографію
										</div>
									</>
								)}
							</div>
							<div className="section-news-card__block">
								<div className="form-create-user">
									<div className="section-news-card__content">
										<span className=" title error">
											{validate.message ? validate.message + ' | Додайте фотокартку' : ''}
										</span>
										<TextField
											label="Заголовок *"
											variant="outlined"
											error={Boolean(validate.titleMessage)}
											helperText={validate.titleMessage}
											{...register('title')}
										/>
										<TextField
											label="Опис"
											variant="outlined"
											minRows={4}
											error={Boolean(validate.textMessage)}
											helperText={validate.textMessage}
											{...register('text')}
										/>
										<button type="submit" className="form-create-user__btn btn">
											Додати
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</section>
			)
				: <></>
			} */}
			<PostCards />
			{/* {status === 'success' ? clickBnt ? switchItems(items ? items : []) : switchItems(threeItems) : skeletonElement()} {!clickBnt && items ? items.length > 3 && <ButtonBlock onClickReset={onClickReset} handleClickBtn={handleClickBtn} /> : ''} */}
		</div>
	);
};

export default News;
