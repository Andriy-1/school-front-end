import React from 'react'
import NewsSkeleton from '../../news/Skeleton';
import CardMini from '../CardMini';
import { useAppSelector } from '../../../redux/app/hooks';
import { selectNews } from '../../../redux/news/select';

// type Props = {}

const CardItems = () => {
	const [isReset, setIsReset] = React.useState<boolean>(false);

	const { items } = useAppSelector(selectNews);

	const onClickReset = () => {
		setIsReset(true);
		setTimeout(() => { setIsReset(false) }, 1000)
	}

	const skeletonElement = (element = [1, 2, 3]) => {
		return element.map((_, index) => (
			<div key={index} className="f-center">
				<NewsSkeleton />
			</div>
		));
	}
	return (
		<div className="section-news-card-column ">
			{items?.map(item => <CardMini isReset={isReset} key={item.id} {...item} />)}

		</div>
	)
}

export default CardItems;