import React from 'react'

import CardItems from './CardItems';
import CategoriesItems from './Categories/CategoriesItems';


const PostCards: React.FC = (props) => {


	return (
		<>
			<CategoriesItems />
			<CardItems />
		</>

	)
}

export default PostCards;