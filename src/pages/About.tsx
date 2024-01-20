import React, { useEffect } from 'react';

import Title from '../components/BlockTiitle/Title';
import Card from '../components/card/Card';
import Personal from '../components/Personal';

import photoWebpB from '../img/about/color-day-is-blue.webp';
import photoJpgB from '../img/about/color-day-is-blue.jpg';
import photoWebpG from '../img/about/сolor-day-is-green.webp';
import photoJpgG from '../img/about/сolor-day-is-green.jpg';
import { useAppSelector } from '../redux/app/hooks';
import { selectDefaultData, selectUsers } from '../redux/about/select';
import { selectAuth } from '../redux/auth/select';
import { Helmet } from 'react-helmet';

const About: React.FC = () => {
	const defaroultData = useAppSelector(selectDefaultData);
	const items = useAppSelector(selectUsers);
	const isAuth = useAppSelector(selectAuth);
	useEffect(() => {
		window.scroll(0, 0)
	}, [])
	return (
		<>
			<Title />
			<Helmet>
				<title>Про нас</title>
			</Helmet>
			<Card photoWebp={photoWebpB} photoJpg={photoJpgB} text={defaultData[0]} title={defaultData[1]} />
			<Card photoWebp={photoWebpG} photoJpg={photoJpgG} isAddBolean={true} text={defaultData[2]} title={defaultData[3]} />
			{items.length  ?  <><Title isAddBolean={true} /> <Personal /></> : <></>}
			{isAuth  ?  <><Title isAddBolean={true} /> <Personal /></> : <></>}
		</>
	);
};

export default About;
