import React from 'react'
import CardCategory from './Categories';

type itemsCategory = {
	id: number,
	title: string,
}

const PostCards: React.FC<any> = (props) => {
	const items: itemsCategory[] = [{ id: 1, title: "Привіт новинни" }, { id: 3, title: "Привіт новинни" }, { id: 2, title: "Привіт новинни" }, { id: 4, title: "Привіт новинни" }, { id: 5, title: "Привіт новинни" },{ id: 6, title: "Привіт новинни" }]
	return (
		<div className=' post-category'>
			{items.map((item) => <CardCategory title={item.title} />)}
		</div>
	)
}

export default PostCards;