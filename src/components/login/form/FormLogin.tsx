import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks';
import { fetchLogin } from '../../../redux/auth/thunk';
import { setFromValue } from '../../../redux/auth/slice';
import { selectAuth } from '../../../redux/auth/select';
;
const FormLogin: React.FC = () => {
	
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectAuth);
	const { message, validate } = useAppSelector((state) => state.auth);

	const {
		register,
		handleSubmit,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	});
	
	const onSubmit = async (value: any) => {
		dispatch(setFromValue(value));
		const { payload }: any = await dispatch(fetchLogin(value));
		if ('token' in payload) {
			localStorage.setItem('token', payload.token);
		}
	};

	if (isAuth) {
		return <Navigate to="/" />;
	}
	return (
		<div className="auth__block container">
			<form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="form">
				<div className="form__error">{message}</div>
				<TextField
					type={'text'}
					className="form__login"
					label="Логін"
					variant="outlined"
					placeholder="email"
					id="email"
					error={Boolean(validate.emailMessage)}
					helperText={validate.emailMessage}
					{...register('email')}
				/>
				<TextField
					type={'password'}
					className="form__password"
					label="Пароль"
					variant="outlined"
					id="password"
					error={Boolean(validate.passwordMessage)}
					helperText={validate.passwordMessage}
					{...register('password')}
				/>
				<button type="submit" className="form__btn btn">
					Вхід
				</button>
			</form>
		</div>
	);
};

export default FormLogin;
