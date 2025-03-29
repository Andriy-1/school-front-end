import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks'
import { useParams } from 'react-router-dom';
import { fetchNewsOne } from '../../../redux/news/thunk';
import { baseUrl } from '../../../api';
import { selectNewsOne } from '../../../redux/news/select';
import ViewsCouter from '../../viewsCounter';
import LikeCouter from '../../likeCounter';

type Props = {}

const CardNews = (props: Props) => {
	const dispatch = useAppDispatch();
	const item = useAppSelector(selectNewsOne)
	const { id } = useParams<{ id: string; }>();

	React.useEffect(() => {
		if (id) {
			window.scrollTo(0, 0);
			dispatch(fetchNewsOne(id));
		}
	}, [dispatch, id])

	const dateParts = String(item?.created_at).split('-');

	const year = parseInt(dateParts[0]);
	const month = parseInt(dateParts[1]) - 1;
	const day = parseInt(dateParts[2]);
	const dateObject = new Date(year, month, day);
	const options: any = { month: 'long', locale: 'uk-UA' };
	const monthName = dateObject.toLocaleString('uk-UA', options);
	const mouthNameBig = monthName.charAt(0).toUpperCase() + monthName.slice(1);

	return (
		<div className='cover-news'>
			<div className="card-one-container">
				<div className='card-one'>
					<div className="card-one__data">
						<span>{[mouthNameBig, '-', day, '-', year]}</span>
					</div>
					<div className="card-one__block">
						<img src={baseUrl + item?.imageUrl} alt="card-news" className="card-one__img" />
						<div className='card-one__content'>
							<div className="card-one__title title">
								{item?.title}
							</div>
							<div className='card-one__info'>
								<ViewsCouter viewsCount={item?.viewsCount ? item?.viewsCount : 0} />
								<LikeCouter likeCount={item?.likeCount ? item?.likeCount : 0} id={item?.id ? item?.id : 0} /></div>
						</div>
					</div>
					<div className="card-one__text">
						{item?.text}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CardNews