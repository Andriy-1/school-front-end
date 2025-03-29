import React from 'react'
import { LuEye } from 'react-icons/lu';

interface ViewsCouterProps {
	viewsCount: number;
}

const ViewsCouter: React.FC<ViewsCouterProps> = ({ viewsCount }) => {
	return (
		<>
			<div className="info-card-news__block">
				<div className="news-card__data info-card-news__data">
				</div>
				<div className="info-card-news__views">
					<LuEye
						stroke='black'
						className='info-card-news__svg svg-views-news-dims' />
					<span>{viewsCount}</span>
				</div>
			</div>
		</>
	)
}

export default ViewsCouter;