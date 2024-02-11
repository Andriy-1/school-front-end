import React, { Suspense, startTransition, useEffect } from 'react';

import Title from '../components/BlockTiitle/Title';
import Card from '../components/card/Card';
import photoWebpB from '../img/about/color-day-is-blue.webp';
import photoJpgB from '../img/about/color-day-is-blue.jpg';
import photoWebpG from '../img/about/сolor-day-is-green.webp';
import photoJpgG from '../img/about/сolor-day-is-green.png';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { selectDefaultData, selectUsers } from '../redux/about/select';
import { selectAuth } from '../redux/auth/select';
import { Helmet } from 'react-helmet';
import { fetchGetAllUsers } from '../redux/about/thunk';
import Loader from '../components/loader/Loader';

const Personal = React.lazy(() => import('../components/Personal'));
const About: React.FC = () => {
	const dispatch = useAppDispatch();
	const defaultData = useAppSelector(selectDefaultData);
	const isAuth = useAppSelector(selectAuth);
	const items = useAppSelector(selectUsers);
	useEffect(() => {
		window.scroll(0, 0)
		setTimeout(() => {
			startTransition(() => {
				dispatch(fetchGetAllUsers());
			});

		}, 300);
	}, [dispatch])
	return (
		<>
			<Title />
			<Helmet>
				<title>Про нас</title>
			</Helmet>
			<Card photoWebp={photoWebpB} photoJpg={photoJpgB} text={defaultData[0]} title={defaultData[1]} />
			<Card photoWebp={photoWebpG} photoJpg={photoJpgG} isAddBolean={true} text={defaultData[2]} title={defaultData[3]} />
			{items.users.length ? <Suspense fallback={<Loader />}><Title isAddBolean={true} /> <Personal /></Suspense> : isAuth ? <Suspense fallback={<Loader />}><Title isAddBolean={true} /> <Personal /></Suspense> : <></>}
		</>
	);
};

export default About;
