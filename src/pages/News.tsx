import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';

import Title from '../components/BlockTiitle/Title';
import ButtonBlock from '../components/button/ButtonBlock';
import CardNews from '../components/news';
import CoverContent from '../components/news/CoverContent';
import NewsSkeleton from '../components/news/Skeleton';

import { AllData } from '../components/types';

import { fetchCreateNews, fetchNews } from '../redux/news/thunk';
import { selectNews } from '../redux/news/select';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { setValid } from '../redux/news/slice';
import { selectAuth } from '../redux/auth/select';
import { Helmet } from 'react-helmet';

const News: React.FC = () => {
	
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectAuth);
	const { items, status, validate } = useAppSelector(selectNews);

	const [clickBnt, setClickBnt] = useState(false);
	const [deleteCard, setDeleteCard] = React.useState(false);
	const [wayToPhoto, setWayToPhoto] = React.useState('');

	const threeItems = items ? items.slice(0, 3) : [];
	const inputRef = React.useRef<any>(null);

	const [isReset, setIsReset] = React.useState<boolean>(false);


	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			imageUrl: '',
			title: '',
			text: '',
		},
		mode: 'onChange',
	});
	
	React.useEffect(() => {
		dispatch(fetchNews());
		window.scroll(0, 0);
	}, [dispatch]);

	
	const handleClickBtn = () => {
		dispatch(fetchNews());
		setClickBnt(true);
	};


	const switchItems = (element: AllData[]) => {
		return element && element.map((item) => <CardNews isReset={isReset} key={item.id} {...item} />);
	};
	const skeletonElement = (element = [1, 2, 3]) => {
		return element.map((_, index) => (
			<div key={index} className="f-center">
				<NewsSkeleton />
			</div>
		));
	};

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
	const onClickReset = () => {
		setIsReset(true);
		setTimeout(() => { setIsReset(false)},1000)
	}
	
	return (
		<>
			<Title isAddBolean={true} items={items} status={status} />
			<Helmet>
				<title>Новини</title>
			</Helmet>
			<CoverContent />
			{isAuth ? (
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
			}
			{status === 'success'
				? clickBnt
					? switchItems(items ? items : [])
					: switchItems(threeItems)
				: skeletonElement()}
			{!clickBnt && items
				? items.length > 3 && <ButtonBlock onClickReset={onClickReset} handleClickBtn={handleClickBtn} />
				: ''}
		</>
	);
};

export default News;
