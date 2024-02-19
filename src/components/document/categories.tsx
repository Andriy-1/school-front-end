import React from 'react'
import qs from 'qs';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { selectDocumentCategories } from '../../redux/document/select';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { fetchCreateDocumentCategories, fetchDeleteDocumentCategories, fetchDoc, fetchDocumentCategories } from '../../redux/document/thunk';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectAuth } from '../../redux/auth/select';
import classNames from 'classnames';
import { setCategoriesId } from '../../redux/document/slice';

const Categories: React.FC = () => {
	const categories = useAppSelector(selectDocumentCategories);
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectAuth);
	const categoriesIdMatch = location.search.match(/categories_id=(\d+)/);
	const categoriesId = categoriesIdMatch ? parseInt(categoriesIdMatch[1]) : 0;
	const {
		setValue,
		register,
		handleSubmit,
	} = useForm({
		defaultValues: {
			title: '',
		},
		mode: 'onChange',
	});
	React.useEffect(() => {
		dispatch(fetchDocumentCategories())
	}, [dispatch])

	React.useEffect(() => {
		dispatch(fetchDoc(categoriesId.toString()))
		dispatch(setCategoriesId(categoriesId))
	}, [dispatch, categoriesId])

	const clickCategories = React.useCallback(
		() => {
			const queryString = qs.stringify({
				categories_id: 0,
			});
			navigate(`?${queryString}`);
		},
		[navigate],
	)
	const clickCategory = React.useCallback(
		(id: number) => {
			const queryString = qs.stringify({
				categories_id: id,
			});
			navigate(`?${queryString}`);
		},
		[navigate],
	)
	const clickAddCategory = React.useCallback(
		(item: any) => {
			dispatch(fetchCreateDocumentCategories(item));
			setValue('title', '');
		},
		[dispatch, setValue],
	)

	const clickDeleteCategory = React.useCallback(
		() => {
			if (categoriesId > 0) { 
				dispatch(fetchDeleteDocumentCategories(categoriesId));
			}
		},
		[categoriesId, dispatch],
	)
	return (
		<div className="categories">
			{isAuth && <div className="new-item-categories">
				<form onSubmit={handleSubmit(clickAddCategory)} className='new-item-categories__form'>
					<TextField
						className='new-item-categories__text input-text'
						label="Назва категорія"
						variant="outlined"
						{...register('title')}
					/>
					<button type="submit" className="new-item-categories__btn btn">Додати категорію</button>
				</form>
			</div>}
			<ul className="categories__items items-categories">
				<li onClick={clickCategories} className={classNames("items-categories__item", { "items-categories__item-active": categoriesId === 0 ? true : false })}>Всі документи</li>
				{categories && categories.map((category: any) =>
					<li key={category.id} onClick={() => clickCategory(category.id)} className={classNames("items-categories__item", { "items-categories__item-active": category.id === categoriesId ? true : false })}>{category.title}
					</li>)}
				{isAuth && <li onClick={clickDeleteCategory} className="items-categories__item items-categories__delete">
					Видалити
				</li>
				}
			</ul>

		</div >

	)
}

export default Categories;