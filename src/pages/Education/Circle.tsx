
import React from 'react';

import Title from '../../components/BlockTiitle/Title';
import DocwithFileComponent from '../../components/fileForm/docFile';

import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { selectAuth } from '../../redux/auth/select';
import { selectDoc } from '../../redux/document/select';
import { fetchDeleteDocCircle, fetchDocCircle } from '../../redux/document/thunk';

import { baseUrl } from '../../api';
import { Helmet } from 'react-helmet';


const Circle: React.FC = () => {
	const dispatch = useAppDispatch();
	const { items, status } = useAppSelector(selectDoc);
	const isAuth = useAppSelector(selectAuth);

	const handleClickDel = (id: number) => {
		dispatch(fetchDeleteDocCircle(id));
		setTimeout(() => {
			dispatch(fetchDocCircle());
		}, 100);
	};

	return (
		<>
			<Title isAddBolean={true} items={items} status={status} />
			<section className="background-blue-cont">
				<DocwithFileComponent />
				<Helmet>
					<title>Розклад гуртків</title>
				</Helmet>
				{items && items.map((item: any) => {
					return (
						<div key={item.id}>
							{isAuth && (
								<span onClick={() => handleClickDel(item.id)} className="document__btn">
									Видалити документ
								</span>
							)}
							<div>
								{item.file.map((filePath: string, index: number) => (
									<iframe key={index} title='Document' className="ifr timetable__ifr" src={baseUrl + filePath}></iframe>
								))
								}
							</div>
						</div>
					);
				})}
			</section>
		</>
	);
};

export default Circle;
