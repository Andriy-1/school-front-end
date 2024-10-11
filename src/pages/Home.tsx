import React, { Suspense, startTransition } from 'react';

import FullScreen from '../components/fullScreen/FullScreen';
import Title from '../components/BlockTiitle/Title';
import Card from '../components/card/Card';
import MiniCardNews from '../components/cardNews';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { fetchGallery } from '../redux/gallery/thunk';
import { fetchNewsThree } from '../redux/news/thunk';
import { getThreeItems } from '../redux/news/select';

import photoWebpTwo from '../img/home/twoWebp.webp';
import photoJpgTwo from '../img/home/two.jpg';
import photoWebpOne from '../img/home/oneWebp.webp';
import photoJpgOne from '../img/home/one.jpg';

import { selectDefaultData } from '../redux/gallery/select';
import { Helmet } from 'react-helmet';
import Loader from '../components/loader/Loader';
const Gallery = React.lazy(() => import('../components/gallery'));
const Home: React.FC = () => {
	const dispatch = useAppDispatch()
	const itemsNews = useAppSelector(getThreeItems);
	const defaultData = useAppSelector(selectDefaultData);

	React.useEffect(() => {

		// dispatch(fetchNewsThree());
		startTransition(() => {
			dispatch(fetchGallery());
		});
	}, [dispatch])
	return (
		<>
			<FullScreen />
			<Helmet>
				<title>ХХX - Головна</title>
			</Helmet>
			<Title />
			<Card photoWebp={photoWebpOne} photoJpg={photoJpgOne} text={defaultData[0]} title={defaultData[1]} />
			<Card photoWebp={photoWebpTwo} photoJpg={photoJpgTwo} isAddBolean={true} text={defaultData[2]} title={defaultData[3]} />
			{itemsNews?.length ? (
				<><Title isAddBolean={true} />
					<MiniCardNews />
				</>
			) : ''
			}
			<Suspense fallback={<Loader />}><Gallery /></Suspense>

		</>
	);
};

export default Home;
