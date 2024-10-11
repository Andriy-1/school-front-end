import React from 'react'

type CardCategoryProps = {
	title: string;
	clickCategory: (id: number) => void; // Функція, яка приймає id та нічого не повертає
	id: number;
}

const CardCategory: React.FC<CardCategoryProps> = ({id, title, clickCategory }) => {
	return (
		<li onClick={() => clickCategory(id)} className='card-category-item'>
			<img className='card-category-item__img' src={'https://api.kopachyntsi.if.ua/d9dec4eb-442b-493c-afa7-9118033db52f.webp'} alt="News" />
			<h3 className="card-category-item__title">
				{title}
			</h3>
		</li>
	)
}

export default CardCategory;