import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { selectNewsCategories } from '../../../redux/news/select';
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks';
import { fetchNewsCategories } from '../../../redux/news/thunk';
import qs from 'qs'
import CardCategory from './CardCategory';

const CategoriesItems = () => {

	const newsCategories = useAppSelector(selectNewsCategories);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchNewsCategories())

	}, [dispatch])

	const navigate = useNavigate();

	const clickCategory = useCallback(
		(id: number): void => {

			const queryString = qs.stringify({
				categories_id: id,
			});
			navigate(`?${queryString}`);
		},
		[navigate],
	)
	return (
		<ul className=' post-category'>
			{newsCategories?.map((item) => <CardCategory
				key={item.id}
				id={item.id}
				clickCategory={clickCategory}
				title={item.title}
			/>)}
		</ul>
	)
}

export default CategoriesItems