import React from 'react'
import qs from 'qs';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { selectDocumentCategories } from '../../redux/document/select';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { fetchCreateDocumentCategories, fetchDoc } from '../../redux/document/thunk';
import { useNavigate } from 'react-router-dom';

const Categories: React.FC = () => {
	const categories = useAppSelector(selectDocumentCategories);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
	} = useForm({
		defaultValues: {
			title: '',
		},
		mode: 'onChange',
	});





	const clickCategories = React.useCallback(
		() => {
			dispatch(fetchDoc(''))
		},
		[dispatch],
	)
	const clickCategory = React.useCallback(
		(id: number) => {
			const queryString = qs.stringify({
				categories_id: id,
			});
			console.log('queryString', queryString);

			navigate(`?${queryString}`);
			dispatch(fetchDoc(queryString))
		},
		[dispatch, navigate],
	)
	const clickAddCategory = React.useCallback(
		(item: any) => {
			console.log('clickAddCategory', item);
			dispatch(fetchCreateDocumentCategories(item));
		},
		[dispatch],
	)
	return (
		<ul className='dev-flex'>
			<li onClick={clickCategories} className="btn">Всі документи</li>

			{categories && categories.map((category: any) => <li key={category.id} onClick={() => clickCategory(category.id)} className="btn dev-btn dev-btn-opac">{category.title}</li>)}
			<li className="dev-btn">
				<form onSubmit={handleSubmit(clickAddCategory)} className='dev-form'>
					<TextField
						className='dev-text'
						{...register('title')}
					/>
					<button type="submit" className="dev-btn dev-click">Додати категорію</button>
				</form>
			</li>
		</ul>
	)
}

export default Categories;