import React from 'react';
import { TextField } from '@mui/material';

import {  useAppSelector } from '../../redux/app/hooks';
import { selectAuth } from '../../redux/auth/select';

import withFileComponent from '../../hoc/file';

const DocFile: React.FC<any> = (props: any) => {

	const isAuth = useAppSelector(selectAuth);
	return isAuth ? (
		<>
			<div className="progress-bar">
				<div className="progress" id="progress" ref={props.progressRef}></div>
			</div>
			<div className="document__form-block">

				<span className="f-center error">
					{props.error || props.errorMessageDoc}
				</span>
				<form
					onSubmit={props.handleSubmit(props.onSubmit)}
					className="document-form"
					encType="multipart/form-data">
					<div className="document-form__row-block">
						<div>
							<input
								ref={props.inputRef}
								type="file"
								accept={'.pdf'}
								className="document-form__file input-file"
								name="file"
								onChange={props.handleFileUpload}
								multiple
							/>
							<span
								onClick={() => props.inputRef.current.click()}
								className="btn document-form__btn-file input-file-btn">
								Вибрать файл
							</span>
						</div>
						{props.wayToFile && (
							<TextField
								label="Назва документа *"
								variant="outlined"
								className="document-form__textfield input-text"
								{...props.register}
							/>
						)}
						<button type="submit" className="btn document-form__btn">
							Додати
						</button>
					</div>
				</form>
				{props.wayToFile && (
					props.wayToFile.map((item: string, index:number) => <iframe key={index}
						src={item}
						title='Новий документ'
						className="document-form__ifr ifr"></iframe>)

				)}
			</div>
		</>
	)
		: <>
		</>
};
const DocwithFileComponent = withFileComponent(DocFile);
export default DocwithFileComponent;
