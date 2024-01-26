import React from 'react';
import TextField from '@mui/material/TextField';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { BsFillPlusSquareFill } from 'react-icons/bs';

import { baseUrl } from '../../api';

import { selectUsers } from '../../redux/about/select';
import { fetchCreateUser, fetchDeleteUser, fetchGetAllUsers } from '../../redux/about/thunk';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { selectAuth } from '../../redux/auth/select';

import defailtIcon from '../../img/users/avatar-default.png';
const Personal: React.FC = () => {

	const dispatch = useAppDispatch();

	const inputRef = React.useRef<any>(null);

	const isAuth = useAppSelector(selectAuth);
	const { validate, users } = useAppSelector(selectUsers);

	const [activeCard, setActiveCard] = React.useState(false);
	const [deleteCard, setDeleteCard] = React.useState(false);
	const [wayToPhoto, setWayToPhoto] = React.useState('');

	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			imageUrl: '',
			fullName: '',
			position: '',
			description: '',
		},
		mode: 'onChange',
	});

	React.useEffect(() => {
		setActiveCard(false);
		
	}, [deleteCard]);

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
			const formData = new FormData();
			formData.append('imageUrl', value.imageUrl);
			formData.append('fullName', value.fullName);
			formData.append('position', value.position);
			formData.append('description', value.description);
			dispatch(fetchCreateUser(formData));
			if (
				Boolean(formData.get('fullName')) &&
				Boolean(formData.get('position')) &&
				Boolean(formData.get('imageUrl'))
			) {
				setDeleteCard(!deleteCard);
				setWayToPhoto('');
				setValue('fullName', '');
				setValue('imageUrl', '');
				setValue('position', '');
				setValue('description', '');
			}
		} catch (error) {
			console.log(error);
			alert('Помилка. Файл не завантажено');
		}
	};
	const handleClick = (id: string) => {
		dispatch(fetchDeleteUser(id));
		setDeleteCard(!deleteCard);
		setTimeout(() => {
			dispatch(fetchGetAllUsers());
		}, 300);
	};

	return (
		<section className="personal">
			<div className="personal__container">
				{users?.length ? users.map((item: any, index: number) => {
					const name = item.fullName.split(' ');
					const positions = item.position.split(".");
					return (
						<div key={item.id} className="personal__block">
							{isAuth && (
								<Link onClick={() => handleClick(item.id)} to={'#'} className={'personal__btn btn'}>
									Видалити карточку
								</Link>
							)}
							<div className="personal__avatar">
								<img loading='lazy'
									className="personal__img"
									src={
										item.imageUrl
											? `${baseUrl}${item.imageUrl}`
											: defailtIcon
									}
									alt="avatar"
								/>
							</div>
							<div className="personal__content">
								<h4 className="personal__title title">
									<span>{name[0]}</span> {name[1] ? name[1] : ''} {name[2] ? name[2] : ''}
								</h4>
								{positions.map((position: string, i: number) => <h6 key={i} className="personal__subtitle">{position}</h6>)}
								<p className="personal__text ">{item.description}</p>
							</div>
						</div>
					);
				}) : <></>
				}
				{isAuth && (
					<div
						onClick={() => setActiveCard(true)}
						className={classNames('createCardUser', { createCardUser__active: !activeCard })}>
						{!activeCard && <BsFillPlusSquareFill className="createCardUser__icon" />}
						{wayToPhoto && (
							<Link onClick={() => setWayToPhoto('')} to={'#'} className={'personal__btn btn'}>
								Видалити фото
							</Link>
						)}
						<span className="f-center error">
							{!wayToPhoto
								? !deleteCard
									? validate.message
										? validate.message + ' Додайте фотокартку'
										: ''
									: ''
								: ''}
						</span>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="form-create-user"
							encType="multipart/form-data">
							<div className="createCardUser__avatar">
								{wayToPhoto ? (
									<img className="createCardUser__img" src={wayToPhoto} alt="avatar" />
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
											className="form-create-user__file-button">
											Вибрать фотографію
										</div>
									</>
								)}
							</div>
							<div className="createCardUser__content">
								<TextField
									className="form-create-user__fullName"
									label="Прізвище Імя по-батькові*"
									variant="outlined"
									error={Boolean(validate.fullNameMessage)}
									helperText={validate.fullNameMessage}
									{...register('fullName')}
								/>
								<div className="createCardUser__position">
									<TextField
										className="form-create-user__position"
										label="Посада*"
										variant="outlined"
										error={Boolean(validate.positionMessage)}
										helperText={validate.positionMessage}
										{...register('position')}
									/>
								</div>

								<TextField
									className="form-create-user__discription"
									label="Опис"
									variant="outlined"
									maxRows={4}
									{...register('description')}
								/>
							</div>
							<button type="submit" className="form-create-user__btn btn">
								Додати
							</button>
						</form>
					</div>
				)}
			</div>
		</section>
	);
};

export default Personal;
