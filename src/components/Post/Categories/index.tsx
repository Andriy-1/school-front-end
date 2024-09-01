import React from 'react'

type CardCategoryProps = {
	title: string;
}

const CardCategory: React.FC<CardCategoryProps> = ({ title }) => {
	return (
		<div className='card-category-item'>
			<div className="card-category-item__img">
				{/* <img src="#" alt="#" /> */}
			</div>
			<h3 className="card-category-item__title">
				{title}
			</h3>
		</div>
	)
}

export default CardCategory;