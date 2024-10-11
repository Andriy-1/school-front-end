import React, { useCallback, useEffect } from 'react'
import CardCategory from './Categories';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { selectNewsCategories } from '../../redux/news/select';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { fetchNewsCategories } from '../../redux/news/thunk';


const PostCards: React.FC<any> = (props) => {
	const newsCategories = useAppSelector(selectNewsCategories);
	console.log('newsCategories', newsCategories);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchNewsCategories())

	}, [dispatch])


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
		<div>
			<ul className=' post-category'>
				{newsCategories?.map((item) => <CardCategory
					key={item.id} // Важливо додати унікальний ключ для кожного елемента
					id={item.id}
					clickCategory={clickCategory}
					title={item.title}
				/>)}
			</ul>
		</div>

	)
}

export default PostCards;